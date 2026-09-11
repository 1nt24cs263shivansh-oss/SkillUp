import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

export default function LandingPage() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame
    const updateProgress = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setProgress(clamp(window.scrollY / (window.innerHeight * 0.9), 0, 1)))
    }
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', updateProgress)
    }
  }, [])

  const titleStyle = {
    transform: `translate3d(calc(-50% - ${progress * 42}vw), ${progress * -34}vh, 0) scale(${1 - progress * 0.72})`,
  }

  return <main className="landing-scroll">
    <section className="landing-stage" aria-label="SkillUp introduction">
      <h1 className="landing-word" style={titleStyle}>SkillUp</h1>
      <span className="scroll-cue" style={{ opacity: 1 - progress * 2 }}>Scroll <span aria-hidden="true">↓</span></span>
    </section>
    <section className="landing-about" aria-labelledby="about-skillup">
      <div className="about-content" style={{ opacity: clamp(progress * 1.35, 0, 1), transform: `translateY(${(1 - progress) * 28}px)` }}>
        <p className="kicker">About SkillUp</p>
        <h2 id="about-skillup">Learn into opportunity.</h2>
        <p>SkillUp connects students with industry opportunities by helping them understand their skills, find relevant roles and build the competencies those roles require.</p>
        <div className="landing-actions"><Link className="primary-button" to="/login">Login</Link><Link className="secondary-button" to="/register">Sign up</Link></div>
      </div>
    </section>
  </main>
}
