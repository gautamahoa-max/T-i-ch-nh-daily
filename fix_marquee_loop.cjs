const fs = require('fs');
let content = fs.readFileSync('src/components/BankMarquee.jsx', 'utf8');

const oldLogic = `          // If we scrolled past one full set of items, reset to beginning seamlessly
          // We assume half the scroll width is the safe reset point since we duplicated items
          if (container.scrollLeft >= container.scrollWidth / 3) {
            container.scrollLeft = 0;
          }`;

const newLogic = `          // Infinite loop handling for both directions
          const oneBlockWidth = container.scrollWidth / 3;
          if (container.scrollLeft >= oneBlockWidth * 2) {
            container.scrollLeft -= oneBlockWidth;
          } else if (container.scrollLeft <= 0) {
            container.scrollLeft += oneBlockWidth;
          }`;

if (content.includes(oldLogic)) {
    content = content.replace(oldLogic, newLogic);
    fs.writeFileSync('src/components/BankMarquee.jsx', content);
    console.log('Fixed loop logic');
} else {
    console.log('Could not find loop logic');
}
