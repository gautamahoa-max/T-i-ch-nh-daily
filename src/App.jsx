import { useState, useEffect } from 'react'
import Header from './components/Header'
import HeroBanner from './components/HeroBanner'
import BankMarquee from './components/BankMarquee'
import CardList from './components/CardList'
import Footer from './components/Footer'
import FloatingContact from './components/FloatingContact'
import GuidePage from './components/GuidePage'

function App() {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => {
      setHash(window.location.hash);
      window.scrollTo(0, 0); // scroll to top when changing route
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (hash === '#/guide') {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 relative">
        <GuidePage />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 relative md:pb-0 overflow-x-hidden">
      <Header />
      
      <main className="flex-1 flex flex-col">
        <HeroBanner />
        <BankMarquee />
        <CardList />
      </main>

      <Footer />
      <FloatingContact />
    </div>
  )
}

export default App
