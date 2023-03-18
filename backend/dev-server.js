import * as dotenv from "dotenv";
dotenv.config();

import server from "./server.js";

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server running on port ${port}`));
