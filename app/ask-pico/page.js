// app/ask-pico/page.js
"use client"; // This page needs client-side interactivity (even for simple links)

import Link from 'next/link';
import Image from 'next/image'; // Import Next.js Image component

// We are no longer importing ChatbotUI here for this simplified view

export default function AskPicoPage() {
  return (
    <div className="pico-page-container">
      <Link href="/#ask-pico" className="back-link-pico">← Back to Portfolio</Link>

      <div className="pico-content-wrapper">
        {/* Left Section: Pico Image */}
        <div className="pico-image-section">
          <Image
            src="/images/pico-chatbot-character.png" // Path to your Pico image in the public folder
            alt="Pico Chatbot Character"
            width={350} // Adjust width as needed for a larger Pico
            height={350} // Adjust height as needed
            className="pico-character-img"
            priority // Load this image with high priority
          />
        </div>

        {/* Right Section: Start Chatting Text */}
        <div className="pico-start-chatting-section">
          <h2>Start Chatting with Pico!</h2>
          <p>Your friendly AI assistant is ready to help.</p>
          {/* You can add a button here later to actually start the chat, or change this to the ChatbotUI when ready */}
          <Link href="/ask-pico/chat" className="pico-start-chat-button">
            Launch Chat
          </Link>
        </div>
      </div>
    </div>
  );
}