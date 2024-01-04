const fs = require("fs");

// Blocking code, synchronous way---------------------------------------
/*
const readText = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(readText);

const arr = ["Jasbir", "Singh", "25", "frontend-development"];
const writeText = `My name is ${arr[0]} ${arr[1]}.
 My age is ${arr[2]}.
 I want to become a ${arr[3]}.
`;

fs.writeFileSync("./txt/output.txt", writeText);
console.log("file is written");

fs.writeFileSync("./txt/output.txt", "I Love Coding!");
console.log("file is written");
*/
//---------------------------------------------------------------------------

//Non-blocking code, asynchronous way ----------------------------------------------

// fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//   if (err) return "Error from callback 1";

//   console.log(data);
// });

fs.readFile("./txt/startt.txt", "utf-8", (err, data1) => {
  if (err) return console.log("Error from callback 1");

  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    if (err) return console.log("Error from callback 2");

    fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
      if (err) return console.log("Error from callback 3");

      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
        console.log("File Has Been Written!");
      });
    });
  });
});

console.log("Reading file ....");
