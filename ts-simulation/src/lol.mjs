import { Worker } from "worker_threads";

const p = new Promise((resolve, reject) => {
  const workerData = {
    f: () => "lol"
  }
  const w = new Worker(`
const { workerData, parentPort } = require('worker_threads');
const value = workerData.f();
parentPort.postMessage(value);
`,
    { eval: true, workerData }
  );

  w.on("message", (message) => console.log("message", message));
  w.on("error", (error) => console.log("error", error));
  w.on("messageerror", (error) => console.log("messageerror", error));

  w.on("exit", () => resolve());
});

await p;
