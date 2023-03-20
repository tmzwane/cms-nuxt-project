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

export const noConnection = {
  success: false,
  error: "no connection to backend",
  status_code: 503,
  description: "Couldn't connect to the requested backend.",
};

export function backendErrorParser(errorDetails) {
  if (Object.keys(errorDetails).length < 1) {
    errorDetails = noConnection;
  }

  let responseStatus;
  let responseMessage;

  if ("response" in errorDetails) {
    responseStatus = errorDetails.response.status;
    if ("data" in errorDetails.response) {
      const { data } = errorDetails.response;
      responseMessage = data.message || errorDetails.message;
    } else {
      responseMessage =
        errorDetails.error || errorDetails.message || errorDetails.description;
    }
  }

  throw createError({
    statusCode: responseStatus,
    statusMessage: responseMessage,
    fatal: true,
  });
}
