// app/projects/[slug]/page.js
import Link from 'next/link';
import { getProjectById, getAllProjectIds } from '../../../lib/projects'; // Adjust path if your lib folder is elsewhere

// This function tells Next.js which pages to build at build time
export async function generateStaticParams() {
  const paths = getAllProjectIds(); // Get all project slugs
  return paths;
}

// This function fetches data for the specific project based on the slug
export default function ProjectDetail({ params }) {
  const { slug } = params; // Get the slug from the URL (e.g., 'weatherzen')
  const project = getProjectById(slug); // Find the project data from your lib/projects.js

  // Handle case where project is not found (e.g., direct access to invalid URL)
  if (!project) {
    return (
      <div className="project-detail-container">
        <h1 className="project-not-found">Project not found.</h1>
        <Link href="/#projects" className="back-link">← Back to Projects</Link>
      </div>
    );
  }

  return (
    <div className="project-detail-container">
      <Link href="/#projects" className="back-link">← Back to Projects</Link>

      <h1 className="project-detail-title">{project.title}</h1>
      <h2 className="project-detail-subtitle">{project.shortDescription}</h2>

      {project.imagePath && ( // Only show image if imagePath exists in your data
        <div className="project-detail-image-container">
          <img src={project.imagePath} alt={`${project.title} Main Image`} className="project-detail-main-image" />
        </div>
      )}


      <div className="project-detail-section">
        <h3>Description</h3>
        <p>{project.fullDescription}</p>
      </div>

      <div className="project-detail-section">
        <h3>Key Technologies Used</h3>
        <p>{project.technologies}</p>
      </div>

      <div className="project-detail-section">
        <h3>Specific Contributions</h3>
        <ul className="project-contributions-list">
          {project.contributions.map((contribution, index) => (
            <li key={index}>{contribution}</li>
          ))}
        </ul>
      </div>

      <div className="project-detail-links">
        {project.projectLink !== '#' && ( // Only show button if a real link is provided
          <a href={project.projectLink} target="_blank" rel="noopener noreferrer" className="project-button">
            View Live Demo
          </a>
        )}
        {project.githubLink !== '#' && ( // Only show button if a real link is provided
          <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-button">
            GitHub Repo
          </a>
        )}
      </div>
    </div>
  );
}