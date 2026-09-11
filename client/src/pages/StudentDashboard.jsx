import { BookOpen, Save, SlidersHorizontal } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import FilterPanel from '../components/FilterPanel'
import JobCard from '../components/JobCard'
import SkillCard from '../components/SkillCard'
import { useAuth } from '../context/AuthContext'
import { MOCK_SKILL_PROGRAMS } from '../data/mockData'
import api from '../services/api'

const initialFilters = { search: '', type: '', location: '', skills: '', experienceLevel: '' }
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

  // Clear filters whenever switching between Opportunities and Skill Development
  useEffect(() => {
    setFilters(initialFilters)
    setError('')
  }, [activeTab])

  const query = useMemo(
    () => ({
      ...Object.fromEntries(Object.entries(filters).filter(([, value]) => value)),
      ...(studentSkills.length ? { studentSkills: studentSkills.join(',') } : {}),
    }),
    [filters, studentSkills]
  )

  // Fetch opportunities from API when on Opportunities tab
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

  // Filter skills catalog locally based on search, type, skills, and level
  useEffect(() => {
    if (activeTab !== 'skills') return
    setLoading(true)
    setError('')

    let filtered = [...MOCK_SKILL_PROGRAMS]

    // Event type filter
    if (filters.type) {
      filtered = filtered.filter(
        (program) => program.type?.toLowerCase() === filters.type.toLowerCase()
      )
    }

    // Free text search (title, provider, description)
    if (filters.search) {
      const term = filters.search.toLowerCase()
      filtered = filtered.filter(
        (program) =>
          program.title?.toLowerCase().includes(term) ||
          program.provider?.toLowerCase().includes(term) ||
          program.description?.toLowerCase().includes(term)
      )
    }

    // Specific skills input filter
    if (filters.skills) {
      const searchSkill = filters.skills.toLowerCase().trim()
      filtered = filtered.filter((program) =>
        program.skills?.some((s) => s.toLowerCase().includes(searchSkill))
      )
    }

    // Experience / Difficulty level filter
    if (filters.experienceLevel) {
      filtered = filtered.filter(
        (program) => program.level?.toLowerCase() === filters.experienceLevel.toLowerCase()
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
      {/* Intro Header */}
      <section className="dashboard-intro">
        <div>
          <p className="kicker">
            {activeTab === 'opportunities' ? 'Student workspace' : 'Skill Development & Acceleration'}
          </p>
          <h1>
            {activeTab === 'opportunities'
              ? 'Good morning. Find a role worth growing into.'
              : 'Master skills. Build proofs. Get certified.'}
          </h1>
          <p>
            {activeTab === 'opportunities'
              ? 'Explore opportunities matched to the skills you are building now.'
              : 'Workshops, certification tracks, and mentorship cohorts matched to industry demand.'}
          </p>
        </div>
      </section>

      {/* Counter Rule */}
      <div className="dashboard-rule">
        <span>
          {activeTab === 'opportunities'
            ? `${jobs.length} opportunities available`
            : `${programs.length} learning programs available`}
        </span>
      </div>

      {/* Skills Profile Strip */}
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

      {/* Filter Sidebar & Results Grid */}
      <div className="content-grid">
        <aside>
          <div className="filter-heading">
            <SlidersHorizontal size={17} />
            <span>{activeTab === 'skills' ? 'Filter events' : 'Refine results'}</span>
          </div>
          <FilterPanel
            filters={filters}
            onChange={change}
            onClear={() => setFilters(initialFilters)}
            isSkillView={activeTab === 'skills'}
          />
        </aside>

        <section className="results-column">
          <div className="results-header">
            <div>
              <p className="kicker">
                {activeTab === 'opportunities' ? 'Opportunity board' : 'Event & Course Catalog'}
              </p>
              <h2>
                {activeTab === 'opportunities' ? 'Roles to explore' : 'Programs & Initiatives'}
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
              <h3>No learning events match those filters.</h3>
              <p>Try selecting a different event type or clearing your search filters.</p>
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