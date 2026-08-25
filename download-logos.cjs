const fs = require('fs');
const https = require('https');
const path = require('path');

const targetBanks = [
  'MBBank', 'Techcombank', 'ACB', 'UOB', 'HSBC', 'Standard Chartered',
  'BIDV', 'Vietcombank', 'Sacombank', 'VIB', 'Shinhan Bank', 'VietinBank',
  'VPBank', 'TPBank', 'HDBank', 'MSB', 'Agribank', 'KBank', 'LPBank',
  'Eximbank', 'Nam A Bank', 'SCB', 'SHB', 'ABBank', 'Vietbank',
  'BaoViet Bank', 'Viet A Bank', 'PGBank', 'Indovina Bank', 'DongA Bank'
];

// Mapping to VietQR shortNames if different
const nameMapping = {
  'MBBank': 'MB',
  'Techcombank': 'Techcombank',
  'ACB': 'ACB',
  'UOB': 'UOB',
  'HSBC': 'HSBC',
  'Standard Chartered': 'SCVN',
  'BIDV': 'BIDV',
  'Vietcombank': 'Vietcombank',
  'Sacombank': 'Sacombank',
  'VIB': 'VIB',
  'Shinhan Bank': 'ShinhanBank',
  'VietinBank': 'VietinBank',
  'VPBank': 'VPBank',
  'TPBank': 'TPBank',
  'HDBank': 'HDBank',
  'MSB': 'MSB',
  'Agribank': 'Agribank',
  'KBank': 'Kbank',
  'LPBank': 'LPBank',
  'Eximbank': 'Eximbank',
  'Nam A Bank': 'NamABank',
  'SCB': 'SCB',
  'SHB': 'SHB',
  'ABBank': 'ABBANK',
  'Vietbank': 'Vietbank',
  'BaoViet Bank': 'BaoVietBank',
  'Viet A Bank': 'VietABank',
  'PGBank': 'PGBank',
  'Indovina Bank': 'IVB',
  'DongA Bank': 'DongABank'
};

const downloadFile = (url, dest) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        resolve(false);
        return;
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(true);
      });
    }).on('error', (err) => resolve(false));
  });
};

https.get('https://api.vietqr.io/v2/banks', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', async () => {
    const json = JSON.parse(data);
    const apiBanks = json.data;
    
    // Create mapping of shortName -> logo
    const logoMap = {};
    for (const b of apiBanks) {
      logoMap[b.shortName.toLowerCase()] = b.logo;
    }

    const savedMap = {};

    for (const bankName of targetBanks) {
      const searchName = nameMapping[bankName].toLowerCase();
      const logoUrl = logoMap[searchName];
      const filename = bankName.replace(/\s+/g, '_').toLowerCase() + '.png';
      const dest = path.join(__dirname, 'src/assets/images/banks', filename);

      if (logoUrl) {
        const success = await downloadFile(logoUrl, dest);
        if (success) {
          console.log(`✅ Downloaded: ${bankName}`);
          savedMap[bankName] = filename;
        } else {
          console.log(`❌ Failed to download: ${bankName} from ${logoUrl}`);
        }
      } else {
        console.log(`⚠️ Not found in API: ${bankName}`);
      }
    }
    
    // Generate an index file to import all these in BankMarquee.jsx
    let jsCode = `export const bankLogos = {\n`;
    for (const [name, file] of Object.entries(savedMap)) {
      jsCode += `  "${name}": new URL('./${file}', import.meta.url).href,\n`;
    }
    jsCode += `};\n`;
    fs.writeFileSync(path.join(__dirname, 'src/assets/images/banks/index.js'), jsCode);
    console.log('✅ Generated index.js');
  });
});
