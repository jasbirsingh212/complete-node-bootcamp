const fs = require("fs");

const readText = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(readText);

const arr = ["Jasbir", "Singh", "25", "frontend-development"];
const writeText = `My name is ${arr[0]} ${arr[1]}.
 My age is ${arr[2]}.
 I want to become a ${arr[3]}.
`;

fs.writeFileSync("./txt/output.txt", writeText);
console.log("file is written");
