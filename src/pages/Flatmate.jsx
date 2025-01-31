import { useState, useEffect } from "react";
import { db } from "../Components/firebase"; // Import Firestore database
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import Footer from "../Components/Footer";
import "../Styling/Flatmate.css";

function FlatmateFinder() {
  // States for user input
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [preferences, setPreferences] = useState({
    smoking: false,
    pets: false,
    cleanliness: "any",
  });
  const [submitted, setSubmitted] = useState(false);
  const [matches, setMatches] = useState([]);
  const [flatmateProfiles, setFlatmateProfiles] = useState([]);

  // Fetch flatmate profiles from Firestore
  useEffect(() => {
    const fetchFlatmates = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "flatmates"));
        const profiles = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFlatmateProfiles(profiles);
      } catch (error) {
        console.error("Error fetching flatmate profiles:", error);
      }
    };
    fetchFlatmates();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Store user data in Firebase
    try {
      const docRef = await addDoc(collection(db, "flatmates"), {
        name: name,
        location: location,
        budget: parseFloat(budget),
        preferences: preferences,
      });
      console.log("Document written with ID: ", docRef.id); // Debugging
      alert("Your profile has been submitted successfully!");
    } catch (error) {
      console.error("Error adding flatmate profile:", error);
      alert("Failed to submit profile. Please try again.");
    }

    // Check for matching profiles
    findMatches();
  };

  // Find matches based on user input
  const findMatches = async () => {
    try {
      // Query Firestore for profiles with matching location, smoking, and pet preferences
      const q = query(
        collection(db, "flatmates"),
        where("location", "==", location),
        where("preferences.smoking", "==", preferences.smoking),
        where("preferences.pets", "==", preferences.pets)
      );

      const querySnapshot = await getDocs(q);
      const matchingProfiles = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Exclude the current user's profile (if needed)
      const filteredMatches = matchingProfiles.filter(
        (profile) => profile.name !== name
      );

      setMatches(filteredMatches);
    } catch (error) {
      console.error("Error finding matches:", error);
    }
  };

  return (
    <div>
      <div className="flatmate-finder">
        <h1>Find Your Ideal Flatmate</h1>
        <p>Enter your preferences to find a flatmate that matches your needs.</p>

        <div className="form-container">
          <h2>Enter Your Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="location">Preferred Location:</label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter preferred location"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="budget">Budget (per month):</label>
              <input
                type="number"
                id="budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Enter your budget"
                required
              />
            </div>
            <div className="form-group">
              <label>Smoking Preference:</label>
              <select
                value={preferences.smoking ? "yes" : "no"} // Toggle value to match boolean
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    smoking: e.target.value === "yes",
                  })
                }
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="form-group">
              <label>Pets Preference:</label>
              <select
                value={preferences.pets ? "yes" : "no"} // Toggle value to match boolean
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    pets: e.target.value === "yes",
                  })
                }
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="form-group">
              <label>Cleanliness Preference:</label>
              <select
                value={preferences.cleanliness}
                onChange={(e) =>
                  setPreferences({ ...preferences, cleanliness: e.target.value })
                }
              >
                <option value="any">Any</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <button type="submit">Find Flatmate</button>
          </form>

          {submitted && (
            <div className="confirmation-message">
              <p>Thank you, {name}! Below are the flatmate profiles that match your preferences.</p>
            </div>
          )}
        </div>

        <div className="matched-flatmates">
          {matches.length > 0 ? (
            <ul>
              {matches.map((match, index) => (
                <li key={index}>
                  <strong>{match.name}</strong> - Location: {match.location}, Budget: ₹{match.budget}/month
                  <p>Smoking: {match.preferences.smoking ? "Yes" : "No"}</p>
                  <p>Pets: {match.preferences.pets ? "Yes" : "No"}</p>
                  <p>Cleanliness: {match.preferences.cleanliness}</p>
                  <button onClick={() => alert(`You have matched with ${match.name}. Contact them!`)}>
                    Contact
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No flatmates match your preferences. Try adjusting your criteria.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default FlatmateFinder;