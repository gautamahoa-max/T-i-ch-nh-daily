const fs = require('fs');
let content = fs.readFileSync('src/components/CardList.jsx', 'utf8');

content = content.replace(
  'metrics: "Phòng chờ VIP"',
  'metrics: "Dòng thẻ dành cho các tín đồ Nhật Bản"'
);

fs.writeFileSync('src/components/CardList.jsx', content);
console.log('Metrics updated');
