const fs = require('fs');

const file = 'src/components/ConsultationForm.jsx';
let content = fs.readFileSync(file, 'utf8');

const newProvinces = `const PROVINCES = [
  "An Giang", "Bắc Ninh", "Cao Bằng", "Cà Mau", "Cần Thơ", 
  "Đà Nẵng", "Đắk Lắk", "Điện Biên", "Đồng Nai", "Đồng Tháp", 
  "Gia Lai", "Hà Nội", "Hà Tĩnh", "Hải Phòng", "Hồ Chí Minh", 
  "Huế", "Hưng Yên", "Khánh Hòa", "Lai Châu", "Lâm Đồng", 
  "Lạng Sơn", "Lào Cai", "Nghệ An", "Ninh Bình", "Phú Thọ", 
  "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sơn La", "Tây Ninh", 
  "Thái Nguyên", "Thanh Hóa", "Tuyên Quang", "Vĩnh Long"
];`;

content = content.replace(/const PROVINCES = \[\s*[\s\S]*?\];/, newProvinces);

fs.writeFileSync(file, content);
console.log("Updated PROVINCES to 34 units");
