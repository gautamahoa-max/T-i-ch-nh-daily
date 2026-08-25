const fs = require('fs');
const https = require('https');
const path = require('path');

const missingBanks = {
  'MBBank': 'MBBank',
  'UOB': 'UnitedOverseas',
  'Standard Chartered': 'StandardChartered',
  'Indovina Bank': 'IndovinaBank',
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
    
    const logoMap = {};
    for (const b of apiBanks) {
      logoMap[b.shortName.toLowerCase()] = b.logo;
    }

    for (const [bankName, shortName] of Object.entries(missingBanks)) {
      const searchName = shortName.toLowerCase();
      const logoUrl = logoMap[searchName];
      const filename = bankName.replace(/\s+/g, '_').toLowerCase() + '.png';
      const dest = path.join(__dirname, 'src/assets/images/banks', filename);

      if (logoUrl) {
        const success = await downloadFile(logoUrl, dest);
        if (success) {
          console.log(`✅ Downloaded: ${bankName}`);
          
          // Append to index.js
          const exportStatement = `  "${bankName}": new URL('./${filename}', import.meta.url).href,\n`;
          const indexPath = path.join(__dirname, 'src/assets/images/banks/index.js');
          let content = fs.readFileSync(indexPath, 'utf8');
          content = content.replace('};\n', exportStatement + '};\n');
          fs.writeFileSync(indexPath, content);
          
        } else {
          console.log(`❌ Failed to download: ${bankName}`);
        }
      } else {
        console.log(`⚠️ Not found in API: ${bankName}`);
      }
    }
  });
});
