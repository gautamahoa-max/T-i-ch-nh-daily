const fs = require('fs');
let code = fs.readFileSync('src/components/CardList.jsx', 'utf8');

const newCardObj = `,
  {
    id: 6,
    name: "OCB MASTERCARD PLATINUM",
    description: "Khẳng định dấu ấn cá nhân. Đặc quyền hoàn tiền mua sắm công nghệ và làm đẹp đẳng cấp.",
    image: imgPlatinum,
    metrics: "Hoàn tiền 15% mua sắm"
  }
];`;

code = code.replace(/}\n];/, '}' + newCardObj);
fs.writeFileSync('src/components/CardList.jsx', code);
