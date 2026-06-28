import StatusBar from './components/StatusBar.jsx'
import Hero from './components/Hero.jsx'
import Pillars from './components/Pillars.jsx'
import Work from './components/Work.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <StatusBar />
      <div className="wrap">
        <Hero />
        <Pillars />
        <Work />
        <Contact />
      </div>
      <Footer />
    </>
  )
}
