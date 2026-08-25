const fs = require('fs');
let code = fs.readFileSync('src/components/CardList.jsx', 'utf8');

code = code.replace(/"Hoàn tiền 15%"/g, '"Dòng thẻ dành riêng cho giới trẻ"');

fs.writeFileSync('src/components/CardList.jsx', code);
