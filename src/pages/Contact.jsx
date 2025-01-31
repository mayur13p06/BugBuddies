import React from 'react';
import '../Styling/SuccessStories.css';
import Footer from '../Components/Footer';

function SuccessStories() {
  return (
    <div>
      <div className="success-stories-page">
      <div className="success-stories-container">
        <div className="success-stories-header">
          <h1>Our Success Stories</h1>
          <p>Here are some of the incredible events we've conducted and the impact they've made.</p>
          <div className="stories-list">
            <div className="story">
              <h2>Hackathon 2023</h2>
              <p>We organized a 24-hour hackathon where over 200 participants showcased their skills, leading to the creation of innovative projects. Several teams secured internships and funding for their ideas.</p>
            </div>
            <div className="story">
              <h2>Startup Bootcamp</h2>
              <p>This event helped budding entrepreneurs refine their business strategies. Over 15 startups received mentorship and funding opportunities.</p>
            </div>
            <div className="story">
              <h2>AI & ML Workshop</h2>
              <p>An intensive workshop that introduced over 500 students to AI and machine learning, equipping them with practical skills and hands-on experience.</p>
            </div>
            <div className="story">
              <h2>Women in Tech Summit</h2>
              <p>A special event dedicated to empowering women in technology, featuring industry leaders and inspiring career stories.</p>
            </div>
            <div className="story">
              <h2>Cybersecurity Awareness Campaign</h2>
              <p>Educated students and professionals about the importance of cybersecurity through live demonstrations and expert panels.</p>
            </div>
          </div>
        
        </div>
      </div>
     
    </div>
    <Footer/>
    </div>
  );
}

export default SuccessStories;
