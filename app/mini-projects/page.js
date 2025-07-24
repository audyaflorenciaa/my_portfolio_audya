// app/mini-projects/page.js
"use client"; // This page needs client-side interactivity

// Let's assume you have a component like this in components/MiniProjectsSection.js
// If you put the code directly into app/mini-projects/page.js, you don't need this import.
// For clarity, let's make sure app/mini-projects/page.js directly renders the content.

import Link from 'next/link';
import { miniProjects } from '../../lib/miniProjects'; // Corrected path: Go up two levels to reach 'lib'

export default function MiniProjectsPage() {
  // Define an array of distinct background colors (hex codes for inline styles)
  const cardBackgrounds = [
    '#3B82F6', // Blue
    '#DC2626', // Red
    '#F59E0B'  // Yellow/Orange
  ];

  // Define an array of distinct text colors for numbers and titles
  const cardTextColors = [
    '#DBEAFE', // Light blue
    '#FEE2E2', // Light red
    '#FEF3C7'  // Light yellow
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
      {/* Back to Home Button */}
      <Link href="/" className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors duration-200 flex items-center z-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </Link>

      <h1 className="text-5xl font-extrabold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-2 shadow-lg">
        My Mini Projects
      </h1>

      <div className="project-grid w-full max-w-6xl">
        {miniProjects.map((miniProject, index) => (
          <Link href={`/mini-projects/${miniProject.id}`} key={miniProject.id} className="project-card-link">
            <div
              className="project-card"
              style={{
                backgroundColor: cardBackgrounds[index % cardBackgrounds.length],
              }}
            >
              <span style={{ color: cardTextColors[index % cardTextColors.length] }} className="project-number">{miniProject.number}</span>
              <h3 style={{ color: cardTextColors[index % cardTextColors.length] }} className="project-title">{miniProject.title}</h3>
              <p className="project-short-description" style={{ color: '#F3F4F6' }}>{miniProject.shortDescription}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Scoped CSS for this page */}
      <style jsx>{`
        .project-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .project-card-link {
          text-decoration: none;
          color: inherit;
        }

        .project-card {
          background-color: #333; /* Fallback */
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          height: 100%; /* Ensure cards have consistent height */
          text-align: left;
        }

        .project-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
        }

        .project-number {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
          opacity: 0.7;
        }

        .project-title {
          font-size: 1.8rem;
          font-weight: bold;
          margin-bottom: 0.75rem;
          line-height: 1.2;
        }

        .project-short-description {
          font-size: 1rem;
          line-height: 1.5;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .project-grid {
            grid-template-columns: 1fr;
          }
          .project-card {
            padding: 1.5rem;
          }
          .project-number {
            font-size: 2rem;
          }
          .project-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
