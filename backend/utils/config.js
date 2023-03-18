const mongoUser = process.env.MONGO_USER || "basebone";
const mongoPass = process.env.MONGO_PASS || "technical-assessment";
const mongoURI = process.env.MONGO_URI || `mongodb://localhost:27017`;

export { mongoUser, mongoPass, mongoURI };
