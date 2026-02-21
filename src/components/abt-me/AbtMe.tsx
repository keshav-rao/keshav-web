import profilePic from '../../images/Profile pic.png';
import './AbtMe.css';

const AbtMe = () => {
    return (
        <section id="story" className="about-section">

            <div className="about-container">
                <div className="about-profile-wrapper">
                    <div className="about-image-container">
                        <img src={profilePic.src} alt="Profile" className="about-profile-img" />
                    </div>
                    <div className="about-dot"></div>
                </div>

                <div className="about-grid">
                    <div className="about-content-left">
                        <h2 className="about-heading">
                            The story behind <br />
                            <span className="brand-name">Keshav</span>
                        </h2>
                    </div>
                    <div className="about-content-right">
                        <p className="about-text">
                            Research Trainee and Freelance Web Developer with experience in technical content creation and web
                            application development using React, Node.js, and AI automation tools. Skilled in API integration,
                            database-backed systems, TensorFlow model optimization, and production website delivery. Combines
                            software development skills with applied AI and automation experience.

                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AbtMe;
