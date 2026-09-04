import StatusBar from './StatusBar.jsx'
import Footer from './Footer.jsx'

export default function Layout({ children }) {
  return (
    <>
      <StatusBar />
      <div className="wrap">{children}</div>
      <Footer />
    </>
  )
}
