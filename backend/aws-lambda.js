const awsServerlessExpress = require(`aws-serverless-express`);
const server = require(`./server`);

const binaryMimeTypes = [
  `application/octet-stream`,
  `text/javascript`,
  `text/1html`,
  `text/css`,
  `*~1*`,
];

const serverless = awsServerlessExpress.createServer(
  server,
  null,
  binaryMimeTypes
);

exports.api_handler = (event, context) =>
  awsServerlessExpress.proxy(serverless, event, context);
