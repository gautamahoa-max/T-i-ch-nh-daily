const fs = require('fs');

// Update Header.jsx
let headerContent = fs.readFileSync('src/components/Header.jsx', 'utf8');
if (!headerContent.includes("import blogLogo from")) {
    headerContent = headerContent.replace("import { useState } from 'react';", "import { useState } from 'react';\nimport blogLogo from '../assets/images/blog_logo.png';");
}
headerContent = headerContent.replace('"https://ocb.com.vn/assets/images/logo/ocb-logo-full.svg"', '{blogLogo}');
fs.writeFileSync('src/components/Header.jsx', headerContent);

// Update Footer.jsx
let footerContent = fs.readFileSync('src/components/Footer.jsx', 'utf8');
if (!footerContent.includes("import blogLogo from")) {
    footerContent = "import blogLogo from '../assets/images/blog_logo.png';\n" + footerContent;
}
footerContent = footerContent.replace('"https://ocb.com.vn/assets/images/logo/ocb-logo-full.svg"', '{blogLogo}');
fs.writeFileSync('src/components/Footer.jsx', footerContent);

console.log("Logos updated successfully.");
