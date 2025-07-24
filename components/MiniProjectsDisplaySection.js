// components/MiniProjectsDisplaySection.js
import Link from 'next/link';
import { miniProjects } from '../lib/miniProjects'; // Import the mini-projects data

function MiniProjectsDisplaySection() {
  // Define an array of distinct background colors (hex codes or named colors for inline styles)
  const cardBackgrounds = [
    '#3B82F6', // A shade of blue (matching Tailwind's blue-500/600)
    '#DC2626', // A shade of red (matching Tailwind's red-500/600)
    '#F59E0B'  // A shade of yellow/orange (matching Tailwind's yellow-500/600)
  ];

  // Define an array of distinct text colors for numbers and titles
  const cardTextColors = [
    '#DBEAFE', // Light blue (matching Tailwind's blue-100/200)
    '#FEE2E2', // Light red (matching Tailwind's red-100/200)
    '#FEF3C7'  // Light yellow (matching Tailwind's yellow-100/200)
  ];

  return (
    <section id="mini-projects" className="projects-display-section">
      <div className="whats-inside-label">AI SECTION</div>
      <div className="project-grid">
        {miniProjects.map((miniProject, index) => (
          <Link href={`/mini-projects/${miniProject.id}`} key={miniProject.id} className="project-card-link">
            <div
              className="project-card"
              style={{
                backgroundColor: cardBackgrounds[index % cardBackgrounds.length],
                // You can add hover effects via JavaScript or a separate CSS class if needed
                // For simplicity with inline styles, hover is not included here.
              }}
            >
              <span style={{ color: cardTextColors[index % cardTextColors.length] }} className="project-number">{miniProject.number}</span>
              <h3 style={{ color: cardTextColors[index % cardTextColors.length] }} className="project-title">{miniProject.title}</h3>
              <p className="project-short-description" style={{ color: '#F3F4F6' }}>{miniProject.shortDescription}</p> {/* Light gray for description */}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default MiniProjectsDisplaySection;
