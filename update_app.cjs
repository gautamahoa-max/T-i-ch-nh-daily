const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');

if (!content.includes("import FAQSection")) {
  content = content.replace("import CardList from './components/CardList'", "import CardList from './components/CardList'\nimport FAQSection from './components/FAQSection'");
}

const oldHome = `          <>
            <HeroBanner />
            <BankMarquee />
            <CardList />
          </>`;

const newHome = `          <>
            <HeroBanner />
            <BankMarquee />
            <CardList />
            <FAQSection />
          </>`;

content = content.replace(oldHome, newHome);

fs.writeFileSync('src/App.jsx', content);
console.log('App updated');
