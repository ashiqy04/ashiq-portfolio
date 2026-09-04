import Layout from '../components/Layout.jsx'
import Hero from '../components/Hero.jsx'
import Pillars from '../components/Pillars.jsx'
import Work from '../components/Work.jsx'
import VultraTeaser from '../components/VultraTeaser.jsx'
import Contact from '../components/Contact.jsx'

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Pillars />
      <Work />
      <VultraTeaser />
      <Contact />
    </Layout>
  )
}
