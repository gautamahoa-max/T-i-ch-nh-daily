const fs = require('fs');
let content = fs.readFileSync('src/components/FAQSection.jsx', 'utf8');

const oldButton = `<button
                    className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                    onClick={() => toggleItem(index)}
                  >
                    <h3 className="text-lg md:text-xl font-bold text-black pr-8 leading-snug">{faq.question}</h3>
                    <div 
                      className={\`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 \${isOpen ? 'bg-[#FFCC00]' : 'bg-transparent'}\`}
                    >`;

const newButton = `<button
                    className="group w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                    onClick={() => toggleItem(index)}
                  >
                    <h3 className="text-lg md:text-xl font-bold text-black pr-8 leading-snug">{faq.question}</h3>
                    <div 
                      className={\`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 \${isOpen ? 'bg-[#FFCC00]' : 'bg-transparent group-hover:bg-[#FFCC00]'}\`}
                    >`;

content = content.replace(oldButton, newButton);
fs.writeFileSync('src/components/FAQSection.jsx', content);
