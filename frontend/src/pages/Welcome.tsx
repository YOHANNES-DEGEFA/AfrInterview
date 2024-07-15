import "./Welcome.css";

const Welcome: React.FC = () => {
  return (
    <div>
      <header className="hero">
        <div className="hero-content">
          <h1>Welcome to AfriInterview</h1>
          <p>
            Empowering African talent through personalized mock interviews and
            professional guidance. Elevate your interview skills, boost your
            confidence, and land your dream job!
          </p>
          <button className="cta-button">Get Started</button>
        </div>
        <div className="hero-image">
          <img src="/ai.jpg" alt="Professional Interview" />
        </div>
      </header>
    </div>
  );
};

export default Welcome;
