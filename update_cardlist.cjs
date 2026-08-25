const fs = require('fs');
let code = fs.readFileSync('src/components/CardList.jsx', 'utf8');

if (!code.includes('imgPlatinum')) {
  code = code.replace("import imgIgen from '../assets/images/igen.png';", "import imgIgen from '../assets/images/igen.png';\nimport imgPlatinum from '../assets/images/platinum.png';");
}

const newCardObj = `  {
    id: 6,
    name: "OCB MASTERCARD PLATINUM",
    description: "Khẳng định dấu ấn cá nhân. Đặc quyền hoàn tiền mua sắm công nghệ và làm đẹp đẳng cấp.",
    image: imgPlatinum,
    metrics: "Hoàn tiền 15% mua sắm"
  }
];`;

code = code.replace(/];\s*$/, ',\n' + newCardObj + '\n');
fs.writeFileSync('src/components/CardList.jsx', code);
