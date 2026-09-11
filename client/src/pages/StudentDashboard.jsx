import { BookOpen, Save, SlidersHorizontal } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import FilterPanel from '../components/FilterPanel'
import JobCard from '../components/JobCard'
import SkillCard from '../components/SkillCard'
import { useAuth } from '../context/AuthContext'
import { MOCK_SKILL_PROGRAMS } from '../data/mockData'
import api from '../services/api'

const initialFilters = { search: '', type: '', location: '', skills: '' }
const emptySkills = []

export default function StudentDashboard() {
  const { user, updateProfile } = useAuth()
  const [searchParams] = useSearchParams()
  const activeTab = searchParams.get('tab') || 'opportunities'

  const [filters, setFilters] = useState(initialFilters)
  const [jobs, setJobs] = useState([])
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [skillInput, setSkillInput] = useState(user?.skills?.join(', ') || '')
  const [savingSkills, setSavingSkills] = useState(false)
  const [profileMessage, setProfileMessage] = useState('')

  const studentSkills = user?.skills ?? emptySkills

  const query = useMemo(
    () => ({
      ...Object.fromEntries(Object.entries(filters).filter(([, value]) => value)),
      ...(studentSkills.length ? { studentSkills: studentSkills.join(',') } : {}),
    }),
    [filters, studentSkills]
  )

  // Fetch opportunities when on Opportunities tab
  useEffect(() => {
    if (activeTab !== 'opportunities') return
    let active = true
    setLoading(true)
    setError('')
    api
      .get('/jobs', { params: query })
      .then(({ data }) => {
        if (active) setJobs(data.jobs)
      })
      .catch(() => {
        if (active) setError('We could not load opportunities. Check that the API and MongoDB are running.')
      })
      .finally(() => active && setLoading(false))

    return () => {
      active = false
    }
  }, [query, activeTab])

  // Filter skills catalog when on Skill Development tab
  useEffect(() => {
    if (activeTab !== 'skills') return
    setLoading(true)
    setError('')

    // Client-side filtering on mock data or API fallback
    let filtered = MOCK_SKILL_PROGRAMS
    if (filters.type) {
      filtered = filtered.filter(
        (p) => p.type.toLowerCase() === filters.type.toLowerCase()
      )
    }
    if (filters.skills) {
      const searchSkill = filters.skills.toLowerCase()
      filtered = filtered.filter((p) =>
        p.skills.some((s) => s.toLowerCase().includes(searchSkill))
      )
    }
    setPrograms(filtered)
    setLoading(false)
  }, [filters, activeTab])

  useEffect(() => setSkillInput(studentSkills.join(', ')), [studentSkills])

  const change = (key, value) => setFilters((current) => ({ ...current, [key]: value }))

  const saveSkills = async (event) => {
    event.preventDefault()
    setSavingSkills(true)
    setProfileMessage('')
    try {
      await updateProfile({
        skills: skillInput
          .split(',')
          .map((skill) => skill.trim())
          .filter(Boolean),
      })
      setProfileMessage('Profile updated')
    } catch (err) {
      setProfileMessage(err.response?.data?.message || 'Could not update your skills')
    } finally {
      setSavingSkills(false)
    }
  }

  return (
    <div className="page-frame dashboard-page">
      {/* Dynamic Intro */}
      <section className="dashboard-intro">
        <div>
          <p className="kicker">
            {activeTab === 'opportunities' ? 'Student workspace' : 'Skill Development & Training'}
          </p>
          <h1>
            {activeTab === 'opportunities'
              ? 'Good morning. Find a role worth growing into.'
              : 'Master skills. Build proofs. Get certified.'}
          </h1>
          <p>
            {activeTab === 'opportunities'
              ? 'Explore opportunities matched to the skills you are building now.'
              : 'Workshops, certification tracks, and cohorts matched to industry demand.'}
          </p>
        </div>
      </section>

      {/* Counter Rule */}
      <div className="dashboard-rule">
        <span>
          {activeTab === 'opportunities'
            ? `${jobs.length} opportunities available`
            : `${programs.length} programs available`}
        </span>
      </div>

      {/* Shared Profile Skills Bar */}
      <section className="skills-profile">
        <div>
          <p className="kicker">Your profile</p>
          <h2>Skills that shape your matches</h2>
          <p>Matched against target requirements and mentor roadmaps.</p>
        </div>
        <form className="skills-editor" onSubmit={saveSkills}>
          <label>
            Your skills
            <input
              value={skillInput}
              onChange={(event) => setSkillInput(event.target.value)}
              placeholder="React, SQL, Figma"
            />
          </label>
          <div className="skills-editor-actions">
            <button className="primary-button" type="submit" disabled={savingSkills}>
              <Save size={15} />
              {savingSkills ? 'Saving...' : 'Save skills'}
            </button>
            {profileMessage && (
              <span className="profile-message" role="status">
                {profileMessage}
              </span>
            )}
          </div>
        </form>
      </section>

      {/* Main Grid: Filter Aside + Content Feed */}
      <div className="content-grid">
        <aside>
          <div className="filter-heading">
            <SlidersHorizontal size={17} />
            <span>Refine results</span>
          </div>
          <FilterPanel
            filters={filters}
            onChange={change}
            onClear={() => setFilters(initialFilters)}
          />
        </aside>

        <section className="results-column">
          <div className="results-header">
            <div>
              <p className="kicker">
                {activeTab === 'opportunities' ? 'Opportunity board' : 'Learning catalog'}
              </p>
              <h2>
                {activeTab === 'opportunities' ? 'Roles to explore' : 'Training & Certifications'}
              </h2>
            </div>
            <span className="results-count">
              {loading
                ? 'Loading...'
                : `${activeTab === 'opportunities' ? jobs.length : programs.length} found`}
            </span>
          </div>

          {error && (
            <div className="inline-error" role="alert">
              {error}
            </div>
          )}

          {loading ? (
            <div className="loading-list">
              <div />
              <div />
              <div />
            </div>
          ) : activeTab === 'opportunities' ? (
            jobs.length ? (
              <div className="job-list">
                {jobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <h3>No opportunities match those filters.</h3>
                <p>Try a broader search or clear one of the filters.</p>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setFilters(initialFilters)}
                >
                  Reset filters
                </button>
              </div>
            )
          ) : programs.length ? (
            <div className="job-list">
              {programs.map((program) => (
                <SkillCard key={program._id} program={program} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No programs match those filters.</h3>
              <p>Try resetting the filters to view all workshops and certifications.</p>
              <button
                type="button"
                className="secondary-button"
                onClick={() => setFilters(initialFilters)}
              >
                Reset filters
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}