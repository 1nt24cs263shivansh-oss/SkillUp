import { RotateCcw, Search } from 'lucide-react'

export default function FilterPanel({ filters, onChange, onClear, isSkillView = false }) {
  return (
    <section className="filter-panel" aria-label={isSkillView ? 'Skill development filters' : 'Opportunity filters'}>
      <div className="search-wrap">
        <Search size={18} />
        <input
          value={filters.search}
          onChange={(event) => onChange('search', event.target.value)}
          placeholder={isSkillView ? 'Search programs, tracks or mentors' : 'Search roles, skills or companies'}
          aria-label={isSkillView ? 'Search programs, tracks or mentors' : 'Search roles, skills or companies'}
        />
      </div>

      <div className="filter-grid">
        {isSkillView ? (
          <label>
            Event type
            <select value={filters.type} onChange={(event) => onChange('type', event.target.value)}>
              <option value="">All event types</option>
              <option value="training">Training programs</option>
              <option value="certification">Certification courses</option>
              <option value="workshop">Workshops</option>
              <option value="mentorship">Mentorship initiatives</option>
            </select>
          </label>
        ) : (
          <label>
            Job type
            <select value={filters.type} onChange={(event) => onChange('type', event.target.value)}>
              <option value="">All types</option>
              <option value="internship">Internship</option>
              <option value="full-time">Full-time</option>
            </select>
          </label>
        )}

        {!isSkillView && (
          <label>
            Location
            <input
              value={filters.location}
              onChange={(event) => onChange('location', event.target.value)}
              placeholder="e.g. Bangalore"
            />
          </label>
        )}

        <label>
          Skills
          <input
            value={filters.skills}
            onChange={(event) => onChange('skills', event.target.value)}
            placeholder={isSkillView ? 'e.g. Docker, Python' : 'e.g. React'}
          />
        </label>

        <label>
          Level
          <select value={filters.experienceLevel} onChange={(event) => onChange('experienceLevel', event.target.value)}>
            <option value="">Any level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </label>
      </div>

      <button className="clear-button" type="button" onClick={onClear}>
        <RotateCcw size={14} /> Clear filters
      </button>
    </section>
  )
}