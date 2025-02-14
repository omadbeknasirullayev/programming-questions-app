class SuccessResponse {
  constructor(res) {
    this.res = res;
  }

  async response(status, data, message) {
    this.res.writeHead(status, { "Content-Type": "application/json" });
    this.res.end(
      JSON.stringify({ statusCode: status, data: data, message: message }),
    );
  }
}

module.exports = { SuccessResponse };
