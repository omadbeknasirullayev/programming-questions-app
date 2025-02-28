const { AdminModel } = require("../../model");
const { CustomError } = require("../../shared/helper/lib");
const { hashed } = require("../../shared/helper/utility");
const AdminRepository = require("./admin.repository");

class AdminService {
  constructor() {
    this.repository = new AdminRepository();
  }

  /**
   * create admin service
   * @param {AdminModel} body
   * @return {AdminModel}
   */
  async create(body) {
    try {
      const check = await this.repository.findByUsername(body.username);
      if (check) {
        throw new CustomError(409, "This username already exists!");
      }
      body.password = await hashed(body.password);
      const data = await this.repository.create(body);
      await this.repository.closeDb();
      return data;
    } catch (error) {
      await this.repository.closeDb();
      throw error;
    }
  }

  /**
   * find all service
   * @return {AdminModel[]}
   */
  async findAll() {
    try {
      const data = await this.repository.findAll();
      await this.repository.closeDb();
      return data;
    } catch (error) {
      await this.repository.closeDb();
      throw error;
    }
  }

  /**
   * find one admin service
   * @param {number} id
   * @return {AdminModel}
   */
  async findOne(id) {
    try {
      const data = await this.repository.findOne(id);
      if (!data) {
        throw new CustomError(404, "Admin not found!");
      }
      await this.repository.closeDb();
      return data;
    } catch (error) {
      await this.repository.closeDb();
      throw error;
    }
  }

  /**
   * update admin Service
   * @param {number} id
   * @param {AdminModel} body
   */
  async update(id, body) {
    try {
      await this.getOne(id);
      if (body.password) {
        body.password = await hashed(body.password);
      }
      const data = await this.repository.update(id, body);
      await this.repository.closeDb();
      return data;
    } catch (error) {
      await this.repository.closeDb();
      throw error;
    }
  }

  /**
   * delete admin Service
   * @param {number} id
   */
  async remove(id) {
    try {
      await this.findOne(id);

      const data = await this.repository.remove(id);
      await this.repository.closeDb();
      return data;
    } catch (error) {
      await this.repository.closeDb();
      throw error;
    }
  }
}

module.exports = AdminService;
