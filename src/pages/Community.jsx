import { useState } from "react";
import Footer from "../Components/Footer";
import "../Styling/Community.css"; // Ensure the CSS file is properly linked

function Community() {
  const initialEvents = [
    {
      name: "AI Hackathon 2025",
      description: "A challenge to build AI-powered applications.",
      rating: 4,
      eventDate: "2025-06-15",
    },
    {
      name: "GreenTech Challenge",
      description: "Innovative solutions for sustainable technologies.",
      rating: 5,
      eventDate: "2025-08-10",
    },
    {
      name: "HealthTech Summit",
      description: "Healthcare solutions for the future.",
      rating: 3,
      eventDate: "2025-09-05",
    },
    {
      name: "EcoHack 2025",
      description: "Building eco-friendly solutions for a better world.",
      rating: 4,
      eventDate: "2025-07-20",
    },
  ];
  
  const initialClubs = [
    {
      name: "I2IC",
      description: "A Club for Training and Placement.",
      rating: 4,
      domain: "Technology",
    },
    {
      name: "Google Developers Group",
      description: "Ready to level up your skills and be part of an incredible tech community.",
      rating: 5,
      domain: "Development",
    },
  ];

  const [events] = useState(initialEvents);
  const [clubs] = useState(initialClubs);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredClubs = clubs.filter((club) =>
    club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    club.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="community-container">
      {/* Search Bar Section */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search for hackathons or clubs..."
          className="search-input"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className="content">
        <div className="content-wrapper">
          {/* Events Section */}
          <div className="community-section">
            <h2>Top Past Hackathons</h2>
            <div className="card-list">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event, index) => (
                  <div key={index} className="card">
                    <h3>{event.name}</h3>
                    <p>{event.description}</p>
                    <p>Rating: {"⭐".repeat(event.rating)}</p>
                    <p>Date: {event.eventDate}</p>
                  </div>
                ))
              ) : (
                <p>No hackathons found.</p>
              )}
            </div>
            
            {/* Clubs Section */}
            <h2>College Clubs for You</h2>
            <div className="card-list">
              {filteredClubs.length > 0 ? (
                filteredClubs.map((club, index) => (
                  <div key={index} className="card">
                    <h3>{club.name}</h3>
                    <p>{club.description}</p>
                    <p>Domain: {club.domain}</p>
                    <p>Rating: {"⭐".repeat(club.rating)}</p>
                    <a href="https://chat.whatsapp.com/CHTw9yHs3SN2Oi2AAuXcij"> <button className="apply-button">Join Now</button></a>
                  </div>
                ))
              ) : (
                <p>No clubs found.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
     
    </div>
    <Footer/>
    </div>
  );
}

export default Community;
