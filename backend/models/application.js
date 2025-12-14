// models/Application.js (अगर Firebase use कर रहे हैं)
const { getDatabase } = require("firebase-admin/database");

class Application {
  constructor() {
    this.db = getDatabase();
    this.ref = this.db.ref("applications");
  }

  async create(applicationData) {
    try {
      const id = Date.now().toString();
      const applicationRef = this.ref.child(id);

      // Add metadata
      const fullData = {
        ...applicationData,
        id: id,
        createdAt: new Date().toISOString(),
        status: "pending",
        updatedAt: new Date().toISOString(),
      };

      await applicationRef.set(fullData);
      return { id, ...fullData };
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const snapshot = await this.ref.once("value");
      const applications = snapshot.val();
      return applications
        ? Object.entries(applications).map(([id, data]) => ({ id, ...data }))
        : [];
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      const snapshot = await this.ref.child(id).once("value");
      return snapshot.val();
    } catch (error) {
      throw error;
    }
  }

  async updateStatus(id, status) {
    try {
      await this.ref.child(id).update({
        status: status,
        updatedAt: new Date().toISOString(),
      });
      return true;
    } catch (error) {
      throw error;
    }
  }

  async getByEmail(email) {
    try {
      const snapshot = await this.ref
        .orderByChild("personalDetails/email")
        .equalTo(email)
        .once("value");
      const applications = snapshot.val();
      return applications
        ? Object.entries(applications).map(([id, data]) => ({ id, ...data }))
        : [];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new Application();
