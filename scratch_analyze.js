const fs = require('fs');
const jpeg = require('jpeg-js');

const jpegData = fs.readFileSync('public/gutsnglorylogo.jpeg');
const rawImageData = jpeg.decode(jpegData, {useTArray: true});

const colorCounts = {};

for (let i = 0; i < rawImageData.data.length; i += 4) {
  const r = rawImageData.data[i];
  const g = rawImageData.data[i + 1];
  const b = rawImageData.data[i + 2];
  
  // Quantize a bit to group similar colors (16 bins per channel)
  const qr = Math.floor(r / 16) * 16;
  const qg = Math.floor(g / 16) * 16;
  const qb = Math.floor(b / 16) * 16;
  
  const hex = '#' + ((1 << 24) + (qr << 16) + (qg << 8) + qb).toString(16).slice(1);
  colorCounts[hex] = (colorCounts[hex] || 0) + 1;
}

const sortedColors = Object.entries(colorCounts).sort((a, b) => b[1] - a[1]).slice(0, 15);
console.log('Dominant colors (quantized):');
sortedColors.forEach(([color, count]) => {
  console.log(`${color}: ${count}`);
});
