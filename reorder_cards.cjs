const fs = require('fs');
let code = fs.readFileSync('src/components/CardList.jsx', 'utf8');

// Extract the cards array block
const startMatch = code.match(/const cards = \[/);
const endMatch = code.match(/\];\n\nexport default function CardList/);

if (startMatch && endMatch) {
  const startIndex = startMatch.index;
  const endIndex = endMatch.index + 2; // include ];
  
  const arrayCode = code.substring(startIndex, endIndex);
  
  // We can just manipulate the string by swapping blocks.
  // Or parse it with regex.
  // The block for card 2 is:
  /*
  {
    id: 2,
    name: "OCB Natural Credit",
    description: "Lan tỏa lối sống xanh cùng thẻ nội địa. Miễn phí rút tiền mặt mọi ATM trên toàn quốc.",
    image: imgNatural,
    metrics: "Miễn phí khi rút tiền"
  },
  */
  
  const card2Regex = /\s*{\s*id: 2,[\s\S]*?metrics: "Miễn phí khi rút tiền"\s*},?/;
  const card2Match = arrayCode.match(card2Regex);
  
  if (card2Match) {
    let cleanArrayCode = arrayCode.replace(card2Match[0], '');
    
    // Add it to the end before ];
    let card2Str = card2Match[0].trim();
    if (card2Str.endsWith(',')) {
      card2Str = card2Str.slice(0, -1);
    }
    
    // Make sure the last item has a comma
    cleanArrayCode = cleanArrayCode.replace(/}\n\];/, '},\n  ' + card2Str + '\n];');
    
    const newCode = code.substring(0, startIndex) + cleanArrayCode + code.substring(endIndex);
    fs.writeFileSync('src/components/CardList.jsx', newCode);
    console.log("Success");
  } else {
    console.log("Could not find card 2");
  }
}
