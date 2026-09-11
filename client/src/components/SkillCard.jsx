import { ArrowUpRight, Clock3, Laptop } from 'lucide-react'

// Distinct fallback map keyed to course focus and domains
const DOMAIN_IMAGES = {
  web: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80', // Full Stack / MERN
  cloud: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80', // Microservices / Cloud / DevOps
  ai: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80', // Machine Learning / Data
  mentor: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80', // Mentorship / Interviews
  default: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
}

function resolveCardImage(program) {
  if (program.image) return program.image

  const title = (program.title || '').toLowerCase()
  const type = (program.type || '').toLowerCase()

  if (title.includes('mern') || title.includes('react') || title.includes('frontend')) {
    return DOMAIN_IMAGES.web
  }
  if (title.includes('microservice') || title.includes('cloud') || title.includes('docker')) {
    return DOMAIN_IMAGES.cloud
  }
  if (title.includes('machine learning') || title.includes('analytics') || title.includes('python')) {
    return DOMAIN_IMAGES.ai
  }
  if (title.includes('interview') || title.includes('sprint') || type.includes('mentorship')) {
    return DOMAIN_IMAGES.mentor
  }

  return DOMAIN_IMAGES.default
}

export default function SkillCard({ program }) {
  const cardImage = resolveCardImage(program)

  return (
    <article className="bg-white border border-[#e0e5e9] rounded-2xl overflow-hidden shadow-xs hover:border-[#ccd6df] hover:shadow-md transition duration-200 flex flex-col md:flex-row">
      {/* Visual Thumbnail Banner */}
      <div className="md:w-64 h-48 md:h-auto shrink-0 relative overflow-hidden bg-[#edf1f3]">
        <img
          src={cardImage}
          alt={program.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex gap-1.5 md:hidden">
          <span className="bg-white/90 backdrop-blur-xs text-[#a34e3f] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
            {program.type}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Topline Metadata */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="bg-[#fff7f5] text-[#a34e3f] border border-[#f5ded9] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded hidden md:inline-block">
                {program.type}
              </span>
              <span className="text-xs text-gray-400 font-medium capitalize">
                {program.level}
              </span>
            </div>
            {program.pricing && (
              <span className="text-xs font-semibold text-gray-500">
                {program.pricing}
              </span>
            )}
          </div>

          {/* Heading and Provider */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-base md:text-lg font-bold text-[#1c1d1f] hover:text-[#2b4c3f] transition cursor-pointer">
                {program.title}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5 font-medium">{program.provider}</p>
            </div>
            <a
              href="#enroll"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#1c1d1f] hover:text-[#2b4c3f] shrink-0"
            >
              Enroll now <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Logistics Strip */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 my-3">
            {program.format && (
              <span className="flex items-center gap-1.5">
                <Laptop size={14} className="text-gray-400" />
                {program.format}
              </span>
            )}
            {program.duration && (
              <span className="flex items-center gap-1.5">
                <Clock3 size={14} className="text-gray-400" />
                {program.duration}
              </span>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {program.skills?.map((skill) => (
              <span
                key={skill}
                className="bg-[#f5f7f6] border border-[#dce3df] text-[#476276] text-[11px] font-semibold px-2.5 py-0.5 rounded-md"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        {program.description && (
          <p className="text-xs text-gray-500 mt-4 pt-3 border-t border-[#f0f3f2]">
            {program.description}
          </p>
        )}
      </div>
    </article>
  )
}