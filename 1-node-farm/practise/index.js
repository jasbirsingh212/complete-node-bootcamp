const fs = require("fs");
const http = require("http");
const url = require("url");

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
/*
fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
  if (err) return "Error from callback 1";

  console.log(data);
});


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
*/

//Creating Servers in NodeJS-------------------------------------------------------------

const replaceTemplate = (temp, product) => {
  const {
    id,
    productName,
    image,
    from,
    nutrients,
    quantity,
    price,
    organic,
    description,
  } = product;

  const output = temp
    .replace(/{%PRODUCTNAME%}/g, productName)
    .replace(/{%ID%}/g, id)
    .replace(/{%IMAGE%}/g, image)
    .replace(/{%PRICE%}/g, price)
    .replace(/{%QUANTITY%}/g, quantity)
    .replace(/{%NOT_ORGANIC%}/g, organic || "not-organic")
    .replace(/{%DESCRIPTION%}/g, description)
    .replace(/{%FROM%}/g, from)
    .replace(/{%NUTRIENTS%}/g, nutrients);

  return output;
};

const data = fs.readFileSync("./dev-data/data.json", "utf-8");
const tempOverview = fs.readFileSync(
  "./templates/template-overview.html",
  "utf-8"
);
const tempCard = fs.readFileSync("./templates/template-card.html", "utf-8");
const tempProduct = fs.readFileSync(
  "./templates/template-product.html",
  "utf-8"
);
const productData = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname: pathName } = url.parse(req.url, true);

  if (pathName === "/" || pathName === "/overview") {
    const cardHtml = productData
      ?.map((el) => replaceTemplate(tempCard, el))
      .join("");
    const outputTemplate = tempOverview.replace(/{%PRODUCT_CARDS%}/, cardHtml);

    res.writeHead(200, {
      "Content-type": "text/html",
    });

    res.end(outputTemplate);
  } else if (pathName === "/product") {
    const product = productData[query.id];
    const outputProduct = replaceTemplate(tempProduct, product);

    res.writeHead(200, {
      "Content-type": "text/html",
    });
    res.end(outputProduct);
  } else if (pathName === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });

    res.end(data);
  } else {
    res.writeHead(404);
    res.end("<h1>Page Not Found!</h1>");
  }

  //res.end("Hello From the Server!");
});

server.listen(8000, "127.0.0.1", () => {
  console.log(`Server is Running on Port: ${8000}`);
});
