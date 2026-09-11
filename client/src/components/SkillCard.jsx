import React from 'react';

export default function SkillCard({ program }) {
  return (
    <div className="bg-white border border-[#e8e8e3] rounded-2xl p-6 transition hover:shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#f4f5f4] text-[#4a5568] font-bold text-sm flex items-center justify-center shrink-0">
            {program.initial}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#9d5c48] bg-[#fbf0ec] px-1.5 py-0.5 rounded">
                {program.type}
              </span>
              <span className="text-xs text-gray-400 font-medium">{program.level}</span>
            </div>

            <h3 className="text-base font-bold text-[#1c1d1f]">{program.title}</h3>
            <p className="text-xs text-gray-500 mb-2">{program.provider}</p>

            <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
              <span>💻 {program.format}</span>
              <span>⏱ {program.duration}</span>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {program.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-[#f5f5f3] text-gray-600 text-xs px-2 py-0.5 rounded border border-[#e8e8e3]"
                >
                  {skill}
                </span>
              ))}
            </div>

            <p className="text-xs text-[#2b5b4e] font-medium">{program.statusNote}</p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-6">
          <span className="text-xs font-semibold text-gray-600">{program.cost}</span>
          <button className="text-xs font-semibold text-gray-700 hover:text-black flex items-center gap-1 border-b border-transparent hover:border-gray-600">
            Enroll now ↗
          </button>
        </div>
      </div>
    </div>
  );
}