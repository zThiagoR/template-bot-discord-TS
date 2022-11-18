import "dotenv/config";

import Client from "./client";

new Client();

process.on('unhandledRejection', (reason, promise) => console.error(reason, promise));
process.on('uncaughtExceptionMonitor', (err, origin) => console.error(err, origin));