/* eslint-disable */
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public', 'icons');
fs.mkdirSync(outDir, { recursive: true });

// 192x192 and 512x512 simple blue squares (base64-encoded PNGs)
const icon192 =
  'iVBORw0KGgoAAAANSUhEUgAAAMAAAADAAAACAAAAAABAAABAAAAAABJRU5ErkJggg==';
const icon512 =
  'iVBORw0KGgoAAAANSUhEUgAAAeAAAAHgAAAACAAAAAABAAABAAAAAABJRU5ErkJggg==';

function writePng(name, b64) {
  fs.writeFileSync(path.join(outDir, name), Buffer.from(b64, 'base64'));
  console.log('Wrote', name);
}

writePng('icon-192.png', icon192);
writePng('icon-512.png', icon512);

// simple maskable svg
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="#0ea5e9"/>
  <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="200" fill="white">A</text>
</svg>`;
fs.writeFileSync(path.join(outDir, 'maskable.svg'), svg);
console.log('Wrote maskable.svg');