import app from "./app.js";
import { connect } from "./db/index.js";

const HOST = process.env.HOST;
const PORT = process.env.PORT;

(() => {
  app.listen(PORT, async () => {
    console.info(`Server is running on http://${HOST}:${PORT}`);
    await connect();
  });
})();
