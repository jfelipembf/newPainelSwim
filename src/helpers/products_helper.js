import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import { AUDIT_ACTIONS, AUDIT_RESOURCES } from "../constants/audit";
import { getAuditHelper } from "./audit_helper";
import { getStorageHelper } from "./storage_helper";

class ProductsHelper {
  constructor() {
    if (!firebase.apps.length) {
      throw new Error("Firebase app not initialized");
    }

    this.db = firebase.firestore();
    this.auth = firebase.auth();
    this.storageHelper = getStorageHelper?.();
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
      resource: AUDIT_RESOURCES.PRODUCTS,
      resourceId,
      details,
    });
  }

  async uploadPhoto(file) {
    if (!file || !this.storageHelper) return "";
    const path = `products/${Date.now()}_${file.name}`;
    const uploadResult = await this.storageHelper.uploadPhoto(file, path);
    return uploadResult.url;
  }

  async createProduct(data) {
    const docRef = this.db.collection("products").doc();
    const payload = {
      ...data,
      idProduct: data.idProduct || docRef.id,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    await docRef.set(payload);
    await this.logAudit(AUDIT_ACTIONS.CREATE_PRODUCT, docRef.id, { product: payload });
    return { id: docRef.id, ...payload };
  }

  async listProducts() {
    const snapshot = await this.db.collection("products").get();
    return snapshot.docs.map((doc) => {
      const data = doc.data() || {};
      return { id: doc.id, idProduct: data.idProduct || doc.id, ...data };
    });
  }

  async getProduct(id) {
    const doc = await this.db.collection("products").doc(id).get();
    if (!doc.exists) return null;
    const data = doc.data() || {};
    return { id: doc.id, idProduct: data.idProduct || doc.id, ...data };
  }

  async updateProduct(id, updates) {
    const payload = {
      ...updates,
      idProduct: updates.idProduct || id,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    await this.db.collection("products").doc(id).update(payload);
    await this.logAudit(AUDIT_ACTIONS.UPDATE_PRODUCT, id, { updates: payload });
    return this.getProduct(id);
  }

  async deleteProduct(id) {
    if (!id) {
      throw new Error("Product id is required for deletion");
    }

    await this.db.collection("products").doc(id).delete();
    await this.logAudit(AUDIT_ACTIONS.DELETE_PRODUCT, id);
    return true;
  }
}

let _productsHelper = null;

export const getProductsHelper = () => {
  if (!_productsHelper) {
    _productsHelper = new ProductsHelper();
  }
  return _productsHelper;
};
