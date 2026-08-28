const fs = require('fs');

const path = 'src/components/CardDetailsModal.jsx';
let content = fs.readFileSync(path, 'utf8');

// Insert formatter functions before the component
const formatters = `
const splitRegex = /(\\d+(?:\\.\\d+)*\\s*VND[^\\s,.]*|\\d+\\s*triệu(?:\\s*đồng)?|\\d+(?:\\.\\d+)?%|miễn phí)/gi;

const formatText = (text) => {
  const numberPrefixMatch = text.match(/^(\\d+\\.)\\s+(.*)/);
  if (numberPrefixMatch) {
    return (
      <>
        <span className="font-bold text-ink mr-1">{numberPrefixMatch[1]}</span>
        {formatText(numberPrefixMatch[2])}
      </>
    );
  }

  let beforeColon = '';
  let restText = text;
  const colonIndex = text.indexOf(':');
  if (colonIndex !== -1 && colonIndex < 80) {
    beforeColon = text.substring(0, colonIndex + 1);
    restText = text.substring(colonIndex + 1);
  }

  const parts = restText.split(splitRegex);

  return (
    <span className="leading-relaxed">
      {beforeColon && <strong className="font-bold text-ink mr-1">{beforeColon}</strong>}
      {parts.map((part, i) => {
        if (part.match(splitRegex)) {
          return (
            <span key={i} className="inline-block font-bold text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm mx-0.5 whitespace-nowrap shadow-sm">
              {part}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
};

const getSectionIcon = (title) => {
  const t = title.toLowerCase();
  if (t.includes('phí') || t.includes('lãi')) {
    return (
      <svg className="w-6 h-6 text-accent mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }
  if (t.includes('hạn mức')) {
    return (
      <svg className="w-6 h-6 text-accent mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    );
  }
  if (t.includes('ưu đãi')) {
    return (
      <svg className="w-6 h-6 text-accent mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    );
  }
  if (t.includes('điều kiện')) {
    return (
      <svg className="w-6 h-6 text-accent mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }
  return (
    <svg className="w-6 h-6 text-accent mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
};
`;

content = content.replace('export default function CardDetailsModal', formatters + '\nexport default function CardDetailsModal');

// Replace the rendering part
const oldRender = `{details && details.sections.map((section, index) => (
                <div key={index} className="space-y-3">
                  <h3 className="text-lg font-display font-bold text-accent uppercase tracking-wide border-b border-whisper pb-2">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="font-body text-steel text-base flex items-start">
                        <span className="text-accent mr-2 mt-1 flex-shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}`;

const newRender = `{details && details.sections.map((section, index) => (
                <div key={index} className="bg-white p-5 rounded-xl border border-whisper shadow-sm hover:shadow-md transition-shadow duration-300">
                  <h3 className="text-lg font-display font-bold text-ink uppercase tracking-wide flex items-center border-b border-whisper/60 pb-3 mb-4">
                    {getSectionIcon(section.title)}
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="font-body text-steel text-base flex items-start">
                        <svg className="w-5 h-5 text-accent/70 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        <div className="flex-1">{formatText(item)}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}`;

content = content.replace(oldRender, newRender);

fs.writeFileSync(path, content);
