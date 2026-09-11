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