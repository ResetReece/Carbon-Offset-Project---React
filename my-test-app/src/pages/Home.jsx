import "../App.css";
import Nav from "../Components/nav";
import Footer from "../Components/footer";

export default function Home() {
  return (
    <>
      <Nav />

      <div className="title-box">
        <h1 className="company-name">Rooted Offsets</h1>
        <p className="tagline">Helping You Become More Green</p>
      </div>

      <h2 className="section-subtitle">About Us</h2>

      <div className="left-content-box">
        <p>The Food and Beverage Industry is one of the biggest generators of carbon in the world from production to shipping to retail. Our goal is to work with the industry both as individuals and businesses to help cut these emissions, focus on making the food and beverage sector carbon neutral worldwide and bring a healthy planet to this great industry.</p>
      </div>

      <div className="right-content-box">
        <p>A recent report by JP Morgan stated that Climate Change is so severe now that the human race may not be able to survive on planet earth or at least be living in a very different world in less than a lifetime from now. Time is running out to limit the impending climate catastrophe if it hasn"t run out already.</p>
      </div>

      <div className="left-content-box">
        <p>We believe that there is no more time, as a human race we must vastly increase our efforts to reverse climate change or there won"t be a habitable planet anymore.</p>
      </div>

      <div className="right-content-box">
        <p>We believe technology driven by entrepreneurship and individuals and businesses who see what is happening and going to happen to this planet and are determined to change the course of self destruction our earth is on is the key element to solving this crisis, this philosophy drives our project selection and the redemptions using the Rooted Offsets carbon offsets.</p>
      </div>

      <h2 className="section-subtitle">What We Offer</h2>

      <div className="left-content-box">
        <p>There are steps we can make to help curb greenhouse gas emissions right now, they include not only supporting Greta Thurnberg and other activism, but taking public transport, recycling and carbon offsetting.</p>
      </div>

      <div className="right-content-box">
        <p>Carbon offsets are financial contributions to projects that help reduce Greenhouse Gas emissions in various industries, or encourage new sustainable energy projects in an effort to balance out the damage the human race is doing to the planet.</p>
      </div>

      <div className="left-content-box">
        <p>Every program of Rooted Offsets is validated by either Gold Standard, Earth Sustainability Group, Verified Carbon Standard, Climate Action Reserve, or American Carbon Registry.</p>
      </div>

      <Footer />
    </>
  )
}
