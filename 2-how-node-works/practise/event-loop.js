const fs = require("fs");

setTimeout(() => console.log("Timer finished"), 0);
setImmediate(() => console.log("From immediate callback"));

fs.readFile("test-file.txt", "utf-8", (err, data) => {
  console.log("file reading");
});

console.log("Top level code");
