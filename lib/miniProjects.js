// lib/miniProjects.js

export const miniProjects = [
  {
    id: 'sentiment-analyzer',
    number: '01.',
    title: 'Text Sentiment Analyzer',
    shortDescription: 'Detects positive, negative, or neutral sentiment in text.',
  },
  {
    id: 'cats-dogs-classifier',
    number: '02.',
    title: 'Cats vs. Dogs Classifier',
    shortDescription: 'Team Cat or Team Dog? This AI uses computer vision to classify furry friends.',
  },
  {
    id: 'tic-tac-toe',
    number: '03.',
    title: 'Tic-Tac-Toe AI Player',
    shortDescription: 'Play Tic-Tac-Toe against an intelligent AI opponent.',
  },
];

// You can add functions similar to your main projects if needed later for detail pages
export function getMiniProjectById(id) {
  return miniProjects.find(project => project.id === id);
}

export function getAllMiniProjectIds() {
  return miniProjects.map(project => ({
    params: { slug: project.id },
  }));
}
