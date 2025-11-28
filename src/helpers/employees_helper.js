import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { EMPLOYEE_INITIAL_VALUE } from "../constants/employees";
import { getAuditHelper } from "./audit_helper";
import { AUDIT_ACTIONS, AUDIT_RESOURCES } from "../constants/audit";

/**
 * Helper focused only on colaboradores (employees)
 */
class EmployeesHelper {
  constructor() {
    if (!firebase.apps.length) {
      throw new Error("Firebase app not initialized");
    }
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
      userRole: "admin", // ajusta quando roles estiverem disponíveis
      action,
      resource: AUDIT_RESOURCES.EMPLOYEES,
      resourceId,
      details,
    });
  }

  /**
   * Cria usuário de autenticação e documento do colaborador
   */
  async createEmployee(employeeData) {
    const authUser = await this.auth.createUserWithEmailAndPassword(
      employeeData.email,
      employeeData.password || "tempPass123!"
    );

    const employeeDoc = {
      ...EMPLOYEE_INITIAL_VALUE,
      ...employeeData,
      password: undefined,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      role: employeeData.role || "employee",
    };

    await this.db.collection("employees").doc(authUser.user.uid).set(employeeDoc);

    await this.logAudit(AUDIT_ACTIONS.CREATE_EMPLOYEE, authUser.user.uid, {
      employeeData: employeeDoc,
    });

    return {
      user: authUser.user,
      employeeData: employeeDoc,
    };
  }

  async listEmployees() {
    const snapshot = await this.db.collection("employees").orderBy("name").get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async getEmployee(id) {
    const doc = await this.db.collection("employees").doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  }

  async updateEmployee(id, updates) {
    const payload = {
      ...updates,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    await this.db.collection("employees").doc(id).update(payload);
    await this.logAudit(AUDIT_ACTIONS.UPDATE_EMPLOYEE, id, { updates });
    return this.getEmployee(id);
  }

  async deleteEmployee(id) {
    await this.db.collection("employees").doc(id).delete();
    await this.logAudit(AUDIT_ACTIONS.DELETE_EMPLOYEE, id);
    return true;
  }

  /**
   * Registra colaborador a partir de dados de perfil social (Google), útil para onboard inicial
   */
  addNewUserFromSocial(user) {
    const collection = this.db.collection("employees");
    const { profile } = user.additionalUserInfo;
    const details = {
      ...EMPLOYEE_INITIAL_VALUE,
      name: profile.given_name || profile.first_name || "",
      lastName: profile.family_name || profile.last_name || "",
      email: profile.email || user.email,
      photoUrl: profile.picture || "",
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      lastLoginTime: firebase.firestore.FieldValue.serverTimestamp(),
      role: "employee",
    };
    return collection.doc(firebase.auth().currentUser.uid).set(details).then(async () => {
      await this.logAudit(AUDIT_ACTIONS.CREATE_EMPLOYEE, firebase.auth().currentUser.uid, {
        source: "social_login",
        employeeData: details,
      });
      return {
        user,
        details,
      };
    });
  }
}

let _employeesHelper = null;

export const getEmployeesHelper = () => {
  if (!_employeesHelper) {
    _employeesHelper = new EmployeesHelper();
  }
  return _employeesHelper;
};
