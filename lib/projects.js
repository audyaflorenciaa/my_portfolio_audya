// lib/projects.js

export const projects = [
  {
    id: 'weatherzen',
    number: '01.',
    title: 'WeatherZen',
    shortDescription: 'Smart, real-time weather insights with AI predictions.',
    fullDescription: 'This project is a web application that provides real-time weather information and future predictions for any city you search. It\'s built to be easy to use and understand, showing you both current conditions and what to expect in the next five hours. This project combines getting data from the internet, using AI to make predictions, and displaying it all on a website.',
    technologies: 'Python, Flask, APIs, Random Forest Regressor, HTML, CSS, JavaScript',
    contributions: [
      'Designed and implemented the Machine Learning model architecture and core backend workflow.',
      'Developed and integrated the AI prediction model (Random Forest Regressor) for 5-hour weather forecasts.',
      'Responsible for end-to-end data pipeline, including real-time data acquisition (from WeatherAPI), preprocessing (handling outliers, duplicates, missing values), and normalization.',
      'Built the Flask backend logic to connect the AI model with the web interface, managing data input and prediction output.',
    ],
    imagePath: '/weatherzen.png', // Keep this for the individual project page!
    displayCardImage: false, // <--- ADD THIS LINE for WeatherZen
    projectLink: '#',
    githubLink: 'https://github.com/audyaflorenciaa/WeatherZen',
  },
  {
    id: 'attendsnap',
    number: '02.',
    title: 'AttendSnap',
    shortDescription: 'Snap, recognize, log presence with real-time face recognition.',
    fullDescription: 'This project is a real-time face recognition system designed for attendance tracking. It uses a webcam to detect faces, recognize individuals, and automatically log their attendance. The system is built with a custom-trained Artificial Intelligence model, making it a smart and automated way to manage presence.',
    technologies: 'Python, OpenCV, Dlib, Pandas, Deep Learning',
    contributions: [
      'Developed and implemented the user registration module, including webcam face capture and automated image acquisition for model training.',
      'Built the real-time face recognition core, enabling continuous scanning and identification of registered individuals.',
      'Designed and coded the automated attendance logging mechanism to an Excel file, ensuring high-confidence recognition and continuous detection before logging.',
      'Integrated the time-based attendance feature to prevent duplicate entries within a defined period.',
    ],
    imagePath: '/attendsnap1.png',
    displayCardImage: false,
    projectLink: '#',
    githubLink: 'https://github.com/audyaflorenciaa/AttendSnap',
  },
  {
    id: 'exploreid',
    number: '03.',
    title: 'ExploreID',
    shortDescription: 'Your Indonesian cultural travel planner with AI-powered itineraries.',
    fullDescription: 'ExploreID is a comprehensive web application designed to help users discover and plan travel experiences across Indonesia, with a special focus on Bali. It provides detailed information on various destinations, allows users to manage their favorite spots, generates personalized itineraries using AI, and facilitates connections with local tour guides. The application emphasizes a smooth user experience through interactive filters, dynamic content loading, and a responsive, animated user interface for seamless travel planning.',
    technologies: 'Next.js, React, AI service (recommendation system), Local Storage, Google Maps API',
    contributions: [
      'Developed the comprehensive web application frontend using Next.js.',
      'Implemented key features.',
      'Developed the itinerary generation feature.',
      'Integrated the AI service for the recommendation system.',
    ],
    imagePath: '/exploreid1.png',
    displayCardImage: false,
    projectLink: '#',
    githubLink: 'https://github.com/audyaflorenciaa/ExploreID',
  },
  {
    id: 'skiporstick',
    number: '04.',
    title: 'SkipOrStick',
    shortDescription: 'Netflix movie review sentiment analysis using NLP and ML.',
    fullDescription: 'SkipOrStick is a web application designed to analyze the sentiment of Netflix show reviews. Users can input a Netflix show title and a review, and the system will classify the review as positive or negative with a confidence score. It also provides an overall recommendation for the show based on all submitted reviews, and can predict the show\'s potential success (Hit or Miss) if enough reviews are collected. This project showcases the use of Natural Language Processing (NLP) and machine learning for text classification within a user-friendly interface.',
    technologies: 'NLP, Machine Learning, Python, Scikit-learn, NLTK, Streamlit, Local Storage',
    contributions: [
      'Designed and implemented the end-to-end NLP and Machine Learning pipeline for sentiment classification of Netflix show reviews.',
      'Developed the core web application functionality.',
      'Contributed to the user interface development.',
    ],
    projectLink: '#',
    githubLink: 'https://github.com/audyaflorenciaa/SkipOrStick',
  },
  {
    id: 'sickle-cell',
    number: '05.',
    title: 'Sickle Cell Gene Mutation Detection',
    shortDescription: 'Bioinformatics project exploring sickle cell gene mutations with ML.',
    fullDescription: 'This project explores the genetic basis of sickle cell anemia by analyzing the Human Beta Globin (HBB) gene sequence. It demonstrates key bioinformatics techniques, including DNA sequence manipulation, sequence alignment, and the application of a machine learning model to predict the presence of the sickle cell mutation (GAG to GTG) and its potential impact at the protein level. This project combines molecular biology concepts with computational analysis to provide insights into genetic disorders.',
    technologies: 'Python, Bioinformatics (Biopython), Needleman-Wunsch, Smith-Waterman, Decision Tree Classifier, Data Visualization',
    contributions: [
      'Developed a comprehensive bioinformatics pipeline.',
      'Implemented core bioinformatics techniques.',
      'Applied and evaluated a Machine Learning model (Decision Tree Classifier).',
    ],
    projectLink: '#',
    githubLink: 'https://github.com/audyaflorenciaa/SickleCellAnemia_HBB',
  },
];

// Function to get a project by its ID (slug)
export function getProjectById(id) {
  return projects.find(project => project.id === id);
}

// Function to get all project IDs for static paths (Next.js requirement)
export function getAllProjectIds() {
  return projects.map(project => ({
    params: { slug: project.id },
  }));
}