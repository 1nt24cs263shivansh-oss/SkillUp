import { useState } from 'react'
import {
  Award,
  BookCheck,
  Briefcase,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Mail,
  Plus,
  Search,
  SlidersHorizontal,
  UserCheck,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const initialMentees = [
  {
    id: 'mentee-1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@nmit.ac.in',
    college: 'Nitte Meenakshi Institute of Technology',
    degree: 'B.Tech - Computer Science',
    targetRole: 'Full Stack Engineer',
    skills: ['React', 'Node.js', 'MongoDB', 'JavaScript'],
    activeInternship: {
      company: 'TechCorp Solutions',
      role: 'Frontend Developer Intern',
      duration: '3 of 6 months completed',
      status: 'Ongoing',
    },
    completedCourses: [
      { title: 'Advanced React & Redux Architecture', provider: 'SkillUp Tracks', completedDate: 'Aug 2026' },
      { title: 'Data Structures & Algorithms in Java', provider: 'Coursera', completedDate: 'May 2026' },
    ],
    inProgressCourses: [
      { title: 'Microservices with Docker & Node.js', progress: 65 },
    ],
    mentorNote: 'Consistently completes weekly milestones. Prepared for mid-level frontend interviews.',
  },
  {
    id: 'mentee-2',
    name: 'Diya Patel',
    email: 'diya.p@pes.edu',
    college: 'PES University',
    degree: 'B.Tech - Information Science',
    targetRole: 'Data & Backend Analyst',
    skills: ['Python', 'SQL', 'PostgreSQL', 'Docker'],
    activeInternship: null,
    completedCourses: [
      { title: 'Database Optimization & SQL Mastery', provider: 'SkillUp Tracks', completedDate: 'Jul 2026' },
    ],
    inProgressCourses: [
      { title: 'Python for Distributed Systems', progress: 40 },
    ],
    mentorNote: 'Focused on algorithmic complexity. Exploring upcoming backend internships.',
  },
  {
    id: 'mentee-3',
    name: 'Rohan Das',
    email: 'rohan.das@rvce.edu',
    college: 'RV College of Engineering',
    degree: 'B.E - Computer Science',
    targetRole: 'Cloud Systems Associate',
    skills: ['AWS', 'Linux', 'Python', 'Go'],
    activeInternship: {
      company: 'CloudScale Networks',
      role: 'DevOps Intern',
      duration: '1 of 3 months completed',
      status: 'Ongoing',
    },
    completedCourses: [
      { title: 'AWS Cloud Practitioner Prep', provider: 'AWS Training', completedDate: 'Jun 2026' },
      { title: 'Linux System Administration Fundamentals', provider: 'edX', completedDate: 'Apr 2026' },
    ],
    inProgressCourses: [
      { title: 'Kubernetes in Production', progress: 80 },
    ],
    mentorNote: 'Strong system architecture foundations. Actively shadowing production on-call rotations.',
  },
]

export default function MentorDashboard() {
  const { user } = useAuth()
  const [mentees, setMentees] = useState(initialMentees)
  const [search, setSearch] = useState('')
  const [expandedId, setExpandedId] = useState(null)
  const [noteModalStudent, setNoteModalStudent] = useState(null)
  const [newNote, setNewNote] = useState('')

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  const filteredMentees = mentees.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.targetRole.toLowerCase().includes(search.toLowerCase()) ||
      m.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()))
  )

  const handleSaveNote = (e) => {
    e.preventDefault()
    setMentees((prev) =>
      prev.map((m) => (m.id === noteModalStudent.id ? { ...m, mentorNote: newNote } : m))
    )
    setNoteModalStudent(null)
    setNewNote('')
  }

  const totalInternships = mentees.filter((m) => m.activeInternship).length
  const totalCompletedCourses = mentees.reduce((sum, m) => sum + m.completedCourses.length, 0)

  return (
    <div className="page-frame dashboard-page">
      {/* Intro Header */}
      <section className="dashboard-intro">
        <div>
          <p className="kicker">Academic Mentorship</p>
          <h1>Mentor Dashboard</h1>
          <p>Guide your cohort, review learning tracks, and monitor ongoing student internships.</p>
        </div>
      </section>

      {/* Cohort Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
        <div className="bg-white border border-[#e0e5e9] rounded-xl p-5 flex items-center gap-4 shadow-xs">
          <div className="w-12 h-12 rounded-lg bg-[#e6efec] text-[#334631] flex items-center justify-center font-bold">
            <UserCheck size={22} />
          </div>
          <div>
            <span className="text-2xl font-bold text-[#1c1d1f]">{mentees.length}</span>
            <p className="text-xs text-gray-500 font-medium">Assigned Mentees</p>
          </div>
        </div>

        <div className="bg-white border border-[#e0e5e9] rounded-xl p-5 flex items-center gap-4 shadow-xs">
          <div className="w-12 h-12 rounded-lg bg-[#edf1f3] text-[#506b72] flex items-center justify-center font-bold">
            <Briefcase size={22} />
          </div>
          <div>
            <span className="text-2xl font-bold text-[#1c1d1f]">{totalInternships}</span>
            <p className="text-xs text-gray-500 font-medium">Active Internships</p>
          </div>
        </div>

        <div className="bg-white border border-[#e0e5e9] rounded-xl p-5 flex items-center gap-4 shadow-xs">
          <div className="w-12 h-12 rounded-lg bg-[#fbf0ec] text-[#b07d62] flex items-center justify-center font-bold">
            <BookCheck size={22} />
          </div>
          <div>
            <span className="text-2xl font-bold text-[#1c1d1f]">{totalCompletedCourses}</span>
            <p className="text-xs text-gray-500 font-medium">Courses Completed</p>
          </div>
        </div>
      </div>

      {/* Roster Header and Search */}
      <div className="results-header">
        <div>
          <p className="kicker">Assigned Cohort</p>
          <h2>Student Progress & Activity</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-72">
            <input
              type="text"
              placeholder="Search by student, role or skill..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-[#d9dfe5] rounded-lg focus:outline-none"
            />
            <Search className="absolute left-2.5 top-2.5 text-gray-400" size={14} />
          </div>
          <span className="results-count">{filteredMentees.length} students</span>
        </div>
      </div>

      {/* Mentee List Feed */}
      {filteredMentees.length ? (
        <div className="space-y-4">
          {filteredMentees.map((student) => {
            const isExpanded = expandedId === student.id

            return (
              <article
                key={student.id}
                className="bg-white border border-[#e0e5e9] rounded-xl p-6 shadow-xs transition hover:border-[#ccd6df]"
              >
                {/* Mentee Topline Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-[#1c1d1f]">{student.name}</h3>
                      <span className="bg-[#eef1ef] text-[#2b4c3f] text-xs font-bold px-2.5 py-0.5 rounded">
                        Target: {student.targetRole}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 mt-1.5">
                      <span className="flex items-center gap-1">
                        <GraduationCap size={14} className="text-gray-400" />
                        {student.college} ({student.degree})
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail size={13} className="text-gray-400" />
                        {student.email}
                      </span>
                    </div>
                  </div>

                  {/* Actions & Expansion Trigger */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      type="button"
                      className="secondary-button text-xs py-1.5 px-3"
                      onClick={() => {
                        setNoteModalStudent(student)
                        setNewNote(student.mentorNote || '')
                      }}
                    >
                      Update Note
                    </button>
                    <button
                      type="button"
                      className="secondary-button text-xs py-1.5 px-3 flex items-center gap-1.5"
                      onClick={() => toggleExpand(student.id)}
                    >
                      <span>{isExpanded ? 'Hide Details' : 'View Tracks'}</span>
                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                  </div>
                </div>

                {/* Skills Tag Strip */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {student.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-[#f5f7f6] border border-[#dce3df] text-[#334631] text-xs font-semibold px-2.5 py-0.5 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Mentee Expanded Details */}
                {isExpanded && (
                  <div className="mt-5 pt-5 border-t border-[#edf1ee] space-y-5 animate-in fade-in">
                    {/* Active Internship Row */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1.5">
                        <Briefcase size={14} /> Current Internship
                      </h4>
                      {student.activeInternship ? (
                        <div className="bg-[#f8faf9] border border-[#e1e9e4] rounded-lg p-3.5 flex items-center justify-between">
                          <div>
                            <p className="text-sm font-bold text-[#1c1d1f]">
                              {student.activeInternship.role} · {student.activeInternship.company}
                            </p>
                            <span className="text-xs text-gray-500">
                              Duration: {student.activeInternship.duration}
                            </span>
                          </div>
                          <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#e3efe9] text-[#2b4c3f]">
                            {student.activeInternship.status}
                          </span>
                        </div>
                      ) : (
                        <p className="text-xs text-gray-400 italic">No active internship recorded.</p>
                      )}
                    </div>

                    {/* Courses Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* In Progress */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1.5">
                          <BookCheck size={14} /> In-Progress Tracks
                        </h4>
                        <div className="space-y-2">
                          {student.inProgressCourses.map((c, i) => (
                            <div key={i} className="border border-[#e8ecea] rounded-lg p-3">
                              <div className="flex justify-between text-xs font-semibold mb-1">
                                <span>{c.title}</span>
                                <span className="text-gray-500">{c.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                                <div
                                  className="bg-[#627f8c] h-full rounded-full"
                                  style={{ width: `${c.progress}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Completed */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1.5">
                          <Award size={14} /> Verified Completed Courses
                        </h4>
                        <div className="space-y-2">
                          {student.completedCourses.map((c, i) => (
                            <div key={i} className="border border-[#e8ecea] rounded-lg p-2.5 flex justify-between items-center text-xs">
                              <div>
                                <p className="font-semibold text-gray-800">{c.title}</p>
                                <span className="text-[11px] text-gray-400">{c.provider}</span>
                              </div>
                              <span className="text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                {c.completedDate}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Mentor Feedback & Endorsement Strip */}
                    {student.mentorNote && (
                      <div className="bg-[#fffbf0] border border-[#fae8b4] rounded-lg p-3 text-xs">
                        <span className="font-bold text-[#854d0e] block mb-0.5">Mentor Note:</span>
                        <p className="text-[#713f12]">{student.mentorNote}</p>
                      </div>
                    )}
                  </div>
                )}
              </article>
            )
          })}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No student found</h3>
          <p>Try resetting the search bar to show all cohort members.</p>
        </div>
      )}

      {/* Mentor Note / Endorsement Modal */}
      {noteModalStudent && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white border border-[#e8e8e3] rounded-2xl max-w-lg w-full p-6 shadow-xl relative animate-in fade-in">
            <h2 className="text-lg font-bold text-[#1c1d1f] mb-1">
              Mentor Note for {noteModalStudent.name}
            </h2>
            <p className="text-xs text-gray-500 mb-4">
              Add developmental feedback, milestone checks, or interview preparation remarks.
            </p>

            <form onSubmit={handleSaveNote}>
              <textarea
                className="w-full text-xs border border-[#d9dfe5] rounded-lg p-3 focus:outline-none min-h-[110px]"
                placeholder="Write your feedback..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                required
              />
              <div className="flex gap-2 justify-end mt-4">
                <button
                  type="button"
                  className="secondary-button text-xs py-1.5 px-3"
                  onClick={() => setNoteModalStudent(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="primary-button text-xs py-1.5 px-4">
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}