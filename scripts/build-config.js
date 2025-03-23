const fs = require('fs');
const path = require('path');

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

// Write the modified HTML back to the file
fs.writeFileSync(indexPath, html);

console.log('Configuration injected successfully!'); 