const fs = require('fs');
let content = fs.readFileSync('src/components/ConsultationForm.jsx', 'utf8');
content = content.replace(
  "const data = Object.fromEntries(formData.entries());",
  "const data = Object.fromEntries(formData.entries());\n    data['_captcha'] = 'false';"
);
fs.writeFileSync('src/components/ConsultationForm.jsx', content);
console.log('Added _captcha to AJAX data');
