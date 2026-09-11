import { ArrowUpRight, Clock3, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function JobCard({ job }) {
  return (
    <article className="job-card">
      <div className="company-initial">{job.company.charAt(0)}</div>
      <div className="job-card-body">
        <div className="job-card-topline"><span className="eyebrow">{job.type === 'internship' ? 'Internship' : 'Full-time'}</span><span className="experience-label">{job.experienceLevel}</span>{job.matchScore > 0 && <span className="match-score">{job.matchScore}% match</span>}</div>
        <h3>{job.title}</h3>
        <p className="company-name">{job.company}</p>
        <div className="job-meta"><span><MapPin size={14} />{job.location}</span>{job.duration && <span><Clock3 size={14} />{job.duration}</span>}</div>
        <div className="skill-list">{job.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
        {job.matchedSkills?.length > 0 && <p className="matched-skills">Matches your {job.matchedSkills.slice(0, 3).join(', ')}</p>}
      </div>
      <Link className="text-action" to={`/jobs/${job._id}`}>View opportunity <ArrowUpRight size={16} /></Link>
    </article>
  )
}
