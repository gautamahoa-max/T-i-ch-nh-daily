const highlightRegex = /(\d+(?:\.\d+)*\s*VND[^\s,.]*|\d+\s*triệu(?:\s*đồng)?|\d+(?:\.\d+)?%|miễn phí)/i;

const text = "Tổng chi tiêu/kỳ xét thưởng đạt từ 30 triệu trở lên: Hoàn 15% giao dịch chi tiêu dịch vụ giải trí, tối đa 1.200.000 VND.";
const colonIndex = text.indexOf(':');
let beforeColon = '';
let restText = text;
if (colonIndex !== -1 && colonIndex < 60) {
  beforeColon = text.substring(0, colonIndex + 1);
  restText = text.substring(colonIndex + 1);
}

// Split requires a regex with 'g' to split all occurrences
const splitRegex = /(\d+(?:\.\d+)*\s*VND[^\s,.]*|\d+\s*triệu(?:\s*đồng)?|\d+(?:\.\d+)?%|miễn phí)/gi;
const parts = restText.split(splitRegex);

console.log("Before colon:", beforeColon);
parts.forEach(p => {
  if (p.match(splitRegex)) {
    console.log("MATCH:", p);
  } else {
    console.log("TEXT:", p);
  }
});

