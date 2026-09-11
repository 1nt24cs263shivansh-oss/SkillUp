import { useSearchParams } from 'react-router-dom'

export default function FilterPanel({ filters, onChange, onClear }) {
  const [searchParams] = useSearchParams()
  const activeTab = searchParams.get('tab') || 'opportunities'

  return (
    <div className="filter-panel">
      <div className="filter-grid">
        <label>
          Search
          <input
            type="text"
            placeholder="Keywords..."
            value={filters.search}
            onChange={(e) => onChange('search', e.target.value)}
          />
        </label>

        {activeTab === 'opportunities' ? (
          <>
            <label>
              Type
              <select value={filters.type} onChange={(e) => onChange('type', e.target.value)}>
                <option value="">All types</option>
                <option value="internship">Internship</option>
                <option value="full-time">Full-time</option>
              </select>
            </label>
            <label>
              Location
              <input
                type="text"
                placeholder="City or Remote"
                value={filters.location}
                onChange={(e) => onChange('location', e.target.value)}
              />
            </label>
          </>
        ) : (
          <label>
            Program Type
            <select value={filters.type} onChange={(e) => onChange('type', e.target.value)}>
              <option value="">All programs</option>
              <option value="Live lectures">Live lectures</option>
              <option value="Courses">Courses</option>
              <option value="Mentorship">Mentorship</option>
              <option value="Challenges">Challenges</option>
              <option value="Workshops">Workshops</option>
            </select>
          </label>
        )}

        <label>
          {activeTab === 'opportunities' ? 'Required Skills' : 'Target Skills'}
          <input
            type="text"
            placeholder="React, Python..."
            value={filters.skills}
            onChange={(e) => onChange('skills', e.target.value)}
          />
        </label>
      </div>

      {(filters.search || filters.type || filters.location || filters.skills) && (
        <button className="clear-button" type="button" onClick={onClear}>
          Clear all filters
        </button>
      )}
    </div>
  )
}