import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import FeaturedProjects from './components/sections/FeaturedProjects'
import AboutMarquee from './components/sections/AboutMarquee'
import ProjectsStrip from './components/sections/ProjectsStrip'
import ExploreMap from './components/sections/ExploreMap'
import Ecosystem from './components/sections/Ecosystem'
import Insights from './components/sections/Insights'
import Connect from './components/sections/Connect'
import SmoothScrollProvider from './components/animations/SmoothScrollProvider'
import FloatingActions from './components/animations/FloatingActions'
import { ThemeProvider } from './context/ThemeContext'

export default function App() {
  return (
    <ThemeProvider>
      <SmoothScrollProvider>
        <div className="relative min-h-screen theme-surface transition-colors duration-350">
          <Navbar />
          <main>
            <Hero />
            <AboutMarquee />
            <FeaturedProjects />
            <ProjectsStrip />
            <ExploreMap />
            <Ecosystem />
            <Insights />
            <Connect />
          </main>
          <Footer />
          <FloatingActions />
        </div>
      </SmoothScrollProvider>
    </ThemeProvider>
  )
}
