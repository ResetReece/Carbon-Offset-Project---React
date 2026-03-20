import { useState, useEffect } from 'react';
import '../App.css';
import Nav from '../Components/nav';
import Footer from '../Components/footer';

export default function Company() {

  useEffect(() => {
  }, []);

  return (
    <div className="page">
      <Nav />

      <div className="title-box company-title">
        <h1 className="company-name">About Our Company</h1>
      </div>

      <h2 className="section-subtitle">Who Are We?</h2>

      <div className="left-content-box">
        <p>
          Rooted Offsets is a leading climate action organisation dedicated to combating global carbon emissions through verified and impactful offset solutions. We work across multiple continents with a diverse team of climate scientists, environmental experts, and sustainability professionals. Our mission is to bridge the gap between individual and corporate climate responsibility and real-world environmental change.
        </p>
      </div>

      <div className="right-content-box">
        <p>
          Founded on the principle that climate change requires immediate and scalable action, we partner with verified carbon offset projects that make a measurable difference. From renewable energy initiatives to forest preservation and methane capture, we carefully curate every project to ensure maximum environmental impact. Our commitment to transparency, science-backed solutions, and rigorous project validation has made us a trusted partner for businesses and individuals seeking to neutralize their carbon footprint.
        </p>
      </div>

      <h2 className="section-subtitle">Why Our Work Is Important</h2>

      <div className="left-content-box">
        <p>
          Global carbon emissions have reached alarming levels, with the world emitting over 37 billion metric tons of CO2 annually. The rate of increase continues to accelerate, driven by industrialization, energy production, and transportation. This rapid rise in atmospheric carbon dioxide is the primary driver of climate change, leading to unprecedented global temperatures, extreme weather events, and irreversible damage to ecosystems. Scientists warn that without immediate and drastic reductions, we are headed toward climate scenarios that could make large portions of Earth uninhabitable within this century.
        </p>
      </div>

      <div className="right-content-box">
        <p>
          Carbon offsets represent a critical and pragmatic tool in the fight against climate change. While reducing emissions at the source is essential, carbon offsets provide immediate action by funding projects that either reduce greenhouse gases or remove CO2 from the atmosphere. These projects include renewable energy installations, reforestation initiatives, methane capture, and forest preservation. By investing in carbon offsets through organizations like Rooted Offsets, individuals and businesses can neutralize their emissions while supporting global climate solutions. This creates a bridge to a low-carbon future while we transition away from fossil fuels.
        </p>
      </div>

      <h2 className="section-subtitle">Global Carbon Tracking</h2>

      <div className="left-content-box">
        <p>
          Below are the top 5 countries with the highest CO2 emissions. These figures represent annual greenhouse gas emissions in megatons (Mt) of CO2 equivalent.
        </p>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Rank & Country</th>
            <th>CO2 Emissions (Mt)</th>
            <th>Total Emissions (Tonnes)</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody id="carbon-data">
          {carbonData.map((row) => (
            <tr key={row.rank}>
              <td>{row.rank}. {row.country}</td>
              <td>{row.emissions}</td>
              <td>{row.total}</td>
              <td>{row.year}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Footer />
    </div>
  );
}
