import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import QRCode from "qrcode";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const membersPath = path.join(root, "members.json");
const outDir = path.join(root, "qr");

const members = JSON.parse(fs.readFileSync(membersPath, "utf8"));
fs.mkdirSync(outDir, { recursive: true });

const base = "https://portal.mmrvsolar.com/?m=";

for (const code of Object.keys(members)) {
  const url = base + encodeURIComponent(code);
  const svg = await QRCode.toString(url, {
    type: "svg",
    margin: 1,
    width: 180,
    color: { dark: "#2a2118", light: "#fffaf3" }
  });
  fs.writeFileSync(path.join(outDir, code + ".svg"), svg, "utf8");
}

console.log("Wrote " + Object.keys(members).length + " QR SVGs to qr/");