import { ArrowLeft, BriefcaseBusiness, CheckCircle2, Clock3, MapPin } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import PlaceholderPanel from '../components/PlaceholderPanel'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

const tabs = [['description', 'Job description'], ['assessment', 'Assessment'], ['materials', 'Materials'], ['roadmap', 'Roadmap']]

export default function JobDetailsPage() {
  const { user } = useAuth(); const { id } = useParams(); const [job, setJob] = useState(null); const [tab, setTab] = useState('description'); const [error, setError] = useState(''); const studentSkills = user?.skills?.join(',') || '';
  useEffect(() => { api.get(`/jobs/${id}`, { params: { studentSkills } }).then(({ data }) => setJob(data.job)).catch((err) => setError(err.response?.data?.message || 'Opportunity not found.')) }, [id, studentSkills])
  if (error) return <div className="page-frame"><Link className="back-link" to="/dashboard"><ArrowLeft size={16} /> Back to opportunities</Link><div className="empty-state details-error"><h2>{error}</h2><Link className="primary-button" to="/dashboard">Return to opportunities</Link></div></div>
  if (!job) return <div className="screen-state">Loading opportunity...</div>
  return <div className="page-frame details-page"><Link className="back-link" to="/dashboard"><ArrowLeft size={16} /> Back to opportunities</Link><section className="details-hero"><div className="company-initial large">{job.company.charAt(0)}</div><div><p className="kicker">{job.type === 'internship' ? 'Internship opportunity' : 'Full-time opportunity'}</p><h1>{job.title}</h1><p className="details-company">{job.company}</p><div className="job-meta detail-meta"><span><MapPin size={15} />{job.location}</span>{job.duration && <span><Clock3 size={15} />{job.duration}</span>}<span><BriefcaseBusiness size={15} />{job.experienceLevel} level</span></div>{job.matchScore > 0 && <div className="details-match"><CheckCircle2 size={16} /><span><strong>{job.matchScore}% skill match</strong><small>Matches your {job.matchedSkills.join(', ')}</small></span></div>}</div></section><div className="detail-tabs" role="tablist">{tabs.map(([value, label]) => <button key={value} type="button" role="tab" aria-selected={tab === value} className={tab === value ? 'detail-tab active' : 'detail-tab'} onClick={() => setTab(value)}>{label}</button>)}</div>{tab === 'description' ? <section className="description-panel"><div><p className="kicker">About the role</p><h2>Make an impact at {job.company}</h2><p>{job.description}</p></div><div className="detail-side"><p className="kicker">Required skills</p><div className="skill-list">{job.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>{job.matchedSkills?.length > 0 && <><p className="kicker matched-heading">Your matching skills</p><div className="skill-list">{job.matchedSkills.map((skill) => <span className="matched-chip" key={skill}>{skill}</span>)}</div></>}<button className="primary-button apply-button" type="button">Save opportunity</button></div></section> : <PlaceholderPanel tab={tab} />}</div>
}
