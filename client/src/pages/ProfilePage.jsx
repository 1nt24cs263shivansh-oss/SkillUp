import {
  ArrowLeft,
  Briefcase,
  ExternalLink,
  FolderGit2,
  Github,
  Globe,
  GraduationCap,
  Linkedin,
  Mail,
  Pencil,
  Plus,
  Trash2,
  User,
} from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const roleLabel = {
  student: 'Student',
  mentor: 'Institute Mentor',
  recruiter: 'Industry Recruiter',
}

// ---------------------------------------------------------------------------
// 1. General & Academic Information Card
// ---------------------------------------------------------------------------
function GeneralInfoCard({ user, onSave }) {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    name: user.name || '',
    age: user.age || '',
    degree: user.degree || '',
    college: user.college || '',
    gradYear: user.gradYear || '',
    bio: user.bio || '',
    github: user.github || '',
    linkedin: user.linkedin || '',
  })

  const startEdit = () => {
    setForm({
      name: user.name || '',
      age: user.age || '',
      degree: user.degree || '',
      college: user.college || '',
      gradYear: user.gradYear || '',
      bio: user.bio || '',
      github: user.github || '',
      linkedin: user.linkedin || '',
    })
    setEditing(true)
  }

  const save = async (e) => {
    e.preventDefault()
    await onSave(form)
    setEditing(false)
  }

  return (
    <section className="bg-white border border-[#e8e8e3] rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition hover:shadow-sm">
      <div className="flex justify-between items-center pb-4 mb-4 border-b border-[#f0f0eb]">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#b07d62]">Profile Details</p>
          <h2 className="text-lg font-bold text-[#1c1d1f]">Academic & Contact Info</h2>
        </div>
        {!editing && (
          <button
            type="button"
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-black border border-[#e0e0db] rounded-lg px-3 py-1.5 transition"
            onClick={startEdit}
          >
            <Pencil size={12} /> Edit Profile
          </button>
        )}
      </div>

      {editing ? (
        <form className="space-y-4 text-xs" onSubmit={save}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-gray-700 block mb-1">Full Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-[#dcdcd7] rounded-lg p-2 focus:outline-none"
                placeholder="Saksham Singh"
                required
              />
            </div>
            <div>
              <label className="font-semibold text-gray-700 block mb-1">Age</label>
              <input
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                className="w-full border border-[#dcdcd7] rounded-lg p-2 focus:outline-none"
                placeholder="20"
              />
            </div>
            <div>
              <label className="font-semibold text-gray-700 block mb-1">Degree & Major</label>
              <input
                value={form.degree}
                onChange={(e) => setForm({ ...form, degree: e.target.value })}
                className="w-full border border-[#dcdcd7] rounded-lg p-2 focus:outline-none"
                placeholder="B.Tech Computer Science"
              />
            </div>
            <div>
              <label className="font-semibold text-gray-700 block mb-1">College / Institute</label>
              <input
                value={form.college}
                onChange={(e) => setForm({ ...form, college: e.target.value })}
                className="w-full border border-[#dcdcd7] rounded-lg p-2 focus:outline-none"
                placeholder="NMIT"
              />
            </div>
            <div>
              <label className="font-semibold text-gray-700 block mb-1">Expected Graduation Year</label>
              <input
                value={form.gradYear}
                onChange={(e) => setForm({ ...form, gradYear: e.target.value })}
                className="w-full border border-[#dcdcd7] rounded-lg p-2 focus:outline-none"
                placeholder="2028"
              />
            </div>
            <div>
              <label className="font-semibold text-gray-700 block mb-1">GitHub Profile Link</label>
              <input
                value={form.github}
                onChange={(e) => setForm({ ...form, github: e.target.value })}
                className="w-full border border-[#dcdcd7] rounded-lg p-2 focus:outline-none"
                placeholder="https://github.com/..."
              />
            </div>
            <div className="sm:col-span-2">
              <label className="font-semibold text-gray-700 block mb-1">LinkedIn Profile Link</label>
              <input
                value={form.linkedin}
                onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                className="w-full border border-[#dcdcd7] rounded-lg p-2 focus:outline-none"
                placeholder="https://linkedin.com/in/..."
              />
            </div>
            <div className="sm:col-span-2">
              <label className="font-semibold text-gray-700 block mb-1">Short Bio</label>
              <textarea
                rows={2}
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                className="w-full border border-[#dcdcd7] rounded-lg p-2 focus:outline-none resize-none"
                placeholder="Tell mentors and recruiters about your primary domains and objectives..."
              />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button className="bg-[#485b67] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#3b4c57] transition" type="submit">
              Save Changes
            </button>
            <button
              className="border border-[#dcdcd7] bg-white text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
              type="button"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-3 text-xs">
          {user.bio && (
            <p className="text-gray-600 italic bg-[#fafaf8] p-3 rounded-xl border border-[#ecece8] mb-4">
              "{user.bio}"
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
            <div className="flex justify-between py-1.5 border-b border-[#f6f6f3]">
              <span className="text-gray-400">Full Name</span>
              <span className="font-semibold text-gray-800">{user.name || 'Not added'}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#f6f6f3]">
              <span className="text-gray-400">Age</span>
              <span className={user.age ? 'font-semibold text-gray-800' : 'text-gray-400'}>{user.age || 'Not added'}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#f6f6f3]">
              <span className="text-gray-400">Degree & Major</span>
              <span className={user.degree ? 'font-semibold text-gray-800' : 'text-gray-400'}>{user.degree || 'Not added'}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#f6f6f3]">
              <span className="text-gray-400">College</span>
              <span className={user.college ? 'font-semibold text-gray-800' : 'text-gray-400'}>{user.college || 'Not added'}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#f6f6f3]">
              <span className="text-gray-400">Graduation Year</span>
              <span className={user.gradYear ? 'font-semibold text-gray-800' : 'text-gray-400'}>{user.gradYear || 'Not added'}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#f6f6f3]">
              <span className="text-gray-400">Platform ID / Role</span>
              <span className="font-semibold text-[#b07d62] uppercase">{roleLabel[user.role] || user.role}</span>
            </div>
          </div>

          {(user.github || user.linkedin) && (
            <div className="pt-3 flex gap-4">
              {user.github && (
                <a
                  href={user.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-gray-600 hover:text-black hover:underline"
                >
                  <Github size={13} /> GitHub Profile
                </a>
              )}
              {user.linkedin && (
                <a
                  href={user.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-gray-600 hover:text-[#0a66c2] hover:underline"
                >
                  <Linkedin size={13} /> LinkedIn Profile
                </a>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  )
}

// ---------------------------------------------------------------------------
// 2. Target Interests & Core Skills Card
// ---------------------------------------------------------------------------
function InterestsCard({ user, onSave }) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState((user.interests || []).join(', '))

  const startEdit = () => {
    setValue((user.interests || []).join(', '))
    setEditing(true)
  }

  const save = async (e) => {
    e.preventDefault()
    await onSave({
      interests: value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    })
    setEditing(false)
  }

  const interests = user.interests || []

  return (
    <section className="bg-white border border-[#e8e8e3] rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition hover:shadow-sm">
      <div className="flex justify-between items-center pb-4 mb-4 border-b border-[#f0f0eb]">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#b07d62]">Focus Areas</p>
          <h2 className="text-lg font-bold text-[#1c1d1f]">Interests & Specializations</h2>
        </div>
        {!editing && (
          <button
            type="button"
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-black border border-[#e0e0db] rounded-lg px-3 py-1.5 transition"
            onClick={startEdit}
          >
            <Pencil size={12} /> Edit
          </button>
        )}
      </div>

      {editing ? (
        <form className="space-y-3 text-xs" onSubmit={save}>
          <label className="block text-gray-600">
            Target Focus Domains (separated by commas)
            <input
              className="w-full mt-1 border border-[#dcdcd7] rounded-lg p-2 focus:outline-none"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Cloud Engineering, Distributed Systems, Web Performance"
            />
          </label>
          <div className="flex gap-2">
            <button className="bg-[#485b67] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#3b4c57] transition" type="submit">
              Save Changes
            </button>
            <button
              className="border border-[#dcdcd7] bg-white text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
              type="button"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : interests.length ? (
        <div className="flex flex-wrap gap-2">
          {interests.map((item) => (
            <span
              key={item}
              className="bg-[#f5f5f3] text-gray-700 text-xs px-2.5 py-1 rounded-md border border-[#e8e8e3] font-medium"
            >
              {item}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-xs text-gray-400 italic">No interests specified yet. Add domains to get better mentor alignment.</p>
      )}
    </section>
  )
}

// ---------------------------------------------------------------------------
// 3. Interactive Portfolio & Projects Tab
// ---------------------------------------------------------------------------
function PortfolioTab({ user, onSave }) {
  const [adding, setAdding] = useState(false)
  const [projectList, setProjectList] = useState(user.projects || [])
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    techStack: '',
    liveUrl: '',
    repoUrl: '',
  })

  const handleAddProject = async (e) => {
    e.preventDefault()
    const payload = [
      ...projectList,
      {
        ...newProject,
        techStack: newProject.techStack.split(',').map((s) => s.trim()).filter(Boolean),
        id: Date.now().toString(),
      },
    ]
    setProjectList(payload)
    await onSave({ projects: payload })
    setNewProject({ title: '', description: '', techStack: '', liveUrl: '', repoUrl: '' })
    setAdding(false)
  }

  const handleDelete = async (id) => {
    const payload = projectList.filter((p) => p.id !== id)
    setProjectList(payload)
    await onSave({ projects: payload })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-[#1c1d1f]">Project Artifacts</h2>
          <p className="text-xs text-gray-500">Showcase your production deployments and engineering work to recruiters.</p>
        </div>
        {!adding && (
          <button
            onClick={() => setAdding(true)}
            className="flex items-center gap-1.5 bg-[#485b67] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[#3b4c57] transition"
          >
            <Plus size={14} /> Add Project
          </button>
        )}
      </div>

      {adding && (
        <form onSubmit={handleAddProject} className="bg-white border border-[#e8e8e3] rounded-2xl p-6 text-xs space-y-4">
          <h3 className="font-bold text-sm text-[#1c1d1f]">New Showcase Project</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold block mb-1 text-gray-700">Project Title</label>
              <input
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                placeholder="e.g. Near-Earth Object Tracker"
                className="w-full border border-[#dcdcd7] rounded-lg p-2 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="font-semibold block mb-1 text-gray-700">Technologies (comma-separated)</label>
              <input
                value={newProject.techStack}
                onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value })}
                placeholder="React, REST API, Python"
                className="w-full border border-[#dcdcd7] rounded-lg p-2 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="font-semibold block mb-1 text-gray-700">Repository Link</label>
              <input
                value={newProject.repoUrl}
                onChange={(e) => setNewProject({ ...newProject, repoUrl: e.target.value })}
                placeholder="https://github.com/..."
                className="w-full border border-[#dcdcd7] rounded-lg p-2 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-semibold block mb-1 text-gray-700">Live Demo Link</label>
              <input
                value={newProject.liveUrl}
                onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                placeholder="https://..."
                className="w-full border border-[#dcdcd7] rounded-lg p-2 focus:outline-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="font-semibold block mb-1 text-gray-700">Overview / Problem Solved</label>
              <textarea
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                rows={3}
                placeholder="Architecture description, key APIs used, or impact..."
                className="w-full border border-[#dcdcd7] rounded-lg p-2 focus:outline-none resize-none"
                required
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button type="submit" className="bg-[#485b67] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#3b4c57] transition">
              Publish Project
            </button>
            <button
              type="button"
              onClick={() => setAdding(false)}
              className="border border-[#dcdcd7] bg-white text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {projectList.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projectList.map((project) => (
            <div
              key={project.id || project.title}
              className="bg-white border border-[#e8e8e3] rounded-2xl p-5 flex flex-col justify-between shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-sm text-[#1c1d1f] flex items-center gap-1.5">
                    <FolderGit2 size={16} className="text-[#b07d62]" /> {project.title}
                  </h3>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="text-gray-400 hover:text-red-600 transition"
                    title="Delete project"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mb-3 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack?.map((tag, idx) => (
                    <span key={idx} className="bg-[#f5f5f3] text-gray-600 text-[10px] px-2 py-0.5 rounded border border-[#e8e8e3]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-[#f6f6f3] text-xs font-semibold">
                {project.repoUrl && (
                  <a href={project.repoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-gray-600 hover:text-black">
                    <Github size={12} /> Source
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[#2b5b4e] hover:underline">
                    <ExternalLink size={12} /> Live Link
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-[#e8e8e3] rounded-2xl p-12 text-center">
          <FolderGit2 className="mx-auto text-gray-300 mb-3" size={32} />
          <h3 className="text-base font-bold text-gray-800 mb-1">No projects pinned yet</h3>
          <p className="text-xs text-gray-500 mb-4 max-w-sm mx-auto">
            Adding verified projects allows mentors to critique code and lets recruiters assess your capabilities.
          </p>
          <button
            onClick={() => setAdding(true)}
            className="bg-[#485b67] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[#3b4c57] transition"
          >
            + Add First Project
          </button>
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// 4. Main Profile Page View
// ---------------------------------------------------------------------------
export default function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('information')

  if (!user) return null

  const initials = user.name ? user.name.charAt(0).toUpperCase() : '?'

  return (
    <div className="min-h-screen bg-[#fbfbf9] text-[#1c1d1f] font-sans pb-16">
      <main className="max-w-4xl mx-auto px-6 pt-8">
        {/* Back Link */}
        <button
          type="button"
          className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-black mb-6 transition"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={14} /> Back to Dashboard
        </button>

        {/* Hero Banner Card */}
        <section className="bg-white border border-[#e8e8e3] rounded-2xl p-8 mb-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <span className="w-16 h-16 rounded-2xl bg-[#eef1ef] text-[#2b4c3f] font-extrabold text-2xl flex items-center justify-center shrink-0 border border-[#dce3df]">
            {initials}
          </span>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#b07d62] bg-[#fbf0ec] px-2 py-0.5 rounded">
                {roleLabel[user.role] || user.role}
              </span>
              {user.gradYear && (
                <span className="text-xs text-gray-400 font-medium">Class of {user.gradYear}</span>
              )}
            </div>
            <h1 className="text-3xl font-extrabold text-[#1c1d1f] tracking-tight mb-1">{user.name}</h1>
            <p className="text-xs text-gray-500 flex items-center gap-2 flex-wrap">
              <span className="flex items-center gap-1">
                <GraduationCap size={14} /> {user.degree || 'Degree not specified'}
              </span>
              <span>·</span>
              <span>{user.college || 'College not specified'}</span>
              {user.email && (
                <>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-gray-400">
                    <Mail size={12} /> {user.email}
                  </span>
                </>
              )}
            </p>
          </div>
        </section>

        {/* Navigation Tabs */}
        <div className="flex gap-8 border-b border-[#e8e8e3] mb-6 text-sm font-semibold">
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'information'}
            className={`pb-3 transition ${
              tab === 'information'
                ? 'border-b-2 border-[#b07d62] text-[#1c1d1f]'
                : 'text-gray-400 hover:text-gray-700'
            }`}
            onClick={() => setTab('information')}
          >
            General Information
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'portfolio'}
            className={`pb-3 transition ${
              tab === 'portfolio'
                ? 'border-b-2 border-[#b07d62] text-[#1c1d1f]'
                : 'text-gray-400 hover:text-gray-700'
            }`}
            onClick={() => setTab('portfolio')}
          >
            Portfolio & Projects {user.projects?.length ? `(${user.projects.length})` : ''}
          </button>
        </div>

        {/* Dynamic Tab Body */}
        <div>
          {tab === 'information' ? (
            <div className="space-y-6">
              <InterestsCard user={user} onSave={updateProfile} />
              <GeneralInfoCard user={user} onSave={updateProfile} />
            </div>
          ) : (
            <PortfolioTab user={user} onSave={updateProfile} />
          )}
        </div>
      </main>
    </div>
  )
}