import { useState } from 'react'
import {
  Briefcase,
  Building2,
  ChevronDown,
  ChevronUp,
  Clock3,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  Plus,
  Search,
  Trash2,
  Users,
  X,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

// Helper to generate a random score between 40 and 100
const getRandomScore = () => Math.floor(Math.random() * (100 - 40 + 1)) + 40

const initialJobs = [
  {
    _id: 'rec-1',
    title: 'Frontend Developer Intern',
    company: 'TechCorp Solutions',
    type: 'internship',
    location: 'Remote',
    duration: '6 months',
    experienceLevel: 'Entry',
    applicantsCount: 3,
    skills: ['React', 'JavaScript', 'CSS', 'Tailwind'],
    status: 'Active',
    applicants: [
      {
        id: 'app-1',
        name: 'Aarav Sharma',
        email: 'aarav.sharma@example.com',
        college: 'NMIT Bengaluru',
        degree: 'B.Tech - Computer Science',
        score: getRandomScore(),
        skills: ['React', 'JavaScript', 'Tailwind CSS'],
      },
      {
        id: 'app-2',
        name: 'Diya Patel',
        email: 'diya.patel@example.com',
        college: 'PES University',
        degree: 'B.Tech - Information Science',
        score: getRandomScore(),
        skills: ['React', 'TypeScript', 'CSS'],
      },
      {
        id: 'app-3',
        name: 'Rohan Das',
        email: 'rohan.das@example.com',
        college: 'RV College of Engineering',
        degree: 'B.E - Computer Science',
        score: getRandomScore(),
        skills: ['React', 'Next.js', 'Redux'],
      },
    ],
  },
  {
    _id: 'rec-2',
    title: 'Junior Software Engineer',
    company: 'TechCorp Solutions',
    type: 'full-time',
    location: 'Bengaluru, KA',
    duration: 'Full-time',
    experienceLevel: 'Junior',
    applicantsCount: 2,
    skills: ['Node.js', 'Python', 'SQL', 'MongoDB'],
    status: 'Active',
    applicants: [
      {
        id: 'app-4',
        name: 'Pooja Nair',
        email: 'pooja.nair@example.com',
        college: 'BMS College of Engineering',
        degree: 'B.Tech - Computer Science',
        score: getRandomScore(),
        skills: ['Node.js', 'Express', 'MongoDB'],
      },
      {
        id: 'app-5',
        name: 'Kunal Verma',
        email: 'kunal.v@example.com',
        college: 'MS Ramaiah Institute of Technology',
        degree: 'B.E - Information Science',
        score: getRandomScore(),
        skills: ['Python', 'SQL', 'PostgreSQL'],
      },
    ],
  },
]

export default function RecruiterDashboard() {
  const { user } = useAuth()
  const [jobs, setJobs] = useState(initialJobs)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)

  // Applicants modal state
  const [selectedJobForApplicants, setSelectedJobForApplicants] = useState(null)
  const [expandedApplicantId, setExpandedApplicantId] = useState(null)

  const [newJob, setNewJob] = useState({
    title: '',
    company: user?.name ? `${user.name}'s Company` : 'TechCorp Solutions',
    type: 'internship',
    location: 'Remote',
    duration: '3 months',
    experienceLevel: 'Entry',
    skills: '',
    description: '',
  })

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.skills.some((skill) => skill.toLowerCase().includes(search.toLowerCase()))
  )

  const handlePostJob = (e) => {
    e.preventDefault()
    const createdJob = {
      _id: `rec-${Date.now()}`,
      title: newJob.title,
      company: newJob.company,
      type: newJob.type,
      location: newJob.location,
      duration: newJob.duration,
      experienceLevel: newJob.experienceLevel,
      applicantsCount: 0,
      skills: newJob.skills.split(',').map((s) => s.trim()).filter(Boolean),
      status: 'Active',
      applicants: [],
    }

    setJobs([createdJob, ...jobs])
    setShowModal(false)
    setNewJob({
      title: '',
      company: user?.name ? `${user.name}'s Company` : 'TechCorp Solutions',
      type: 'internship',
      location: 'Remote',
      duration: '3 months',
      experienceLevel: 'Entry',
      skills: '',
      description: '',
    })
  }

  const handleDeleteJob = (id) => {
    setJobs(jobs.filter((j) => j._id !== id))
    if (selectedJobForApplicants?._id === id) {
      setSelectedJobForApplicants(null)
    }
  }

  const handleOpenApplicants = (job) => {
    // If the job has no mock applicant objects yet, generate them dynamically
    if (!job.applicants || job.applicants.length === 0) {
      const generated = Array.from({ length: job.applicantsCount || 2 }).map((_, idx) => ({
        id: `app-gen-${job._id}-${idx}`,
        name: `Candidate ${idx + 1}`,
        email: `candidate${idx + 1}@university.edu`,
        college: 'NMIT Bengaluru',
        degree: 'B.Tech - Computer Science',
        score: getRandomScore(),
        skills: job.skills.slice(0, 3),
      }))
      const updatedJobs = jobs.map((j) => (j._id === job._id ? { ...j, applicants: generated } : j))
      setJobs(updatedJobs)
      setSelectedJobForApplicants({ ...job, applicants: generated })
    } else {
      setSelectedJobForApplicants(job)
    }
    setExpandedApplicantId(null)
  }

  const toggleExpandApplicant = (id) => {
    setExpandedApplicantId((prev) => (prev === id ? null : id))
  }

  const totalApplicants = jobs.reduce((acc, job) => acc + (job.applicantsCount || 0), 0)

  return (
    <div className="page-frame dashboard-page">
      {/* Recruiter Workspace Hero */}
      <section className="dashboard-intro">
        <div>
          <p className="kicker">Industry Workspace</p>
          <h1>Recruiter Dashboard</h1>
          <p>Post opportunities, track applicants, and discover job-ready student talent.</p>
        </div>
        <button className="primary-button" type="button" onClick={() => setShowModal(true)}>
          <Plus size={16} /> Post new opportunity
        </button>
      </section>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
        <div className="bg-white border border-[#e0e5e9] rounded-xl p-5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-lg bg-[#e6efec] text-[#627f8c] flex items-center justify-center font-bold">
            <Briefcase size={22} />
          </div>
          <div>
            <span className="text-2xl font-bold text-[#1c1d1f]">{jobs.length}</span>
            <p className="text-xs text-gray-500 font-medium">Active Postings</p>
          </div>
        </div>

        <div className="bg-white border border-[#e0e5e9] rounded-xl p-5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-lg bg-[#fbf0ec] text-[#b07d62] flex items-center justify-center font-bold">
            <Users size={22} />
          </div>
          <div>
            <span className="text-2xl font-bold text-[#1c1d1f]">{totalApplicants}</span>
            <p className="text-xs text-gray-500 font-medium">Total Applicants</p>
          </div>
        </div>

        <div className="bg-white border border-[#e0e5e9] rounded-xl p-5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-lg bg-[#edf1f3] text-[#506b72] flex items-center justify-center font-bold">
            <Building2 size={22} />
          </div>
          <div>
            <span className="text-2xl font-bold text-[#1c1d1f]">SkillUp Verified</span>
            <p className="text-xs text-gray-500 font-medium">Company Account</p>
          </div>
        </div>
      </div>

      {/* Postings Section Header & Search */}
      <div className="results-header">
        <div>
          <p className="kicker">Your Opportunities</p>
          <h2>Manage Job Postings</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search postings..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-[#d9dfe5] rounded-lg focus:outline-none"
            />
            <Search className="absolute left-2.5 top-2.5 text-gray-400" size={14} />
          </div>
          <span className="results-count">{filteredJobs.length} postings</span>
        </div>
      </div>

      {/* Job Postings Feed */}
      {filteredJobs.length ? (
        <div className="job-list">
          {filteredJobs.map((job) => (
            <article key={job._id} className="job-card">
              <div className="company-initial">{job.title.charAt(0)}</div>
              <div className="job-card-body">
                <div className="job-card-topline">
                  <span className="eyebrow">{job.type === 'internship' ? 'Internship' : 'Full-time'}</span>
                  <span className="experience-label">{job.experienceLevel} level</span>
                  <span className="bg-[#eef1ef] text-[#2b4c3f] text-[10px] font-bold px-2 py-0.5 rounded ml-auto">
                    {job.status}
                  </span>
                </div>

                <h3>{job.title}</h3>
                <p className="company-name">{job.company}</p>

                <div className="job-meta">
                  <span>
                    <MapPin size={14} />
                    {job.location}
                  </span>
                  {job.duration && (
                    <span>
                      <Clock3 size={14} />
                      {job.duration}
                    </span>
                  )}
                  <span>
                    <Users size={14} />
                    {job.applicantsCount} applicants
                  </span>
                </div>

                <div className="skill-list">
                  {job.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-end justify-between h-full gap-4">
                <button
                  type="button"
                  className="text-gray-400 hover:text-red-600 transition"
                  title="Remove posting"
                  onClick={() => handleDeleteJob(job._id)}
                >
                  <Trash2 size={16} />
                </button>
                <button
                  type="button"
                  className="secondary-button text-xs py-1.5 px-3"
                  onClick={() => handleOpenApplicants(job)}
                >
                  View Applicants ({job.applicantsCount})
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No job postings found</h3>
          <p>You haven't created any job postings yet, or no results match your filter.</p>
          <button className="primary-button" type="button" onClick={() => setShowModal(true)}>
            <Plus size={15} /> Create your first job posting
          </button>
        </div>
      )}

      {/* View Applicants Modal */}
      {/* View Applicants Modal */}
{selectedJobForApplicants && (
  <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 md:p-10">
    <div className="bg-white border border-[#e8e8e3] rounded-2xl max-w-5xl w-full p-8 shadow-2xl relative animate-in fade-in max-h-[90vh] flex flex-col">
      {/* Close Button */}
      <button
        onClick={() => setSelectedJobForApplicants(null)}
        className="absolute top-6 right-6 text-gray-400 hover:text-black transition"
      >
        <X size={20} />
      </button>

      {/* Header */}
      <div className="mb-6 pb-4 border-b border-[#ecece8]">
        <p className="kicker">List of Candidates</p>
        <h2 className="text-2xl font-bold text-[#1c1d1f]">
          Applicants for {selectedJobForApplicants.title}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Review candidate profiles, university credentials, and verified Skill Assessment scores.
        </p>
      </div>

      {/* Applicant List Scrollable Container */}
      <div className="overflow-y-auto space-y-4 pr-2">
        {selectedJobForApplicants.applicants && selectedJobForApplicants.applicants.length > 0 ? (
          selectedJobForApplicants.applicants.map((applicant) => {
            const isExpanded = expandedApplicantId === applicant.id

            return (
              <div
                key={applicant.id}
                className="border border-[#e0e5e9] rounded-xl p-5 bg-[#fcfcfb] transition hover:border-[#ccd6df] hover:shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h4 className="text-base font-bold text-[#1c1d1f]">
                        {applicant.name}
                      </h4>
                      <span className="text-xs font-medium text-gray-500 bg-[#f4f5f4] px-2 py-0.5 rounded border border-[#e8e8e3]">
                        {applicant.degree}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                      <GraduationCap size={14} className="text-gray-400" />
                      {applicant.college}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-center">
                    {/* Random Assessment Score Badge */}
                    <div className="text-right">
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded inline-block ${
                          applicant.score >= 75
                            ? 'bg-[#eef1ef] text-[#2b4c3f]'
                            : applicant.score >= 55
                            ? 'bg-[#fef9c3] text-[#854d0e]'
                            : 'bg-[#fff7f5] text-[#a34e3f]'
                        }`}
                      >
                        {applicant.score}% Score
                      </span>
                      <span className="block text-[10px] text-gray-400 font-medium mt-0.5">
                        Technical & Aptitude
                      </span>
                    </div>

                    {/* View Profile (down arrow) Button */}
                    <button
                      type="button"
                      onClick={() => toggleExpandApplicant(applicant.id)}
                      className="secondary-button text-xs py-1.5 px-3 flex items-center gap-1.5 text-[#566576] hover:text-black"
                    >
                      <span>View Profile</span>
                      {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                    </button>
                  </div>
                </div>

                {/* Expandable Applicant Details */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-[#ede9e2] text-xs space-y-3 animate-in fade-in">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-gray-400" />
                        <span className="font-medium text-gray-800">{applicant.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <GraduationCap size={15} className="text-gray-400" />
                        <span>{applicant.college} ({applicant.degree})</span>
                      </div>
                    </div>

                    <div>
                      <span className="font-semibold text-gray-700 block mb-1.5">
                        Verified Skills & Competencies:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {applicant.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="bg-white border border-[#dbe4e9] text-[#476276] text-xs font-semibold px-2.5 py-0.5 rounded-md shadow-2xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })
        ) : (
          <p className="text-sm text-gray-400 text-center py-12">
            No candidates have applied to this opportunity yet.
          </p>
        )}
      </div>
    </div>
  </div>
)}

      {/* New Opportunity Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white border border-[#e8e8e3] rounded-2xl max-w-lg w-full p-6 shadow-xl relative animate-in fade-in">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black"
            >
              <X size={18} />
            </button>

            <h2 className="text-xl font-bold text-[#1c1d1f] mb-1">Post a New Opportunity</h2>
            <p className="text-xs text-gray-500 mb-5">
              Create a job or internship listing to reach qualified candidates.
            </p>

            <form onSubmit={handlePostJob} className="auth-form text-xs">
              <label>
                Job Title
                <input
                  type="text"
                  placeholder="e.g. Backend Engineer Intern"
                  value={newJob.title}
                  onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                  required
                />
              </label>

              <div className="form-row">
                <label>
                  Role Type
                  <select
                    value={newJob.type}
                    onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
                  >
                    <option value="internship">Internship</option>
                    <option value="full-time">Full-time</option>
                  </select>
                </label>

                <label>
                  Experience Level
                  <select
                    value={newJob.experienceLevel}
                    onChange={(e) => setNewJob({ ...newJob, experienceLevel: e.target.value })}
                  >
                    <option value="Entry">Entry level</option>
                    <option value="Junior">Junior level</option>
                    <option value="Mid">Mid level</option>
                  </select>
                </label>
              </div>

              <div className="form-row">
                <label>
                  Location
                  <input
                    type="text"
                    placeholder="Remote or City"
                    value={newJob.location}
                    onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                    required
                  />
                </label>

                <label>
                  Duration / Engagement
                  <input
                    type="text"
                    placeholder="e.g. 6 months / Permanent"
                    value={newJob.duration}
                    onChange={(e) => setNewJob({ ...newJob, duration: e.target.value })}
                    required
                  />
                </label>
              </div>

              <label>
                Required Skills (comma-separated)
                <input
                  type="text"
                  placeholder="React, Python, SQL, AWS"
                  value={newJob.skills}
                  onChange={(e) => setNewJob({ ...newJob, skills: e.target.value })}
                  required
                />
              </label>

              <div className="flex gap-2 pt-3">
                <button type="submit" className="primary-button full-width">
                  Publish Listing
                </button>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}