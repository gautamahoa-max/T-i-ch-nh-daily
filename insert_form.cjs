const fs = require('fs');
let content = fs.readFileSync('src/components/GuidePage.jsx', 'utf8');

if (!content.includes('import ConsultationForm')) {
    content = "import ConsultationForm from './ConsultationForm';\n" + content;
}

if (!content.includes('<ConsultationForm />')) {
    content = content.replace(
        '          </section>\n\n              </div>\n    </div>',
        '          </section>\n\n          <ConsultationForm />\n\n              </div>\n    </div>'
    );
    fs.writeFileSync('src/components/GuidePage.jsx', content);
    console.log("ConsultationForm added to GuidePage.jsx");
} else {
    console.log("ConsultationForm already in GuidePage.jsx");
}
