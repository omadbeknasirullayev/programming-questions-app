const { AdminModel } = require("../../model");
const { ErrorHandler, CustomError } = require("../../shared/helper/lib");
const { hashed } = require("../../shared/helper/utility");
const AdminRepository = require("./admin.repository");

class AdminService {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.repository = new AdminRepository(req, res);
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
      new ErrorHandler(this.res, error);
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
      new ErrorHandler(this.res, error);
    }
  }

  /**
   * find one admin service
   * @param {number} id
   * @return {AdminModel}
   */
  async findOne(id) {
    // try {
    const data = await this.repository.findOne(id);
    if (!data) {
      throw new CustomError(404, "Admin not found!");
    }
    await this.repository.closeDb();
    return data;
    // } catch (error) {
    //   await this.repository.closeDb();
    //   await new ErrorHandler(this.res, error);
    // }
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
      return data;
    } catch (error) {
      new ErrorHandler(this.res, error);
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
      return data;
    } catch (error) {
      await this.repository.closeDb();
      await new ErrorHandler(res, error);
    }
  }
}

module.exports = AdminService;
