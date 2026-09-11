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
      frame = requestAnimationFrame(() =>
        setProgress(clamp(window.scrollY / (window.innerHeight * 0.9), 0, 1))
      )
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

  return (
    <main className="landing-scroll">
      {/* Pinned Title Stage */}
      <section className="landing-stage" aria-label="SkillUp introduction">
        <h1 className="landing-word" style={titleStyle}>
          SkillUp
        </h1>
        <span className="scroll-cue" style={{ opacity: 1 - progress * 2 }}>
          Scroll <span aria-hidden="true">↓</span>
        </span>
      </section>

      {/* Main Narrative Section */}
      <section className="landing-about" aria-labelledby="about-skillup">
        {/* Editorial Photo Frame in Column 1 */}
        <div
          style={{
            gridColumn: 1,
            alignSelf: 'center',
            opacity: clamp(progress * 1.35, 0, 1),
            transform: `translateY(${(1 - progress) * 36}px)`,
            transition: 'opacity 0.15s linear, transform 0.15s ease-out',
            maxWidth: '430px',
            position: 'relative',
          }}
        >
          {/* Subtle Decorative Offset Mat */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '20px',
              background: '#e3eeea',
              transform: 'rotate(-2.5deg)',
              zIndex: 0,
            }}
          />

          {/* Clean Editorial Photo */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              borderRadius: '18px',
              overflow: 'hidden',
              border: '1px solid #dbe4dc',
              boxShadow: '0 16px 36px -8px rgba(41, 45, 49, 0.1)',
              background: '#ffffff',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80"
              alt="Engineering collaboration and skill building"
              style={{
                width: '100%',
                height: '320px',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        </div>

        {/* Scaled Text Block in Column 2 */}
        <div
          className="about-content"
          style={{
            opacity: clamp(progress * 1.35, 0, 1),
            transform: `translateY(${(1 - progress) * 28}px)`,
            maxWidth: '620px',
          }}
        >
          <p
            className="kicker"
            style={{
              fontSize: '12px',
              letterSpacing: '0.14em',
              marginBottom: '12px',
              color: '#a5798d',
            }}
          >
            About SkillUp
          </p>

          <h2
            id="about-skillup"
            style={{
              fontSize: 'clamp(36px, 4.2vw, 54px)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.04em',
              color: '#292d31',
              marginBottom: '20px',
            }}
          >
            Learn into opportunity.
          </h2>

          <p
            style={{
              fontSize: '18px',
              lineHeight: 1.65,
              color: '#55616b',
              marginBottom: '32px',
            }}
          >
            SkillUp connects students with industry opportunities by helping them understand their
            skills, find relevant roles, and build the verifiable competencies those roles require.
          </p>

          <div className="landing-actions" style={{ gap: '12px' }}>
            <Link
              className="primary-button"
              to="/login"
              style={{ fontSize: '14px', padding: '12px 24px' }}
            >
              Login
            </Link>
            <Link
              className="secondary-button"
              to="/register"
              style={{ fontSize: '14px', padding: '12px 24px' }}
            >
              Sign up
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}