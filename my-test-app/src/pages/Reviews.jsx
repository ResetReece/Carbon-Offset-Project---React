import { useState, useMemo } from "react";
import "../App.css";
import Nav from "../Components/nav";
import Footer from "../Components/footer";

const sampleReviews = [
  {
    id: 1,
    author: "John Smith",
    rating: 5,
    text: "Excellent service! My carbon offset contribution made a real difference.",
    date: new Date("2024-01-15")
  },
  {
    id: 2,
    author: "Sarah Johnson",
    rating: 4,
    text: "Great company with a clear mission. Very satisfied with my purchase.",
    date: new Date("2024-01-10")
  },
  {
    id: 3,
    author: "Michael Chen",
    rating: 5,
    text: "Transparent reporting and excellent customer service. Highly recommended!",
    date: new Date("2024-01-05")
  },
  {
    id: 4,
    author: "Emily Rodriguez",
    rating: 3,
    text: "Good initiative, but would like more details about where funds go.",
    date: new Date("2023-12-28")
  },
  {
    id: 5,
    author: "David Williams",
    rating: 5,
    text: "Perfect platform for offsetting my environmental impact. Well done!",
    date: new Date("2023-12-20")
  }
];

export default function Reviews() {
  const [starFilter, setStarFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  const filteredAndSortedReviews = useMemo(() => {
    let filtered = sampleReviews;

    if (starFilter !== "all") {
      filtered = filtered.filter((review) => review.rating === parseInt(starFilter));
    }

    const sorted = [...filtered];
    if (sortOrder === "newest") {
      sorted.sort((a, b) => b.date - a.date);
    } else {
      sorted.sort((a, b) => a.date - b.date);
    }

    return sorted;
  }, [starFilter, sortOrder]);

  return (
    <div className="page">
      <Nav />

      <div className="title-box reviews-title">
        <h1 className="company-name">Customer Reviews</h1>
      </div>

      <div className="reviews-container">
        <div className="filters-section">
          <div className="filter-group">
            <label htmlFor="star-filter">Filter by Stars:</label>
            <select
              id="star-filter"
              value={starFilter}
              onChange={(e) => setStarFilter(e.target.value)}
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="sort-filter">Sort by:</label>
            <select
              id="sort-filter"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        <div id="reviews-list">
          {filteredAndSortedReviews.length > 0 ? (
            <div>
              {filteredAndSortedReviews.map((review) => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <strong>{review.author}</strong>
                    <span className="review-rating">
                      {"⭐".repeat(review.rating)}
                    </span>
                  </div>
                  <p className="review-text">{review.text}</p>
                  <small className="review-date">
                    {review.date.toLocaleDateString()}
                  </small>
                </div>
              ))}
            </div>
          ) : (
            <p>No reviews match your filter. Please try different criteria.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
