async function bodyParser(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", function (data) {
      body += data;
    });

    req.on("end", function () {
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });

    req.on("error", function (err) {
      reject(err);
    });
  });
}

module.exports = bodyParser;
