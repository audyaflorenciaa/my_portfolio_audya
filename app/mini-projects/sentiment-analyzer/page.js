// app/mini-projects/sentiment-analyzer/page.js
"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function SentimentAnalyzerPage() {
  const [inputText, setInputText] = useState('');
  const [sentimentResult, setSentimentResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const analyzeSentiment = async () => {
    setErrorMessage('');
    if (inputText.trim() === '') {
      setErrorMessage('Please enter some text to analyze.');
      setSentimentResult(null);
      return;
    }

    setIsLoading(true);
    setSentimentResult(null);

    try {
      // ===>>> This is the line you need to change <<<===
      const apiUrl = process.env.NEXT_PUBLIC_SENTIMENT_BACKEND_API_URL;
      
      // Add a check to ensure the environment variable is loaded
      if (!apiUrl) {
        throw new Error("Sentiment API URL is not configured. Please check Vercel environment variables.");
      }

      const response = await fetch(`${apiUrl}/analyze`, { // Use the apiUrl variable here
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Server error: ${response.status} - ${errorData.error || response.statusText}`);
      }

      const data = await response.json();
      const sentiment = data.sentiment;

      setSentimentResult(sentiment);

    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      setErrorMessage(`Error: ${error.message || 'Could not connect to AI backend.'}`);
      setSentimentResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const sentimentTypes = [
    { type: 'Positive', emoji: '😊', bgColor: '#4CAF50', textColor: '#FFFFFF', borderColor: '#388E3C' }, // Green
    { type: 'Neutral', emoji: '😐', bgColor: '#FFC107', textColor: '#000000', borderColor: '#FFA000' }, // Amber
    { type: 'Negative', emoji: '😞', bgColor: '#F44336', textColor: '#FFFFFF', borderColor: '#D32F2F' }, // Red
  ];

  return (
    <div className="page-container">
      {/* Back Button - Applying inline styles directly to the Link component */}
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

      <div className="main-card-wrapper"> {/* New wrapper for the main card */}
        <div className="main-card">
          <h1 className="title">Text Sentiment Analyzer</h1>
          <p className="description">
            Type a sentence below, and my AI will analyze its emotional tone: Positive, Neutral, or Negative.
          </p>

          <div className="input-area">
            <textarea
              className="text-input"
              placeholder="e.g., 'This movie was absolutely fantastic!'"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isLoading}
            ></textarea>
          </div>

          <button
            onClick={analyzeSentiment}
            className="analyze-button"
            disabled={isLoading}
          >
            {isLoading ? 'Analyzing...' : 'Analyze Sentiment'}
          </button>

          {errorMessage && (
            <p className="error-message">{errorMessage}</p>
          )}

          {/* Result Display Area */}
          <div className="results-grid">
            {sentimentTypes.map((sentimentType) => (
              <div
                key={sentimentType.type}
                className={`result-card ${sentimentResult === sentimentType.type ? 'highlighted' : 'faded'} ${isLoading ? 'loading' : ''}`}
                style={{ backgroundColor: sentimentType.bgColor, borderColor: sentimentType.borderColor }}
              >
                <span className="emoji">{sentimentType.emoji}</span>
                <h3 className="sentiment-type" style={{ color: sentimentType.textColor }}>
                  {sentimentType.type}
                </h3>
                {sentimentResult === sentimentType.type && (
                  <p className="analyzed-text">
                    &quot;{inputText}&quot;
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scoped CSS for this component (keeping other styles here) */}
      <style jsx>{`
        .page-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #4A00E0, #8E2DE2, #F06292); /* Purple to Pink gradient */
          color: white;
          position: relative; /* Ensure absolute positioning works relative to this container */
          font-family: 'Inter', sans-serif; /* Use Inter font */
        }

        /* The .back-button class is now mostly redundant for the Link component,
           as its styles are applied inline. Keeping it for the SVG's currentColor. */
        /* .back-button { ... } */

        .back-icon {
          width: 24px;
          height: 24px;
          margin-right: 8px;
          stroke: currentColor;
        }

        .main-card-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          width: 100%;
          padding: 20px;
          box-sizing: border-box;
        }

        .main-card {
          background-color: rgba(30, 41, 59, 0.8);
          backdrop-filter: blur(10px);
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          max-width: 900px;
          width: 100%;
          text-align: center;
          border: 1px solid rgba(126, 34, 206, 0.5);
          transform: scale(1);
          transition: transform 0.3s ease-in-out;
        }

        .main-card:hover {
          transform: scale(1.02);
        }

        .title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 15px;
          background: linear-gradient(to right, #C084FC, #EC4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .description {
          font-size: 1.1rem;
          color: #E0E0E0;
          margin-bottom: 30px;
        }

        .input-area {
          margin-bottom: 30px;
        }

        .text-input {
          width: calc(100% - 40px);
          padding: 15px 20px;
          border-radius: 15px;
          background-color: #2D3748;
          color: white;
          border: 2px solid #8B5CF6;
          font-size: 1.1rem;
          resize: vertical;
          min-height: 120px;
          transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        }

        .text-input:focus {
          outline: none;
          border-color: #EC4899;
          box-shadow: 0 0 0 4px rgba(236, 72, 153, 0.5);
        }

        .analyze-button {
          background: linear-gradient(to right, #EC4899, #8B5CF6);
          color: white;
          font-weight: bold;
          padding: 15px 40px;
          border-radius: 50px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          font-size: 1.2rem;
          letter-spacing: 0.05em;
          transition: all 0.3s ease-in-out;
          border: none;
          cursor: pointer;
        }

        .analyze-button:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }

        .analyze-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .error-message {
          color: #EF4444;
          margin-top: 20px;
          font-weight: bold;
        }

        .results-grid {
          margin-top: 40px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 25px;
        }

        .result-card {
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          border: 2px solid;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: all 0.5s ease-in-out;
        }

        .result-card.highlighted {
          transform: scale(1.08);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
          border-width: 4px;
          animation: pulse-border 1.5s infinite alternate;
        }

        @keyframes pulse-border {
          from { border-color: var(--border-color-start, #8B5CF6); }
          to { border-color: var(--border-color-end, #EC4899); }
        }

        .result-card.faded {
          opacity: 0.4;
        }

        .result-card.faded:hover {
          opacity: 1;
        }

        .result-card.loading {
          animation: pulse 1.5s infinite ease-in-out;
        }

        @keyframes pulse {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }

        .emoji {
          font-size: 5rem;
          margin-bottom: 15px;
        }

        .sentiment-type {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .analyzed-text {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1rem;
          font-style: italic;
          margin-top: 10px;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .title {
            font-size: 2.5rem;
          }
          .main-card {
            padding: 30px;
          }
          .results-grid {
            grid-template-columns: 1fr;
          }
          .emoji {
            font-size: 4rem;
          }
          .sentiment-type {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </div>
  );
}
