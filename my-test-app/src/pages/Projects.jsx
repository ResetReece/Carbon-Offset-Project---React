import { useState } from "react";
import "../App.css";
import Nav from "../Components/nav";
import Footer from "../Components/footer";
import rainforest from "../assets/images/rainforrest.png";
import windFarm from "../assets/images/wind-farm.png";
import wetland from "../assets/images/wetland-restoration.png";
import solarFarm from "../assets/images/solar-farm.png";
import reforestation from "../assets/images/reforrestation-project.png";

const projects = [
  {
    id: 0,
    title: "Rainforest Conservation",
    image: rainforest,
    description: "Protecting Amazon rainforests from deforestation through land acquisition and community partnerships. Each hectare preserved stores significant carbon and supports biodiversity.",
    color: "#27ae60"
  },
  {
    id: 1,
    title: "Wind Energy Initiative",
    image: windFarm,
    description: "Funding large-scale wind farms across developing nations. Each megawatt of wind power replaces fossil fuels and prevents thousands of tons of CO2 emissions annually.",
    color: "#3498db"
  },
  {
    id: 2,
    title: "Wetland Restoration",
    image: wetland,
    description: "Restoring coastal wetlands and marshes that naturally sequester carbon. Wetlands are among nature\"s most effective carbon sinks while providing critical habitat.",
    color: "#16a085"
  },
  {
    id: 3,
    title: "Renewable Solar Farms",
    image: solarFarm,
    description: "Building solar energy infrastructure in communities without reliable electricity. These farms reduce reliance on diesel generators and coal power while providing clean energy access.",
    color: "#f39c12"
  },
  {
    id: 4,
    title: "Reforestation Program",
    image: reforestation,
    description: "Planting millions of native trees in degraded lands across Africa and Southeast Asia. Trees capture atmospheric carbon while restoring ecosystems and providing livelihoods for local communities.",
    color: "#52b788"
  }
];

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? projects.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === projects.length - 1 ? 0 : prevIndex + 1));
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="page">
      <Nav />

      <div className="title-box projects-title">
        <h1 className="company-name">Our Projects</h1>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2 className="section-subtitle" style={{ textAlign: "center", fontSize: "2em" }}>
          Discover Our Projects
        </h2>
      </div>

      <div className="projects-section">
        <div className="carousel-container">
          <button className="carousel-arrow" id="prevBtn" onClick={handlePrev}>
            ❮
          </button>
          <div className="carousel" id="projectCarousel">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`project-card ${index === currentIndex ? "active" : ""}`}
                style={{ backgroundColor: project.color }}
              >
                <img src={project.image} alt={project.title} className="project-image" />
                <div className="project-label">{project.title}</div>
                <div className="project-overlay">
                  <div className="project-title">{project.title}</div>
                  <div className="project-description">{project.description}</div>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-arrow" id="nextBtn" onClick={handleNext}>
            ❯
          </button>
        </div>

        <div className="carousel-dot-container" id="dotContainer">
          {projects.map((project, index) => (
            <span
              key={index}
              className={`carousel-dot ${index === currentIndex ? "active" : ""}`}
              data-index={index}
              onClick={() => handleDotClick(index)}
            ></span>
          ))}
        </div>
      </div>

      <h2 className="section-subtitle">Why These Projects?</h2>

      <div className="left-content-box">
        <h3>Environmental Impact</h3>
        <p>
          We selected these projects for their proven ability to sequester carbon and combat climate change. Each initiative has been carefully vetted to ensure maximum environmental impact and measurable results in reducing greenhouse gas emissions.
        </p>
      </div>

      <div className="right-content-box">
        <h3>Community & Sustainability</h3>
        <p>
          Beyond carbon reduction, our projects support local communities and promote long-term sustainability. We believe in creating lasting positive change that benefits both the planet and the people who call it home.
        </p>
      </div>

      <div className="left-content-box">
        <h3>Proven Track Record</h3>
        <p>
          Our partner organisations have decades of experience implementing successful carbon offset initiatives. With transparent reporting and rigorous monitoring, we ensure every dollar invested delivers measurable climate action and lasting environmental benefits.
        </p>
      </div>

      <div className="right-content-box">
        <h3>Global Reach & Local Action</h3>
        <p>
          From tropical rainforests to renewable energy farms, our projects span the globe. We work with local communities and organisations who understand their regions best, ensuring projects are culturally appropriate and environmentally effective.
        </p>
      </div>

      <Footer />
    </div>
  );
}
