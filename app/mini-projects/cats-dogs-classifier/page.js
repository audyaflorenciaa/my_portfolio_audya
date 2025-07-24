// app/mini-projects/cats-dogs-classifier/page.js
"use client"; // This is needed for interactive client-side components

import React, { useState } from 'react';
import Link from 'next/link';

export default function CatsDogsClassifierPage() {
  const [selectedImage, setSelectedImage] = useState(null); // Stores the File object
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null); // Stores the URL for image preview
  const [predictionResult, setPredictionResult] = useState(null); // 'Cat' or 'Dog'
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle image selection
  const handleImageChange = (event) => {
    setErrorMessage(''); // Clear previous errors
    setPredictionResult(null); // Clear previous prediction
    const file = event.target.files[0];
    if (file) {
      // Basic file type validation (optional, but good practice)
      if (!file.type.startsWith('image/')) {
        setErrorMessage('Please upload a valid image file (e.g., JPG, PNG).');
        setSelectedImage(null);
        setImagePreviewUrl(null);
        return;
      }
      setSelectedImage(file);
      setImagePreviewUrl(URL.createObjectURL(file)); // Create a URL for previewing the image
    } else {
      setSelectedImage(null);
      setImagePreviewUrl(null);
    }
  };

  // Function to send image to backend for classification
  const classifyImage = async () => {
    setErrorMessage('');
    if (!selectedImage) {
      setErrorMessage('Please upload an image first.');
      return;
    }

    setIsLoading(true);
    setPredictionResult(null); // Clear previous result

    const formData = new FormData();
    formData.append('image', selectedImage); // Append the image file to form data

    try {
      // IMPORTANT: This is the URL for your Python Flask backend for the image classifier.
      // Ensure your Flask backend is running on http://127.0.0.1:5001
      const response = await fetch('http://127.0.0.1:5001/classify', {
        method: 'POST',
        body: formData, // Send form data directly (no 'Content-Type' header needed for FormData)
      });

      if (!response.ok) {
        // Attempt to parse error message from backend if available
        const errorText = await response.text(); // Read response as text first
        let parsedError = errorText;
        try {
          const errorJson = JSON.parse(errorText);
          parsedError = errorJson.error || errorText; // Use backend's error message if present
        } catch (e) {
          // Not a JSON error, use raw text
        }
        throw new Error(`Server error (${response.status}): ${parsedError}`);
      }

      const data = await response.json();
      const predictedClass = data.predicted_class; // Assuming backend returns { predicted_class: "cat", confidence: 0.95 }
      const confidence = data.confidence;

      setPredictionResult({ class: predictedClass, confidence: confidence });

    } catch (error) {
      console.error('Error classifying image:', error);
      // Display a user-friendly error message
      setErrorMessage(`Classification failed: ${error.message || 'Could not connect to AI backend.'}`);
      setPredictionResult(null); // Ensure no old result shows on error
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div className="page-container">
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

      <div className="main-card-wrapper">
        <div className="main-card">
          <h1 className="title">Cats vs. Dogs Classifier</h1>
          <p className="description">
            Upload an image, and my AI will tell you if it's a cat or a dog!
          </p>

          <div className="input-area">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
              disabled={isLoading}
            />
            {imagePreviewUrl && (
              <div className="image-preview-container">
                <img src={imagePreviewUrl} alt="Image Preview" className="image-preview" />
              </div>
            )}
          </div>

          <button
            onClick={classifyImage}
            className="classify-button"
            disabled={isLoading || !selectedImage}
          >
            {isLoading ? 'Classifying...' : 'Classify Image'}
          </button>

          {errorMessage && (
            <p className="error-message">{errorMessage}</p>
          )}

          {predictionResult && (
            <div className="prediction-result-card">
              <h2 className="prediction-label">
                It's a <span className="predicted-class-name">{predictionResult.class}!</span>
              </h2>
              <p className="confidence">
                Confidence: {predictionResult.confidence ? (predictionResult.confidence * 100).toFixed(2) : 'N/A'}%
              </p>
              <span className="prediction-emoji">
                {predictionResult.class === 'dog' ? '🐶' : '🐱'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Scoped CSS for this component */}
      <style jsx>{`
        .page-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #007bff, #6610f2, #fd7e14); /* Blue-Purple-Orange gradient */
          color: white;
          position: relative;
          font-family: 'Inter', sans-serif;
        }

        .back-button {
          position: absolute;
          top: 15px;
          left: 15px;
          color: white;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          padding: 8px 15px;
          border-radius: 25px;
          background-color: #000000;
          border: 1px solid rgba(255, 255, 255, 0.3);
          font-weight: 600;
          transition: all 0.3s ease-in-out;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
          z-index: 10;
          cursor: pointer;
        }

        .back-button:hover {
          color: #E0E0E0;
          background-color: #333333;
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 6px 18px rgba(0,0,0,0.5);
        }

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
          background-color: rgba(30, 41, 59, 0.8); /* Dark gray with opacity */
          backdrop-filter: blur(10px);
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          max-width: 900px;
          width: 100%;
          text-align: center;
          border: 1px solid rgba(0, 123, 255, 0.5); /* Blue border */
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
          background: linear-gradient(to right, #00BFFF, #FFD700); /* Deep Sky Blue to Gold gradient */
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

        .file-input {
          width: 100%;
          padding: 15px 20px;
          border-radius: 15px;
          background-color: #2D3748; /* Darker gray */
          color: white;
          border: 2px solid #007bff; /* Blue border */
          font-size: 1.1rem;
          cursor: pointer;
          transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        }

        .file-input::-webkit-file-upload-button {
          background: linear-gradient(to right, #007bff, #6610f2);
          color: white;
          padding: 10px 20px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .file-input::-webkit-file-upload-button:hover {
          background: linear-gradient(to right, #6610f2, #007bff);
        }

        .image-preview-container {
          margin-top: 20px;
          width: 250px; /* Fixed width for preview */
          height: 250px; /* Fixed height for preview */
          border: 2px solid #007bff;
          border-radius: 15px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: auto;
          margin-right: auto;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .image-preview {
          width: 100%;
          height: 100%;
          object-fit: cover; /* Cover the container, cropping if necessary */
        }

        .classify-button {
          background: linear-gradient(to right, #fd7e14, #ffc107); /* Orange to Yellow gradient */
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

        .classify-button:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }

        .classify-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .error-message {
          color: #EF4444; /* Red */
          margin-top: 20px;
          font-weight: bold;
        }

        .prediction-result-card {
          margin-top: 40px;
          padding: 30px;
          border-radius: 20px;
          background-color: rgba(0, 123, 255, 0.2); /* Semi-transparent blue */
          border: 2px solid #007bff; /* Blue border */
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transform: scale(1);
          transition: all 0.5s ease-in-out;
        }

        .prediction-result-card.highlighted {
          transform: scale(1.08);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
          border-width: 4px;
          animation: pulse-border 1.5s infinite alternate;
        }

        @keyframes pulse-border {
          from { border-color: #007bff; }
          to { border-color: #fd7e14; }
        }

        .prediction-label {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 10px;
          color: #E0E0E0;
        }

        .predicted-class-name {
          background: linear-gradient(to right, #00BFFF, #FFD700);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .confidence {
          font-size: 1.2rem;
          color: #B0B0B0;
          margin-bottom: 20px;
        }

        .prediction-emoji {
          font-size: 5rem;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .title {
            font-size: 2.5rem;
          }
          .main-card {
            padding: 30px;
          }
          .image-preview-container {
            width: 200px;
            height: 200px;
          }
          .prediction-label {
            font-size: 2rem;
          }
          .prediction-emoji {
            font-size: 4rem;
          }
        }
      `}</style>
    </div>
  );
}
