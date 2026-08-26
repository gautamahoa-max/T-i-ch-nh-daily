import Header from './components/Header'
import HeroBanner from './components/HeroBanner'
import BankMarquee from './components/BankMarquee'
import CardList from './components/CardList'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 relative pb-24 md:pb-0 overflow-x-hidden">
      <Header />
      
      <main className="flex-1 flex flex-col">
        <HeroBanner />
        <BankMarquee />
        <CardList />
      </main>

      <Footer />
    </div>
  )
}

export default App
