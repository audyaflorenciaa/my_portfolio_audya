// app/ask-pico/chat/page.js
"use client"; // This page needs client-side interactivity

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// Define Pico's rules for keyword recognition
const picoRules = {
  "hi": "Hello there! I'm Pico, Audya's personal chatbot. How can I help you today?",
  "hello": "Greetings! I'm Pico. What would you like to know about Audya?",
  "how are you": "As an AI, I don't have feelings, but I'm ready to assist you! How can I be of service?",
  "pico": "My name is Pico, Audya's AI assistant!",
  "who are you": "My name is Pico, Audya's AI assistant!",
  "what is your name": "My name is Pico, Audya's AI assistant!",
  "audya": "Audya is a Computer Science student specializing in AI. She's the brilliant mind who created me!",
  "projects": "Audya has several exciting projects! You can find them in her Projects section, but some highlights include WeatherZen (smart weather insights), AttendSnap (face recognition attendance), and ExploreID (an Indonesian travel planner). You can check her github and linkedin profile for more information",
  // Specific response for AI projects, this will now be prioritized
  "tell me about audya's ai projects": "Audya has developed several AI projects including WeatherZen for smart weather insights, AttendSnap for face recognition attendance, ExploreID for an Indonesian travel planner, SkipOrStick for Netflix review sentiment analysis, and a project for detecting sickle cell gene mutations.",
  "tell me about your projects": "Audya has developed projects like WeatherZen (AI weather predictions), AttendSnap (face recognition attendance), ExploreID (AI travel planner), SkipOrStick (Netflix review sentiment analysis), and a project on Sickle Cell Gene Mutation Detection. You can see all the details in the Projects section!",
  "location": "I exist in the digital realm, but Audya, my creator, is based in Jakarta, Indonesia!",
  "contact audya": "You can find Audya's contact information, including her email, WhatsApp, LinkedIn, and GitHub, in the Profile section of her portfolio.",
  "bye": "Goodbye! It was nice chatting with you. Feel yourself to return anytime!",
  "thank you": "You're most welcome! Is there anything else I can help with?",
  "education": "Audya is currently pursuing her Bachelor of Computer Science (AI Major) at Bina Nusantara University, from 2023-2027.",
  // Specific response for work experience
  "does audya have any work experience in tech": "For detailed information regarding Audya's work experience, please kindly check her CV.",
  "work experience": "Audya has experience as a Programmer Intern at PT. FITURE TEKNOLOGI INDONESIA, where she contributed to project management system enhancements and optimized code efficiency.",
  "skills": "Audya's skills include Python, Machine Learning, Deep Learning, Next.js/React, Data Analysis, TensorFlow, PyTorch, NLP, Computer Vision, and more!",
  // Specific response for AI skills
  "what are audya's key skills in ai": "Audya's key AI skills include: Machine Learning, Deep Learning, Computer Vision, Natural Language Processing, Data Preprocessing, Model Training, and Model Evaluation. She is proficient with ML Frameworks & Libraries such as TensorFlow, Keras, PyTorch, NLP, Computer Vision and more.",
  "passions": "Audya is passionate about AI innovation and research, building intelligent systems, solving complex problems with AI, exploring machine learning/deep learning, and also enjoys learning & discovery and exploring nature!",
  // Specific response for AI passions
  "what are audya's biggest passions in ai research": "Audya is passionate about leveraging technology to innovate and contribute to dynamic teams. She has a keen interest in continuous growth within the tech industry.",
  "job": "Audya is open to remote and flexible job opportunities! She's keen on roles that allow her to apply her AI skills.",
  "available for work": "Audya is open to remote and flexible job opportunities! She's keen on roles that allow her to apply her AI skills.",
  "availability": "Audya is currently looking for exciting new opportunities in AI, especially remote and flexible roles!",
  // Specific response for AI roles
  "what kind of ai roles is audya interested in": "Audya is open to remote and flexible job opportunities! She's keen on roles that allow her to apply her AI skills, focusing on areas like natural language processing, computer vision, and building robust machine learning models.",
  "ai focus": "Audya is particularly interested in applying AI to real-world problems, focusing on areas like natural language processing, computer vision, and building robust machine learning models.",
  "favorite ai areas": "Audya really enjoys working on projects involving natural language processing (NLP) and computer vision, especially when they can solve practical problems.",
  "problem solving": "Audya's approach to problem-solving usually involves breaking down complex issues, researching potential AI solutions, and iterating quickly to find the most effective approach.",
  "favorite tools": "Audya enjoys working with Python, TensorFlow, PyTorch, and Next.js/React, always looking to learn and apply new technologies.",
  "future goals": "Audya's long-term goal is to contribute to innovative AI solutions that make a positive impact, continuously learning and pushing the boundaries of what AI can achieve.",
  // Specific response for education
  "where is audya studying computer science": "Audya is currently pursuing her Bachelor of Computer Science (AI Major) at Bina Nusantara University, from 2023-2027.",
};

// Create a sorted array of picoRules to ensure longest matches are checked first
// This is done once outside the component or in a useMemo if picoRules could change dynamically
const sortedPicoRules = Object.keys(picoRules)
  .sort((a, b) => b.length - a.length) // Sort by length, longest first
  .map(key => ({ keyword: key, response: picoRules[key] }));


export default function AIHomePage() {
  const [inputValue, setInputValue] = useState('');
  // Initialize messages with the first bot message
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hi there! I'm Pico, Audya's personal chatbot. Ask me anything about her portfolio or projects!" }
  ]);
  const messagesEndRef = useRef(null); // Ref for auto-scrolling

  // Define suggestion phrases for the grid
  const suggestions = [
    "Tell me about Audya's AI projects.",
    "What are Audya's key skills in AI?",
    "Where is Audya studying Computer Science?",
    "Does Audya have any work experience in tech?",
    "What kind of AI roles is Audya interested in?",
    "What are Audya's biggest passions in AI research?",
  ];

  // Scroll to the bottom of the messages area whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handles sending messages and generating bot responses
  const handleSend = () => {
    if (inputValue.trim() === '') return;

    const userMessage = inputValue.trim();
    // Add user message to the conversation history
    setMessages((prevMessages) => [...prevMessages, { sender: 'user', text: userMessage }]);
    setInputValue(''); // Clear input immediately

    let botResponse = "I'm sorry, I don't have information on that. Can you try rephrasing or ask about Audya's projects, skills, or experience? If you have questions beyond my capabilities, you can reach Audya directly at audyaflorenciaa@gmail.com or +62 896 3731 8865 (WhatsApp).";
    const userMessageLower = userMessage.toLowerCase();

    // Check against sortedPicoRules for a response (longest match first)
    for (const rule of sortedPicoRules) {
      if (userMessageLower.includes(rule.keyword)) {
        botResponse = rule.response;
        // if (rule.keyword === "does audya have any work experience in tech") { // Example of custom logic for specific keyword
        //   botResponse = "For detailed information regarding Audya's work experience, please kindly check her CV.";
        // }
        break; // Stop at the first (longest) match
      }
    }

    // Add bot response after a short delay for a more natural feel
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: botResponse }]);
    }, 800);
  };

  // Handles Enter key press in the input field
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Handles clicking on suggestion cards
  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    // Automatically send the suggestion as a message
    handleSend(); 
  };

  const showSuggestions = messages.length <= 1; // Show suggestions only if no user messages sent yet

  return (
    <div className="ai-home-page-root">
      {/* Back Button */}
      <Link
        href="/"
        style={{
          position: 'absolute',
          top: '15px',
          left: '15px',
          color: 'white',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          padding: '8px 15px',
          borderRadius: '25px',
          backgroundColor: '#000000', // Black background as requested
          border: '1px solid rgba(255, 255, 255, 0.3)', // Subtle white border
          fontWeight: '600',
          transition: 'all 0.3s ease-in-out',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
          zIndex: 10,
          cursor: 'pointer',
        }}
        // You'll need to handle hover effects with JavaScript if using pure inline styles
        // For simplicity, hover is omitted here, but can be added with onMouseEnter/onMouseLeave
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '24px', height: '24px', marginRight: '8px', stroke: 'currentColor' }}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </Link>

      {/* Main Title */}
      <h1 className="main-title">Chat with Pico!</h1>

      {/* Suggestions Grid (conditionally rendered) */}
      <div className={`suggestions-grid ${!showSuggestions ? 'hidden' : ''}`}>
        {suggestions.map((suggestion, index) => (
          <button key={index} className="suggestion-card" onClick={() => handleSuggestionClick(suggestion)}>
            {suggestion}
          </button>
        ))}
      </div>

      {/* Message Display Area - This is where your chat bubbles will appear */}
      <div className="messages-display-area">
        {messages.map((msg, index) => (
          <div key={index} className={`message-row ${msg.sender}`}>
            <div className="message-bubble">
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* Element to scroll into view */}
      </div>

      {/* Input Area */}
      <div className="input-container">
        <input
          type="text"
          className="question-input"
          placeholder="Ask a question here"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="send-button" onClick={handleSend}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="currentColor"/>
          </svg>
        </button>
        <span className="char-count">{inputValue.length}/2048</span> {/* Update char count */}
      </div>

      {/* Scoped CSS for this component */}
      <style jsx>{`
        .ai-home-page-root {
          min-height: 100vh;
          background-color: #333; /* Dark background */
          color: #e0e0e0; /* Light text for contrast */
          display: flex;
          flex-direction: column;
          align-items: center;
          /* Adjusted for content flow from top */
          justify-content: flex-start;
          padding: 50px 20px 20px 20px; /* Added top padding */
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
        }

        .iridescent-sphere {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          /* Kept radial gradient, it should still look good on dark */
          background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(200, 200, 255, 0.4), rgba(255, 200, 255, 0.4), rgba(200, 255, 255, 0.4));
          box-shadow: 0 0 15px rgba(0,0,0,0.05), inset 0 0 20px rgba(255,255,255,0.7);
          margin-bottom: 40px;
        }

        .main-title {
          font-size: 2.2rem;
          font-weight: 600;
          color: #fff; /* Changed to white for contrast */
          margin-bottom: 30px; /* Reduced margin */
          text-align: center;
        }

        .suggestions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); /* 3 columns on larger screens */
          gap: 20px;
          width: 100%;
          max-width: 900px;
          margin-bottom: 30px; /* Space above messages area or input */
          
          /* For hiding/showing effect */
          transition: opacity 0.3s ease-in-out, max-height 0.5s ease-in-out, margin-bottom 0.3s ease-in-out;
          opacity: 1;
          max-height: 500px; /* Max height when visible */
          overflow: hidden;
        }

        .suggestions-grid.hidden {
          opacity: 0;
          max-height: 0; /* Collapse height when hidden */
          margin-bottom: 0;
          pointer-events: none; /* Prevent clicks when hidden */
        }

        .suggestion-card {
          background-color: #2a2a2a; /* Darker background for card itself */
          border: 1px solid #555; /* Subtle border for dark theme */
          border-radius: 12px;
          padding: 20px;
          font-size: 1rem;
          color: #e0e0e0; /* Light text for contrast on dark card */
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2); /* Adjusted shadow for dark */
          text-align: left;
          height: 100px; /* Fixed height for consistent look */
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1.4;
          overflow: hidden;
        }

        .suggestion-card:hover {
          border-color: #777; /* Slightly lighter border on hover */
          box-shadow: 0 6px 15px rgba(0,0,0,0.3); /* More prominent shadow on hover */
          transform: translateY(-2px);
        }

        /* Message display area */
        .messages-display-area {
            width: 100%;
            max-width: 700px; /* Match input width for consistency */
            flex-grow: 1;
            overflow-y: auto;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            background-color: #333; /* Chatbox background matching page */
            margin-bottom: 20px; /* Space above input */
            min-height: 200px; /* Give it some space initially */
            border-radius: 12px; /* Match suggestion card border-radius */
            box-shadow: 0 2px 8px rgba(0,0,0,0.15); /* Subtle shadow on dark */
            border: 1px solid #555; /* Subtle border on dark */
        }

        .message-row {
            display: flex;
        }

        .message-row.user {
            justify-content: flex-end;
        }

        .message-row.bot {
            justify-content: flex-start;
        }

        .message-bubble {
            padding: 10px 15px;
            border-radius: 20px;
            max-width: 70%;
            word-wrap: break-word;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            line-height: 1.4;
            border-bottom-left-radius: 20px;
            border-bottom-right-radius: 20px;
        }

        .message-row.user .message-bubble {
            background-color: #ad1457; /* Darker pink for user (from accent-color-dark) */
            color: #fff; /* White text on dark pink */
            border-top-left-radius: 20px;
            border-top-right-radius: 5px;
        }

        .message-row.bot .message-bubble {
            background-color: #444; /* Darker gray for bot */
            color: #fff; /* White text on dark gray */
            border-top-left-radius: 5px;
            border-top-right-radius: 20px;
        }

        /* Input area */
        .input-container {
          display: flex;
          align-items: center;
          background-color: #2a2a2a; /* Darker background for input container */
          border: 1px solid #555; /* Subtle border */
          border-radius: 25px;
          padding: 8px 15px;
          width: 100%;
          max-width: 700px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2); /* Adjusted shadow for dark */
          position: relative;
          margin-bottom: 50px; /* Space above policy links */
        }

        .question-input {
          flex-grow: 1;
          border: none;
          outline: none;
          padding: 8px 10px;
          font-size: 1rem;
          color: #e0e0e0; /* Light text on dark input */
          background-color: transparent; /* Ensure input container background shows */
        }

        .question-input::placeholder {
          color: #888; /* Still good for dark placeholder text */
        }

        .send-button {
          background-color: white; /* Changed to white */
          color: #333; /* Text color on white background */
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;
          margin-left: 10px;
        }

        .send-button:hover {
          background-color: #f0f0f0; /* Lighter gray on hover for white button */
          transform: translateY(-1px);
        }

        .send-button svg {
            fill: #333; /* Changed to dark color for visibility on white background */
        }

        .char-count {
            position: absolute;
            right: 70px;
            color: #ccc; /* Adjusted color for visibility on dark background */
            font-size: 0.85rem;
        }

        .policy-links {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 25px;
          font-size: 0.9rem;
          background-color: transparent;
          padding: 10px;
          width: 100%;
          justify-content: center;
          z-index: 10;
        }

        .policy-links a {
          color: #aaa; /* Adjusted link color for visibility on dark background */
          text-decoration: none;
          transition: color 0.2s ease-in-out;
        }

        .policy-links a:hover {
          color: #fff; /* White on hover for better contrast */
          text-decoration: underline;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .main-title {
            font-size: 1.8rem;
            margin-bottom: 30px;
          }
          .suggestions-grid {
            grid-template-columns: 1fr;
            gap: 15px;
            margin-bottom: 20px;
          }
          .suggestion-card {
            padding: 15px;
            font-size: 0.9rem;
            height: auto;
            min-height: 80px;
          }
          .messages-display-area {
            padding: 15px;
            min-height: 150px;
            margin-bottom: 15px;
          }
          .input-container {
            width: 95%;
            padding: 6px 12px;
            margin-bottom: 30px;
          }
          .question-input {
            font-size: 0.9rem;
          }
          .send-button {
            width: 35px;
            height: 35px;
          }
          .char-count {
            right: 60px;
            font-size: 0.75rem;
          }
          .policy-links {
            flex-direction: column;
            gap: 10px;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
}