import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Nav from '../Components/nav';
import Footer from '../Components/footer';

export default function Products() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleBack = () => {
    if (selectedCategory) {
      setSelectedCategory(null);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="page">
      <nav></nav>
    
      <div className="title-box products-title">
        <h1 className="company-name">Our Products</h1>
      </div>

      <div className="products-content">
        <div className="subheading">Find the perfect plan for you</div>

        <div className="buttons-container">
          <button
            className="plan-button"
            id="button1"
            onClick={() => handleCategorySelect('individuals')}
          >
            Individuals
          </button>
          <button
            className="plan-button"
            id="button2"
            onClick={() => handleCategorySelect('businesses')}
          >
            Businesses
          </button>
          <button
            className="plan-button"
            id="button3"
            onClick={() => handleCategorySelect('events')}
          >
            Events
          </button>
        </div>

        <button className="back-button" id="backBtn" onClick={handleBack}>
          ← Back
        </button>
      </div>

      <footer></footer>
    </div>
  );
}
