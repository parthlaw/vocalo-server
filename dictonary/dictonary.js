const http = require("https");
const app_id = "3172c541";
const app_key = "11c095f9936ad4e9551f74ff0e6bf4ad";
const fields = "definitions";
const strictMatch = "false";
const URL = (wordId) => {
  const options = {
    host: "od-api.oxforddictionaries.com",
    port: "443",
    path:
      "/api/v2/entries/en-gb/" +
      wordId +
      "?fields=" +
      fields +
      "&strictMatch=" +
      strictMatch,
    method: "GET",
    headers: {
      app_id: app_id,
      app_key: app_key,
    },
  };
  return options;
};
const Dictonary = (word_id) =>
  new Promise((resolve, reject) => {
    const options = URL(word_id);
    http.get(options, (resp) => {
      let body = "";
      resp.on("data", (d) => {
        body += d;
      });
      resp.on("end", () => {
        let parsed = JSON.parse(body);
        resolve(parsed);
      });
    });
  });

module.exports = Dictonary;
