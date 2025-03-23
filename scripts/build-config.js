const fs = require('fs');
const path = require('path');

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
    console.log('Created dist directory');
}

// Copy index.html to dist
fs.copyFileSync(
    path.join(__dirname, '..', 'index.html'),
    path.join(distDir, 'index.html')
);
console.log('Copied index.html to dist');

// Copy other necessary files
const filesToCopy = [
    'styles.css',
    'script.js',
    'data.js',
    'favicon.svg'
];

filesToCopy.forEach(file => {
    const sourcePath = path.join(__dirname, '..', file);
    const destPath = path.join(distDir, file);
    
    if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destPath);
        console.log(`Copied ${file} to dist`);
    } else {
        console.error(`Warning: ${file} not found in source directory`);
    }
});

console.log('Build completed successfully!'); 