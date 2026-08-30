import SplashScreen from './components/SplashScreen';
import { useState, useEffect } from 'react'
import Header from './components/Header'
import HeroBanner from './components/HeroBanner'
import BankMarquee from './components/BankMarquee'
import CardList from './components/CardList'
import FAQSection from './components/FAQSection'
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

  return (
    <div className="min-h-screen flex flex-col bg-white relative overflow-x-hidden">
      <SplashScreen />
      <Header />
      
      <main className="flex-1 flex flex-col">
        {hash === '#/guide' ? (
          <GuidePage />
        ) : (
          <>
            <HeroBanner />
            <BankMarquee />
            <CardList />
            <FAQSection />
          </>
        )}
      </main>

      <Footer />
      <FloatingContact />
    </div>
  )
}

export default App
