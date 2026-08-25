const fs = require('fs');
let code = fs.readFileSync('src/components/CardList.jsx', 'utf8');

code = code.replace(/"Hoàn tiền 12%"/g, '"Dòng thẻ dành riêng cho tín đồ mua sắm"');
code = code.replace(/"Hoàn tiền 15% mua sắm"/g, '"Dòng thẻ dành riêng cho tín đồ công nghệ, làm đẹp"');

fs.writeFileSync('src/components/CardList.jsx', code);
