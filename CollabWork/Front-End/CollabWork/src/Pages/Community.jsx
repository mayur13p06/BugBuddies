import React, { useState } from "react";
import Footer from "../Components/Footer";
import "../Styling/Community.css"; // Ensure the CSS file is properly linked

function Community() {
  const initialCompanies = [
    {
      name: "TechInnovate Ltd.",
      description: "Specializes in AI-driven software solutions and innovations.",
      rating: 4,
      domain: "Technology",
      minDuration: 6,
      maxDuration: 12,
    },
    {
      name: "GreenHarvest Corp.",
      description: "Focused on sustainable agriculture and eco-friendly practices.",
      rating: 5,
      domain: "Agriculture",
      minDuration: 3,
      maxDuration: 12,
    },
    {
      name: "BuildCraft Solutions",
      description: "Leading provider of construction management tools.",
      rating: 3,
      domain: "Construction",
      minDuration: 2,
      maxDuration: 6,
    },
    {
      name: "HealthTrack Inc.",
      description: "Pioneers in healthcare monitoring and data analytics.",
      rating: 4,
      domain: "Healthcare",
      minDuration: 3,
      maxDuration: 9,
    },
    {
      name: "EcoEnergy Co.",
      description: "Provides renewable energy solutions worldwide.",
      rating: 5,
      domain: "Energy",
      minDuration: 4,
      maxDuration: 10,
    },
    {
      name: "Google",
      description: "Business, Development, Global Company",
      rating: 5,
      domain: "Technology",
      minDuration: 4,
      maxDuration: 10,
    },
  ];

  const [companies, setCompanies] = useState(initialCompanies);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    domain: "",
    minRating: 0,
    minDuration: 1, // Ensuring minimum duration starts from 1
    maxDuration: Infinity,
  });

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const filteredValue = value < 1 ? 1 : value; // Ensuring value is at least 1
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: name.includes("Duration") ? Number(filteredValue) : value,
    }));
  };

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDomain =
      !filters.domain || company.domain.toLowerCase().includes(filters.domain.toLowerCase());
    const matchesRating = company.rating >= filters.minRating;
    const matchesDuration =
      company.minDuration >= filters.minDuration &&
      company.maxDuration <= filters.maxDuration;

    return matchesSearch && matchesDomain && matchesRating && matchesDuration;
  });

  return (
    <div className="community-container">
      {/* Search Bar Section */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search for companies..."
          className="search-input"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className="content">
        <div className="content-wrapper">
          {/* Filters Section */}
          <div className="filter-section">
            <h3>Filters</h3>

            <label>Domain</label>
            <input
              type="text"
              placeholder="Enter domain..."
              name="domain"
              className="filter-input"
              value={filters.domain}
              onChange={handleFilterChange}
            />

            <label>Minimum Rating</label>
            <input
              type="number"
              placeholder="Enter rating (1-5)"
              name="minRating"
              className="filter-input"
              value={filters.minRating}
              onChange={handleFilterChange}
              min="0"
              max="5"
            />

            <label>Project Duration</label><br />

            <label>Minimum Duration (months)</label>
            <input
              type="number"
              placeholder="e.g., 2"
              name="minDuration"
              className="filter-input"
              value={filters.minDuration}
              onChange={handleFilterChange}
            />

            <label>Maximum Duration (months)</label>
            <input
              type="number"
              placeholder="e.g., 12"
              name="maxDuration"
              className="filter-input"
              value={filters.maxDuration}
              onChange={handleFilterChange}
            />
          </div>

          {/* Company Cards Section */}
          <div className="community-section">
            <h2>Top Companies Seeking Collaborators</h2>
            <div className="card-list">
              {filteredCompanies.length > 0 ? (
                filteredCompanies.map((company, index) => (
                  <div key={index} className="card">
                    <h3>{company.name}</h3>
                    <p>{company.description}</p>
                    <p>Domain: {company.domain}</p>
                    <p>Rating: {"⭐".repeat(company.rating)}</p>
                    <p>
                      Duration: {company.minDuration} - {company.maxDuration} months
                    </p>
                    <button className="apply-button">Apply Now</button>
                  </div>
                ))
              ) : (
                <p>No companies match the filters.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Community;
