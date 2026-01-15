import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import ExperienceSection from './components/ExperienceSection'
import GallerySection from './components/GallerySection'
import TargetSection from './components/TargetSection'
import ApplySection from './components/ApplySection'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="app">
      {/* 종이 질감 오버레이 */}
      <div className="paper-texture-overlay"></div>
      
      <Navigation />
      <HeroSection />
      <ExperienceSection />
      <GallerySection />
      <TargetSection />
      <ApplySection />
      <Footer />
    </div>
  )
}

export default App
