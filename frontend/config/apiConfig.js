import axios from "axios";

let serverUrl;

if (process && "env" in process && "NUXT_API_BASE_URL" in process.env) {
  serverUrl = process.env.NUXT_API_BASE_URL;
} else {
  serverUrl = "http://localhost:5000/api";
}

console.info({ serverUrl });

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

export default axios.create({
  baseURL: serverUrl,
});
