const fs = require('fs');
let content = fs.readFileSync('src/components/BankMarquee.jsx', 'utf8');

const oldComponent = `const BankLogo = ({ bank }) => {
  const [imgError, setImgError] = useState(false);
  const localSrc = bankLogos[bank.name];

  if (imgError || !localSrc) {
    return (
      <div className="flex-shrink-0 flex items-center justify-center h-20 px-8 bg-white border border-gray-100 rounded-xl shadow-sm mx-3 ">
        <span className="font-bold text-gray-700 text-lg uppercase tracking-wider">{bank.name}</span>
      </div>
    );
  }

  return (
    <div className="flex-shrink-0 flex items-center justify-center h-20 w-40 bg-white border border-gray-100 rounded-xl shadow-sm mx-3 p-3 transition-transform hover:scale-105 cursor-default ">
      <img
        src={localSrc}
        alt={bank.name}
        className="max-h-full max-w-full object-contain"
        onError={() => setImgError(true)}
        loading="lazy"
      />
    </div>
  );
};`;

const newComponent = `const BankLogo = ({ bank }) => {
  const [imgError, setImgError] = useState(false);
  const localSrc = bankLogos[bank.name];

  if (imgError || !localSrc) {
    return (
      <div className="group flex-shrink-0 flex items-center justify-center h-32 w-48 mx-2 rounded-2xl transition-all duration-300 hover:bg-white/60 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-pointer">
        <div className="flex items-center justify-center h-20 w-40 bg-white border border-gray-100 rounded-xl shadow-sm transition-transform duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover:scale-110">
          <span className="font-bold text-gray-700 text-sm text-center uppercase tracking-wider px-2">{bank.name}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex-shrink-0 flex items-center justify-center h-32 w-48 mx-2 rounded-2xl transition-all duration-300 hover:bg-white/60 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-pointer">
      <div className="flex items-center justify-center h-20 w-40 bg-white border border-gray-100 rounded-xl shadow-sm p-3 transition-transform duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover:scale-110">
        <img
          src={localSrc}
          alt={bank.name}
          className="max-h-full max-w-full object-contain"
          onError={() => setImgError(true)}
          loading="lazy"
        />
      </div>
    </div>
  );
};`;

content = content.replace(oldComponent, newComponent);
fs.writeFileSync('src/components/BankMarquee.jsx', content);
console.log("BankLogo updated");
