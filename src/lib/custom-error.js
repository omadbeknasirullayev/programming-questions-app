class CustomError extends Error {
  constructor(status, message) {
    super(message);
    this.name = "CustomError"; // Xatolik nomi
    this.statusCode = status; // HTTP status kodi (agar kerak bo‘lsa)
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = CustomError