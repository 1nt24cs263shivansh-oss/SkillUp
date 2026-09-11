export default function PlaceholderPanel({ tab }) {
  const content = {
    description: ['Job description', 'The full role brief and responsibilities will appear here.'],
    assessment: ['Assessment module coming soon', 'A guided assessment will help you understand your fit for this opportunity.'],
    materials: ['Learning materials will appear here', 'Curated resources will be added for this opportunity.'],
    roadmap: ['Personalized roadmap will appear here', 'Your next learning steps will be shaped around this role.'],
  }[tab]
  return <div className="placeholder-panel"><h3>{content[0]}</h3><p>{content[1]}</p></div>
}
