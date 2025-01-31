import { useState, useEffect } from "react";
import { db } from "../Components/firebase"; // Import Firestore database
import { collection, getDocs, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Firebase authentication
import Footer from "../Components/Footer";
import "../Styling/Events.css";

function Opportunities() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [registrationMessage, setRegistrationMessage] = useState("");
  const [location, setLocation] = useState(""); // Capture user location

  const auth = getAuth();
  const user = auth.currentUser;

  // Fetch events from Firebase Firestore
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const eventsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsList);
        setFilteredEvents(eventsList); // Initialize filtered events
        setError(""); // Clear errors if successful
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to load events. Please try again.");
      }
      setLoading(false);
    };

    fetchEvents();
  }, []);

  // Filter events based on user input location
  useEffect(() => {
    const filtered = events.filter(event =>
      event.location.toLowerCase().includes(location.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [location, events]);

  // Handle event registration
  const handleEventRegistration = async (eventName) => {
    try {
      await addDoc(collection(db, "event_registrations"), {
        name: user ? user.displayName || "Authenticated User" : "Anonymous User",
        event: eventName,
        timestamp: new Date(),
      });

      setRegistrationMessage(`You have registered for ${eventName}!`);
      setTimeout(() => setRegistrationMessage(""), 3000);
    } catch (error) {
      console.error("Error saving event registration:", error);
    }
  };

  return (
   <div>
      <div className="opportunities-container">
      <h2>🎉 Upcoming Events</h2>

      <div className="filter-section">
        <input
          type="text"
          placeholder="Enter your location (e.g., Mumbai, Delhi)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="loading-message">⏳ Loading events...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : filteredEvents.length > 0 ? (
        <div className="events-grid">
          {filteredEvents.map((event) => (
            <div key={event.id} className="event-card">
              {event.imageURL && (
                <img src={event.imageURL} alt={event.title} className="event-image" />
              )}
              <div className="event-details">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p><b>Date:</b> {event.date} | <b>Time:</b> {event.time}</p>
                <p><b>Location:</b> {event.location}</p>
                <p><b>Organizer:</b> {event.organizer}</p>
                <p><b>Fees:</b> {event.Fees}</p>
              </div>
              <div className="event-buttons">
                <button className="register-btn" onClick={() => handleEventRegistration(event.title)}>
                <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                    <button className="register-btn">Register Now</button>
                  </a>
                </button>
                {event.registrationLink && (
                  <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                    <button className="info-btn">More Info</button>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="loading-message">❌ No events found for this location.</p>
      )}

      {registrationMessage && (
        <div className="registration-message">
          <p>{registrationMessage}</p>
        </div>
      )}

      
    </div>
    <Footer/>
   </div>
  );
}

export default Opportunities;
