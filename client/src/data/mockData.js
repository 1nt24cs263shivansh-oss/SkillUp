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
    type: 'certification',
    level: 'intermediate',
    format: 'Self-paced + Mentor evaluation',
    duration: '8 Weeks',
    cost: 'Free for verified students',
    skills: ['React', 'Node.js', 'MongoDB', 'System Architecture', 'REST APIs'],
    description:
      'Comprehensive hands-on training path covering client-side performance, scalable Express APIs, indexing in MongoDB, and core architectural patterns.',
    statusNote: 'Industry-recognized certificate badge awarded upon passing milestone tests.',
    materials: [
      { id: 'sm1', title: 'High-Level Architecture & Caching Strategies', type: 'PDF', duration: '35 mins' },
      { id: 'sm2', title: 'MongoDB Indexing & Aggregation Deep Dive', type: 'Video', duration: '45 mins' },
    ],
    assessment: [
      {
        id: 1,
        question: 'What is the advantage of using a compound index in MongoDB?',
        options: [
          'It encrypts sensitive fields by default',
          'It supports queries matching multiple fields in a specified sort order',
          'It replaces the primary _id key',
          'It prevents database replication delay',
        ],
        answer: 1,
      },
      {
        id: 2,
        question: 'Which HTTP method is idempotent by definition in RESTful API design?',
        options: ['POST', 'PUT', 'PATCH (non-idempotent implementations)', 'CONNECT'],
        answer: 1,
      },
    ],
    roadmap: [
      { week: 'Week 1-2', title: 'Advanced Frontend State & Clean Architecture', topics: ['Context boundaries', 'Custom hooks', 'Tailwind modularity'] },
      { week: 'Week 3-5', title: 'Scalable Express.js & MongoDB Schemas', topics: ['Mongoose aggregate pipelines', 'JWT authentication', 'Role-based access'] },
      { week: 'Week 6-8', title: 'System Design & End-to-End Deployment', topics: ['Dockerization', 'Load balancing basics', 'CI/CD pipeline rollout'] },
    ],
  },
  {
    _id: 'prog-2',
    title: 'Live Lab: Microservices & Cloud-Native Deployment',
    provider: 'Cloud Native Guild',
    type: 'workshop',
    level: 'intermediate',
    format: 'Live interactive weekend intensive',
    duration: '2 Days (Sat - Sun)',
    cost: 'Limited Seats (Free)',
    skills: ['Docker', 'Kubernetes', 'Express', 'Cloud Deployment'],
    description:
      'Break a monolithic web app into loosely coupled microservices, containerize each service, and orchestrate local deployments with Kubernetes.',
    statusNote: 'Includes live code review with senior mentors.',
    materials: [
      { id: 'sm3', title: 'Dockerfile Optimization & Multi-Stage Builds', type: 'Documentation', duration: '20 mins' },
    ],
    assessment: [
      {
        id: 1,
        question: 'In Docker, why are multi-stage builds recommended for production images?',
        options: [
          'They bypass network security groups',
          'They significantly reduce final image size by discarding build-time dependencies',
          'They make Dockerfiles run in parallel automatically',
          'They allow containers to run without a host kernel',
        ],
        answer: 1,
      },
    ],
    roadmap: [
      { week: 'Day 1', title: 'Service Decomposition & Containerization', topics: ['API Gateway patterns', 'Multi-stage Docker builds', 'Service networking'] },
      { week: 'Day 2', title: 'Kubernetes Orchestration & Service Discovery', topics: ['Pods & Deployments', 'ConfigMaps & Secrets', 'Ingress controllers'] },
    ],
  },
  {
    _id: 'prog-3',
    title: 'Applied Machine Learning & Predictive Analytics Cohort',
    provider: 'NeuralCraft Labs',
    type: 'training',
    level: 'beginner',
    format: 'Guided cohort with weekly mentor reviews',
    duration: '6 Weeks',
    cost: 'Recruiter-sponsored',
    skills: ['Python', 'EDA', 'Scikit-learn', 'PyTorch', 'Data Visualization'],
    description:
      'Structured training designed to get students from data preprocessing to production-grade supervised learning models ready for intern roles.',
    statusNote: 'Top 10% referred directly to partner recruiters.',
    materials: [
      { id: 'sm4', title: 'End-to-End Scikit-Learn Pipeline Templates', type: 'Notebook', duration: '40 mins' },
    ],
    assessment: [
      {
        id: 1,
        question: 'Why should feature scaling be fitted only on the training set and not the entire dataset?',
        options: [
          'To prevent data leakage from the test set',
          'Because the test set does not support matrix operations',
          'To reduce RAM usage by 50%',
          'Scaling only applies to classification labels',
        ],
        answer: 0,
      },
    ],
    roadmap: [
      { week: 'Week 1-2', title: 'Exploratory Data Analysis & Preprocessing', topics: ['Missing data imputations', 'IQR detection', 'Categorical encoding'] },
      { week: 'Week 3-4', title: 'Supervised Models & Hyperparameter Tuning', topics: ['Ensemble methods', 'GridSearchCV', 'Cross-validation'] },
      { week: 'Week 5-6', title: 'Model Evaluation & Capstone Delivery', topics: ['ROC-AUC curves', 'SHAP values for interpretability', 'API serving'] },
    ],
  },
  {
    _id: 'prog-4',
    title: '1:1 Career Sprint & Mock Technical Interviews',
    provider: 'SkillUp Mentor Circle',
    type: 'mentorship',
    level: 'intermediate',
    format: 'Weekly 1:1 sessions + Portfolio review',
    duration: '4 Weeks',
    cost: 'Complimentary',
    skills: ['System Design', 'Behavioral Rounds', 'LeetCode Strategy', 'Resume Review'],
    description:
      'Direct one-on-one mentorship sessions with industry professionals to conduct mock interviews, solve complex architecture problems, and get referred to recruiters.',
    statusNote: 'Direct mentor assignment based on preferred company tracks.',
    materials: [
      { id: 'sm5', title: 'Senior Engineer Interview Rubric', type: 'PDF', duration: '15 mins' },
    ],
    assessment: [],
    roadmap: [
      { week: 'Week 1', title: 'Profile & Resume Deep Dive', topics: ['Resume impact metrics', 'ATS optimization', 'GitHub profile audit'] },
      { week: 'Week 2-3', title: 'Technical Problem Solving & System Design', topics: ['Data structures live coding', 'Scaling web architectures'] },
      { week: 'Week 4', title: 'Recruiter Handover & Behavioral Alignment', topics: ['STAR method answers', 'Direct candidate endorsement'] },
    ],
  },
]