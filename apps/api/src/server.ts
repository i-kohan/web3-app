import "dotenv/config";
import { env } from "./config/env";
import { createApp } from "./app";

const app = createApp();
const port = Number(env.PORT);

app.listen(port, () => {
  console.log(`API listening on :${port}`);
});
