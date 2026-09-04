import Layout from '../components/Layout.jsx'
import Hero from '../components/Hero.jsx'
import Pillars from '../components/Pillars.jsx'
import Experience from '../components/Experience.jsx'
import Work from '../components/Work.jsx'
import VultraTeaser from '../components/VultraTeaser.jsx'
import Contact from '../components/Contact.jsx'
import { useDocumentMeta } from '../lib/useDocumentMeta.js'

export default function Home() {
  useDocumentMeta({
    title: 'Ashiq — Full-Stack Engineer',
    description: 'Full-stack engineer — Spring Boot backend, React frontend, native Android. Portfolio and freelance contact.',
    url: 'https://ashiq.vercel.app/',
  })

  return (
    <Layout>
      <Hero />
      <Pillars />
      <Experience />
      <Work />
      <VultraTeaser />
      <Contact />
    </Layout>
  )
}
