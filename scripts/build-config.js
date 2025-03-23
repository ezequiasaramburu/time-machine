const fs = require('fs');
const path = require('path');

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

// Copy index.html to dist
fs.copyFileSync(
    path.join(__dirname, '..', 'index.html'),
    path.join(distDir, 'index.html')
);

// Copy other necessary files
const filesToCopy = [
    'styles.css',
    'script.js',
    'data.js'
];

filesToCopy.forEach(file => {
    fs.copyFileSync(
        path.join(__dirname, '..', file),
        path.join(distDir, file)
    );
});

console.log('Build completed successfully!'); 