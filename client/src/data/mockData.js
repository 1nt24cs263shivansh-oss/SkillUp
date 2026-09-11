export const MOCK_JOBS = [
  {
    _id: 'job-1',
    title: 'Junior Data Scientist / ML Intern',
    company: 'NeuralCraft Systems',
    type: 'internship',
    location: 'Bangalore, India (Hybrid)',
    duration: '6 Months',
    experienceLevel: 'beginner',
    skills: ['Python', 'SQL', 'Scikit-learn', 'EDA', 'Random Forest'],
    description:
      'Looking for an energetic intern to assist in building predictive machine learning models, running exploratory data analysis (EDA), and deploying data pipelines.',
    materials: [
      { id: 'm1', title: 'EDA & Feature Engineering Master Guide', type: 'PDF', duration: '45 mins' },
      { id: 'm2', title: 'Random Forest & Hyperparameter Tuning', type: 'Video', duration: '20 mins' },
    ],
    assessment: [
      {
        id: 1,
        question: 'Which metric is most resilient to outliers when measuring central tendency in EDA?',
        options: ['Mean', 'Median', 'Standard Deviation', 'Variance'],
        answer: 1,
      },
      {
        id: 2,
        question: 'In a Random Forest classifier, what is the purpose of bagging (bootstrap aggregating)?',
        options: [
          'To increase model bias',
          'To reduce variance and avoid overfitting',
          'To speed up linear regression',
          'To eliminate decision trees',
        ],
        answer: 1,
      },
    ],
    roadmap: [
      { week: 'Week 1', title: 'Data Cleaning & Distribution Analysis', topics: ['Missing values', 'IQR outlier detection', 'Seaborn pairplots'] },
      { week: 'Week 2', title: 'Tree Ensemble Architectures', topics: ['Bagging vs Boosting', 'RandomForestClassifier tuning in Scikit-Learn'] },
      { week: 'Week 3', title: 'Model Evaluation & Pipeline Delivery', topics: ['Confusion matrix', 'F1-score', 'Pickle model serialization'] },
    ],
  },
  {
    _id: 'job-2',
    title: 'Frontend React Developer',
    company: 'ApexStack Technologies',
    type: 'full-time',
    location: 'Remote',
    duration: '',
    experienceLevel: 'intermediate',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    description:
      'Build responsive, production-ready web applications using modern React, state management libraries, and component-driven UI architecture.',
    materials: [
      { id: 'm3', title: 'React 19 Server & Client Component Patterns', type: 'Documentation', duration: '30 mins' },
    ],
    assessment: [
      {
        id: 1,
        question: 'What is the primary benefit of TanStack Query (React Query)?',
        options: [
          'Server-side database encryption',
          'Declarative client caching and background refetching',
          'Direct CSS compilation',
          'Replacing React Router entirely',
        ],
        answer: 1,
      },
    ],
    roadmap: [
      { week: 'Week 1', title: 'Advanced Hook Patterns', topics: ['useMemo', 'useCallback', 'Custom hooks'] },
      { week: 'Week 2', title: 'State Architecture', topics: ['TanStack Query', 'Context API optimization'] },
    ],
  },
]

export const MOCK_SKILL_PROGRAMS = [
  {
    _id: 'prog-1',
    title: 'Full Stack MERN & System Design Certification',
    provider: 'SkillUp Academy & Meta Partner',
    type: 'Certification',
    level: 'intermediate',
    format: 'Self-paced + Mentor evaluation',
    duration: '8 Weeks',
    pricing: 'Free for verified students',
    description: 'Industry-recognized certificate badge awarded upon passing milestone tests.',
    skills: ['React', 'Node.js', 'MongoDB', 'System Architecture', 'REST APIs'],
    // Clean Web Development / Code screen image
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
  },
  {
    _id: 'prog-2',
    title: 'Live Lab: Microservices & Cloud-Native Deployment',
    provider: 'Cloud Native Guild',
    type: 'Workshop',
    level: 'intermediate',
    format: 'Live interactive weekend intensive',
    duration: '2 Days (Sat - Sun)',
    pricing: 'Limited Seats (Free)',
    description: 'Includes live code review with senior mentors.',
    skills: ['Docker', 'Kubernetes', 'Express', 'Cloud Deployment'],
    // Cloud Infrastructure / Server racks / DevOps architecture
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80',
  },
  {
    _id: 'prog-3',
    title: 'Applied Machine Learning & Predictive Analytics Cohort',
    provider: 'NeuralCraft Labs',
    type: 'Training',
    level: 'beginner',
    format: 'Guided cohort with weekly mentor reviews',
    duration: '6 Weeks',
    pricing: 'Recruiter-sponsored',
    description: 'Top 10% referred directly to partner recruiters.',
    skills: ['Python', 'EDA', 'Scikit-learn', 'PyTorch', 'Data Visualization'],
    // Neural Networks / AI / Data Analytics
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
  },
  {
    _id: 'prog-4',
    title: '1:1 Career Sprint & Mock Technical Interviews',
    provider: 'SkillUp Mentor Circle',
    type: 'Mentorship',
    level: 'intermediate',
    format: 'Weekly 1:1 sessions + Portfolio review',
    duration: '4 Weeks',
    pricing: 'Complimentary',
    description: 'Direct mentor assignment based on preferred company tracks.',
    skills: ['System Design', 'Behavioral Rounds', 'LeetCode Strategy', 'Resume Review'],
    // Professional 1:1 Discussion / Mentoring session
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80',
  },
]