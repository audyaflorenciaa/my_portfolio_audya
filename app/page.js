// app/page.js
import Navbar from '../components/Navbar'; // Import the Navbar component
import Link from 'next/link'; // Import Link
import Image from 'next/image';
import { projects } from '../lib/projects'; // Import your project data
import MiniProjectsDisplaySection from '../components/MiniProjectsDisplaySection';

export default function Home() {
  return (
    <div className="page-container">
      <Navbar />

      <section id="profile" className="hero-section">
        <div className="hero-content">
          <h2 className="hero-subtitle">INNOVATING WITH AI</h2>
          <h1 className="hero-title">PORTFOLIO</h1>
        </div>
      </section>

      <section className="about-me-section">
        <div className="about-me-gradient-bg"></div> 
        <div className="about-me-content">
          <div className="profile-summary">
            <div className="profile-image-container">
              <img
                src="/profile.png" 
                alt="Audya's Profile"
                className="profile-image"
              />
            </div>
            <h2 className="profile-name">AUDYA FLORENCIA</h2>
            <h3 className="profile-title">Computer Science Student Specializing in Artificial Intelligence</h3>
            <p className="profile-bio">
              A dedicated Computer Science student specializing in Artificial Intelligence, eager to apply theoretical knowledge and problem-solving skills to real-world challenges. Passionate about leveraging technology to innovate and contribute to dynamic teams. A quick learner with a strong foundation in computational principles and a keen interest in continuous growth within the tech industry.
            </p>
            <div className="contact-info">
              <p>📍 Jakarta, Indonesia</p>
              <p>📧 audyaflorenciaa@gmail.com</p>
              <p>📱 <a href="https://wa.me/6289637318865">+62 896 3731 8865</a></p>
              <p>🔗 <a href="https://www.linkedin.com/in/audya-florencia-4099bb271" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a></p>
              <p>🐙 <a href="https://github.com/audyaflorenciaa" target="_blank" rel="noopener noreferrer">GitHub Profile</a></p> 
              <p>📄 <a href="/CV_AudyaFlorencia_with_portfolio.pdf" target="_blank" rel="noopener noreferrer">Download Resume</a></p>
            </div>
          </div>

          <div className="details-grid">
            <div className="detail-card">
              <h4>EDUCATION</h4>
              <ul>
                <li>
                  <strong>2023-2027</strong> - Bachelor of Computer Science (AI Major) <br />
                  Bina Nusantara University - Tangerang Selatan, Indonesia
                </li>
              </ul>
            </div>
            <div className="detail-card">
              <h4>WORK EXPERIENCE</h4>
              <p className="job-title-experience">
                <strong>Programmer Intern</strong> at PT. FITURE TEKNOLOGI INDONESIA
              </p>
              <ul>
                <li>Contributed to the enhancement of the company&apos;s project management system by implementing improvements using Laravel and PHP technologies.</li>
                <li>Actively engaged in learning and applying fundamental programming algorithms to optimize code efficiency.</li>
                <li>Gained practical experience and a solid understanding of Object-Oriented Programming (OOP) concepts through hands-on development tasks.</li>
              </ul>
            </div>
            <div className="detail-card">
              <h4>SKILLSET</h4>
              <div className="skills-list-horizontal"> 
                <span className="skill-tag">Python, Javascript, C++</span>
                <span className="skill-tag">Software Development</span>
                <span className="skill-tag">Machine Learning</span>
                <span className="skill-tag">Data Preprocessing</span>
                <span className="skill-tag">Deep Learning</span>
                <span className="skill-tag">Next.js/React</span>
                <span className="skill-tag">Laravel</span>
                <span className="skill-tag">Data Analysis</span>
                <span className="skill-tag">Model Training</span>
                <span className="skill-tag">TensorFlow</span> {/* Example of adding more */}
                <span className="skill-tag">PyTorch</span>
                <span className="skill-tag">NLP</span>
                <span className="skill-tag">Git</span>
                <span className="skill-tag">Scikit-learn</span>
                <span className="skill-tag">Numpy</span>
                <span className="skill-tag">Pandas</span>
                <span className="skill-tag">Computer Vision</span>
                {/* Add more skills as individual <span> elements */}
              </div>
            </div>
            <div className="detail-card">
              <h4>LANGUAGES</h4>
              <span className="skill-tag">English</span>
              <span className="skill-tag">Indonesian</span>
            </div>
            <div className="detail-card">
              <h4>SOFT SKILLS</h4>
              <ul>
                <li>Problem Solving</li>
                <li>Communication</li>
                <li>Teamwork</li>
                <li>Adaptability/Flexibility</li>
                <li>Time Management</li>
                <li>Continuous Learning</li>
                <li>Innovative</li>
              </ul>
            </div>
            <div className="detail-card">
              <h4>MY PASSIONS</h4>
              <div className="passions-icons">
                {/* Placeholder icons - replace with actual SVGs or Font Awesome if desired */}
                <div className="passion-icon">💡 AI Innovation and Research</div>
                <div className="passion-icon">✍️ Building Intelligent System</div>
                <div className="passion-icon">🧩 Solving Complex Problems with AI</div>
                <div className="passion-icon">🤖 Exploring Machine Learning / Deep Learning</div>
                <div className="passion-icon">🔎 Learning and Discovery</div>
                <div className="passion-icon">🏔️ Exploring Nature</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="projects-display-section">
        <div className="whats-inside-label">WHAT&apos;S INSIDE?</div>
        <div className="project-grid">
          {projects.map((project) => (
            <Link href={`/projects/${project.id}`} key={project.id} className="project-card-link">
              <div className="project-card">
                <span className="project-number">{project.number}</span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-short-description">{project.shortDescription}</p>

                {/* Conditional Image Placeholder: 
                    Only renders if project.imagePath exists 
                    AND displayCardImage is not explicitly set to false */}
                {project.imagePath && (project.displayCardImage === undefined || project.displayCardImage === true) && (
                  <div className="project-image-placeholder">
                    <img src={project.imagePath} alt={`${project.title} Screenshot`} />
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="ask-pico" className="pico-homepage-placeholder-section">
        <div className="pico-placeholder-content"> {/* This will be our main flex container */}
          <Image
            src="/pico.png" // Assuming this is the correct path
            alt="Pico Chatbot Character"
            width={400} // Make Pico huge
            height={400} // Maintain aspect ratio
            className="pico-placeholder-img"
            priority
          />
          
          {/* NEW: This div will hold all your text and the button */}
          <div className="pico-text-content">
            <h2>Ask Pico!</h2>
            <p>Your friendly AI assistant is ready to answer questions about Audya and her projects.</p>
            <Link href="/ask-pico/chat" className="pico-placeholder-button">
              Chat with Pico now!
            </Link>
          </div>
          
        </div>
      </section>

      <MiniProjectsDisplaySection />
    </div>
  );
}