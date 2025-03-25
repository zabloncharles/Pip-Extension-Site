const { createCanvas } = require('canvas');
const fs = require('fs');

const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 }
];

function drawFavicon(size) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    const scale = size / 512;

    // Clear background
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, size, size);

    // Draw TV body
    ctx.fillStyle = '#2ecc71';
    ctx.beginPath();
    ctx.roundRect(76 * scale, 100 * scale, 360 * scale, 280 * scale, 20 * scale);
    ctx.fill();

    // Draw TV screen
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(96 * scale, 120 * scale, 320 * scale, 240 * scale, 10 * scale);
    ctx.fill();

    // Draw play symbol
    ctx.fillStyle = '#2ecc71';
    ctx.beginPath();
    ctx.moveTo(226 * scale, 200 * scale);
    ctx.lineTo(226 * scale, 280 * scale);
    ctx.lineTo(306 * scale, 240 * scale);
    ctx.closePath();
    ctx.fill();

    // Draw TV stand
    ctx.beginPath();
    ctx.moveTo(156 * scale, 400 * scale);
    ctx.lineTo(356 * scale, 400 * scale);
    ctx.lineTo(336 * scale, 460 * scale);
    ctx.lineTo(176 * scale, 460 * scale);
    ctx.closePath();
    ctx.fill();

    return canvas;
}

async function generateFavicons() {
    try {
        for (const { name, size } of sizes) {
            const canvas = drawFavicon(size);
            const buffer = canvas.toBuffer('image/png');
            fs.writeFileSync(`assets/${name}`, buffer);
        }
        console.log('Favicons generated successfully!');
    } catch (error) {
        console.error('Error generating favicons:', error);
    }
}

generateFavicons(); 