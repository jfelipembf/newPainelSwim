import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import moment from "moment";

import { AUDIT_ACTIONS, AUDIT_RESOURCES } from "../constants/audit";
import { getAuditHelper } from "./audit_helper";

class ActivitiesSessionsHelper {
  constructor() {
    if (!firebase.apps.length) throw new Error("Firebase app not initialized");
    this.db = firebase.firestore();
    this.auth = firebase.auth();
  }

  logAudit(action, resourceId, details = {}) {
    const auditHelper = getAuditHelper?.();
    if (!auditHelper) return;
    const actor = this.auth.currentUser;
    const actorEmail = actor?.email || "";
    const actorName = actor?.displayName || actorEmail || "unknown";
    return auditHelper.logActivity({
      userId: actor?.uid || "unknown",
      userEmail: actorEmail,
      userName: actorName,
      userRole: "admin",
      action,
      resource: AUDIT_RESOURCES.ACTIVITIES_SESSIONS,
      resourceId,
      details,
    });
  }

  async listSessions(filters = {}) {
    let query = this.db.collection("activities_sessions");
    if (filters.idConfiguration) query = query.where("idConfiguration", "==", filters.idConfiguration);
    if (filters.idActivity) query = query.where("idActivity", "==", filters.idActivity);
    if (filters.startDate) query = query.where("activityDate", ">=", filters.startDate);
    if (filters.endDate) query = query.where("activityDate", "<=", filters.endDate);
    const snapshot = await query.get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async getSession(id) {
    const doc = await this.db.collection("activities_sessions").doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  }

  async createSession(data) {
    const docRef = this.db.collection("activities_sessions").doc();
    const payload = {
      ...data,
      idActivitySession: data.idActivitySession || docRef.id,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    await docRef.set(payload);
    await this.logAudit(AUDIT_ACTIONS.CREATE_ACTIVITY_SESSION, docRef.id, { session: payload });
    return { id: docRef.id, ...payload };
  }

  async updateSession(id, updates) {
    const payload = {
      ...updates,
      idActivitySession: updates.idActivitySession || id,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    await this.db.collection("activities_sessions").doc(id).update(payload);
    await this.logAudit(AUDIT_ACTIONS.UPDATE_ACTIVITY_SESSION, id, { updates: payload });
    return this.getSession(id);
  }

  async deleteSession(id) {
    if (!id) throw new Error("Session id is required");
    await this.db.collection("activities_sessions").doc(id).delete();
    await this.logAudit(AUDIT_ACTIONS.DELETE_ACTIVITY_SESSION, id);
    return true;
  }

  async ensureSessionsForConfig(config, options = {}) {
    if (!config) throw new Error("Config is required");
    const {
      idConfiguration,
      idActivity,
      idArea,
      idInstructor,
      capacity,
      startDate,
      endDate,
      startTime,
      duration = 60,
      daysOfWeek = [],
      status = 1,
      allowChoosingSpot = false,
      activityColor,
    } = config;

    if (!idConfiguration) throw new Error("Config must include idConfiguration");
    if (!startTime) throw new Error("Config must include startTime");
    if (!Array.isArray(daysOfWeek) || daysOfWeek.length === 0) return [];

    const {
      fromDate,
      weeksAhead = 4,
      includePast = false,
    } = options;

    const today = moment().startOf("day");
    const initialStartCandidates = [startDate && moment(startDate, "YYYY-MM-DD")];
    if (!includePast) initialStartCandidates.push(today);
    if (fromDate) initialStartCandidates.push(moment(fromDate, "YYYY-MM-DD"));
    const validStartCandidates = initialStartCandidates.filter(Boolean);
    const windowStart = validStartCandidates.length ? moment.max(validStartCandidates) : today.clone();

    const targetEnd = windowStart.clone().add(Math.max(weeksAhead, 1), "weeks").endOf("day");
    const configEnd = endDate ? moment(endDate, "YYYY-MM-DD").endOf("day") : null;
    const windowEnd = configEnd ? moment.min(configEnd, targetEnd) : targetEnd;

    if (windowEnd.isBefore(windowStart, "day")) return [];

    const sessionsRef = this.db.collection("activities_sessions");
    const startIso = windowStart.format("YYYY-MM-DD");
    const endIso = windowEnd.format("YYYY-MM-DD");

    const generationBatch = this.db.batch();
    const generatedSessions = [];
    const normalizedDays = daysOfWeek.map((day) => Number(day));

    const cursor = windowStart.clone();
    while (cursor.isSameOrBefore(windowEnd, "day")) {
      if (normalizedDays.includes(cursor.day())) {
        const activityDate = cursor.format("YYYY-MM-DD");
        const docId = `${idConfiguration}_${activityDate.replace(/-/g, "")}_${startTime.replace(":", "")}`;
        const docRef = sessionsRef.doc(docId);
        const existingDoc = await docRef.get();
        if (existingDoc.exists) {
          cursor.add(1, "day");
          continue;
        }

        const startDateTime = moment(`${activityDate} ${startTime}`, "YYYY-MM-DD HH:mm");
        const endTime = startDateTime.clone().add(duration, "minutes").format("HH:mm");
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const sessionPayload = {
          idActivitySession: docId,
          idConfiguration,
          idActivity,
          idArea,
          idInstructor,
          activityDate,
          startTime,
          endTime,
          capacity,
          ocupation: 0,
          status,
          allowChoosingSpot,
          spots: [],
          activityColor,
          createdAt: timestamp,
          updatedAt: timestamp,
        };
        generationBatch.set(docRef, sessionPayload, { merge: false });
        generatedSessions.push({ id: docId, ...sessionPayload });
      }
      cursor.add(1, "day");
    }

    if (!generatedSessions.length) return [];

    await generationBatch.commit();
    await this.logAudit(AUDIT_ACTIONS.CREATE_ACTIVITY_SESSION, idConfiguration, {
      generatedCount: generatedSessions.length,
      windowStart: startIso,
      windowEnd: endIso,
    });

    return generatedSessions;
  }

  async updateFutureSessionsForConfig(config, options = {}) {
    if (!config) throw new Error("Config is required");
    const {
      idConfiguration,
      idActivity,
      idArea,
      idInstructor,
      startTime,
      duration = 60,
      capacity,
      status = 1,
      allowChoosingSpot = false,
      activityColor,
    } = config;

    if (!idConfiguration) throw new Error("Config must include idConfiguration");
    if (!startTime) throw new Error("Config must include startTime");

    const { includePast = false, fromDate } = options;
    const referenceDate = includePast ? null : moment(fromDate, "YYYY-MM-DD").isValid()
      ? moment(fromDate, "YYYY-MM-DD")
      : moment().startOf("day");

    const snapshot = await this.db
      .collection("activities_sessions")
      .where("idConfiguration", "==", idConfiguration)
      .get();

    if (snapshot.empty) return 0;

    const batch = this.db.batch();
    let affected = 0;

    snapshot.forEach((doc) => {
      const data = doc.data();
      const sessionDate = moment(data.activityDate, "YYYY-MM-DD").startOf("day");
      if (referenceDate && sessionDate.isBefore(referenceDate)) return;

      const startDateTime = moment(`${data.activityDate} ${startTime}`, "YYYY-MM-DD HH:mm");
      const endTime = startDateTime.clone().add(duration, "minutes").format("HH:mm");
      const payload = {
        idActivity,
        idArea,
        idInstructor,
        startTime,
        endTime,
        capacity,
        status,
        allowChoosingSpot,
        activityColor,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      };
      batch.update(doc.ref, payload);
      affected += 1;
    });

    if (!affected) return 0;

    await batch.commit();
    await this.logAudit(AUDIT_ACTIONS.UPDATE_ACTIVITY_SESSION, idConfiguration, {
      updatedCount: affected,
      includePast,
      fromDate: referenceDate?.format("YYYY-MM-DD") || null,
    });
    return affected;
  }

  async deleteSessionsForConfig(idConfiguration, options = {}) {
    if (!idConfiguration) throw new Error("idConfiguration is required");
    const { deletePast = false } = options;
    const today = moment().startOf("day");

    const snapshot = await this.db
      .collection("activities_sessions")
      .where("idConfiguration", "==", idConfiguration)
      .get();

    if (snapshot.empty) return 0;

    const batch = this.db.batch();
    let removed = 0;

    snapshot.forEach((doc) => {
      const data = doc.data();
      const sessionDate = moment(data.activityDate, "YYYY-MM-DD").startOf("day");
      if (!deletePast && sessionDate.isBefore(today)) return;
      batch.delete(doc.ref);
      removed += 1;
    });

    if (!removed) return 0;

    await batch.commit();
    await this.logAudit(AUDIT_ACTIONS.DELETE_ACTIVITY_SESSION, idConfiguration, {
      removedCount: removed,
      deletePast,
    });
    return removed;
  }
}

let _activitiesSessionsHelper = null;
export const getActivitiesSessionsHelper = () => {
  if (!_activitiesSessionsHelper) _activitiesSessionsHelper = new ActivitiesSessionsHelper();
  return _activitiesSessionsHelper;
};
