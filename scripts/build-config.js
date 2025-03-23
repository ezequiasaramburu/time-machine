const fs = require('fs');
const path = require('path');

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

// Read the index.html file
const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// Create the config object with environment variables
const config = {
    secretCodes: {
        code1: process.env.NEXT_PUBLIC_SECRET_CODE_1,
        code2: process.env.NEXT_PUBLIC_SECRET_CODE_2,
        code3: process.env.NEXT_PUBLIC_SECRET_CODE_3,
        code4: process.env.NEXT_PUBLIC_SECRET_CODE_4,
        code5: process.env.NEXT_PUBLIC_SECRET_CODE_5
    }
};

// Create the config script
const configScript = `
    <script>
        window.APP_CONFIG = ${JSON.stringify(config, null, 2)};
    </script>
`;

// Replace the placeholder with the config script
html = html.replace('<!-- APP_CONFIG_PLACEHOLDER -->', configScript);

// Write the modified HTML to dist directory
fs.writeFileSync(path.join(distDir, 'index.html'), html);

// Copy other necessary files to dist directory
const filesToCopy = [
    'styles.css',
    'script.js',
    'data.js',
    'favicon.svg',
    'site.webmanifest'
];

filesToCopy.forEach(file => {
    const sourcePath = path.join(__dirname, '..', file);
    const destPath = path.join(distDir, file);
    if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destPath);
    }
});

console.log('Build completed successfully!'); 