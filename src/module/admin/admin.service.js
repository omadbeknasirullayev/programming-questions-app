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
    const check = await this.repository.findByUsername(body.username);
    if (check) {
      throw new CustomError(409, "This username already exists!");
    }
    body.password = await hashed(body.password);
    const data = await this.repository.create(body);
    return data;
  }

  /**
   * find all service
   * @return {AdminModel[]}
   */
  async findAll() {
    const data = await this.repository.findAll();
    return data;
  }

  /**
   * find one admin service
   * @param {number} id
   * @return {AdminModel}
   */
  async findOne(id) {
    const data = await this.repository.findOne(id);
    if (!data) {
      throw new CustomError(404, "Admin not found!");
    }
    return data;
  }

  /**
   * update admin Service
   * @param {number} id
   * @param {AdminModel} body
   */
  async update(id, body) {
    await this.getOne(id);
    if (body.password) {
      body.password = await hashed(body.password);
    }
    const data = await this.repository.update(id, body);
    return data;
  }

  /**
   * delete admin Service
   * @param {number} id
   */
  async remove(id) {
    await this.findOne(id);
    const data = await this.repository.remove(id);
    return data;
  }
}

module.exports = AdminService;
