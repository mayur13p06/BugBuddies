import React, { useState } from "react";
import Footer from "../Components/Footer";
import "../Styling/Home.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Framer Motion for animations


function Home() {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([{ sender: "bot", text: "Hi! How can I assist you today?" }]);
  const [input, setInput] = useState("");

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  const handleSignUpClick = () => {
    navigate("/register"); // ✅ Now this will work
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");

    // Simulate bot response (later replace with API call)
    setTimeout(() => {
      const botResponse = { sender: "bot", text: "I'm here to help! What do you need?" };
      setMessages([...messages, userMessage, botResponse]);
    }, 1000);
  };

  return (
    <div className="home">
      {/* Header Section */}
      <header className="home-header">
        <motion.div
          className="header-content"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1>Welcome to StudSync!</h1>
          <p>Your one-stop platform for hackathons, flatmates, and college events.</p>
          <button className="btn-primary" onClick={handleSignUpClick}>
            Join Now
          </button>
        </motion.div>
        <motion.div
          className="header-image"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src="https://i.pinimg.com/736x/f5/a1/b7/f5a1b7a4d925b0ad9a063756ad6bb592.jpg"
            alt="College Collaboration"
          />
        </motion.div>
      </header>

      {/* Features Section */}
      <section className="home-features">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Why Choose StudSync?
        </motion.h2>
        <motion.div
          className="features-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="feature-item">
            <h3>Hackathon Groups</h3>
            <p>Create or join hackathon teams, collaborate with peers, and win exciting prizes.</p>
          </div>
          
          <div className="feature-item">
            <h3>College Events</h3>
            <p>Organize or participate in events with RSVPs, reminders, and live updates.</p>
          </div>
          <div className="feature-item">
            <h3>Find Flatmates</h3>
            <p>Discover compatible flatmates based on preferences, location, and lifestyle.</p>
          </div>
        </motion.div>
      </section>

      {/* AI-Driven Features Section */}
      <section className="home-ai">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          AI-Powered Enhancements
        </motion.h2>
        <motion.div
          className="ai-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="ai-item">
            <h3>Personalized Recommendations</h3>
            <p>Get tailored suggestions for events, groups, and flatmates based on your interests.</p>
          </div>
          <div className="ai-item">
            <h3>Smart Matching</h3>
            <p>Find the perfect hackathon team or flatmate using AI-driven compatibility analysis.</p>
          </div>
          <div className="ai-item">
            <h3>Event Insights</h3>
            <p>Receive real-time analytics and feedback to improve event planning and participation.</p>
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="home-testimonials">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          What Students Are Saying
        </motion.h2>
        <motion.div
          className="testimonials-carousel"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="testimonial">
            <p>
              "StudSync helped me find the perfect team for a hackathon. We won second place!"
            </p>
            <h4>— Sarah, Computer Science Student</h4>
          </div>
          <div className="testimonial">
            <p>
              "I found my flatmate through StudSync. We’re now best friends and roommates!"
            </p>
            <h4>— John, Engineering Student</h4>
          </div>
          <div className="testimonial">
            <p>
              "The event tools are amazing. Organizing our college fest was a breeze!"
            </p>
            <h4>— Priya, Event Organizer</h4>
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="home-faq">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.div
          className="faq-list"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="faq-item">
            <h3>What is StudSync?</h3>
            <p>
              StudSync is a community platform for college students to collaborate on hackathons, find flatmates, and organize events.
            </p>
          </div>
          <div className="faq-item">
            <h3>How does AI help?</h3>
            <p>Our AI provides personalized recommendations, smart matching, and event insights to enhance your experience.</p>
          </div>
          <div className="faq-item">
            <h3>Is it free to use?</h3>
            <p>Yes, StudSync is completely free for students!</p>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <div id="about">
        <h2>About</h2>
        <p>
          StudSync is a student-centric platform designed to foster collaboration, engagement, and community building. Whether you're looking for hackathon teams, flatmates, or event partners, we've got you covered.
        </p>
      </div>

      <Footer />

       {/* Chatbot Button */}
       <div className="chat-icon" onClick={toggleChat}>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-chat-right-text-fill" viewBox="0 0 16 16">
            <path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.586a1 1 0 0 1 .707.293l2.853 2.853a.5.5 0 0 0 .854-.353zM3.5 3h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1m0 2.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1m0 2.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1" />
          </svg>
        </span>
      </div>

      {/* Chatbot Popup */}
      {showChat && (
        <div className="chat-popup">
          <div className="chat-popup-content">
            <button className="close-popup" onClick={toggleChat}>
              ×
            </button>
            <h3>Chat with StudSync</h3>
            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default Home;