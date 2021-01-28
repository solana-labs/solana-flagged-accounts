const fs = require("fs");
const path = require("path");

console.log("Building Solana Flagged Accounts registry...");

const contents = fs.readFileSync(
  path.resolve(__dirname, "flagged.txt"),
  "utf-8"
);
const flagged = contents.split("\n").filter((line) => line.length === 44);
const output = `module.exports = {
  ${flagged.map((address) => `"${address}": "",`)}
};`;

if (!fs.existsSync(path.resolve(__dirname, "dist"))) {
  fs.mkdirSync(path.resolve(__dirname, "dist"));
}

fs.writeFileSync(path.resolve(__dirname, "dist", "index.js"), output);
fs.copyFileSync(
  path.resolve(__dirname, "index.d.ts"),
  path.resolve(__dirname, "dist", "index.d.ts")
);
