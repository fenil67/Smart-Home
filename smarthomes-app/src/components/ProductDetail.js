import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();  // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);  // State to hold reviews
  const [accessories, setAccessories] = useState([]);  // State to hold accessories
  const [loading, setLoading] = useState(true);  // Loading state
  const navigate = useNavigate();  // For navigation

  useEffect(() => {
    // Fetch the product details by ID
    axios.get(`http://localhost:3001/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);  // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
        setLoading(false);  // Set loading to false even in case of an error
      });

    // Fetch accessories for the product
    axios.get(`http://localhost:3001/accessories?productId=${parseInt(id)}`)
      .then((response) => {
        setAccessories(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error('Error fetching accessories:', error);
      });

    // Fetch reviews for the product
    axios.get(`http://localhost:3001/reviews?productId=${parseInt(id)}`)
      .then((response) => {
        setReviews(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;  // Show loading while data is being fetched
  }

  if (!product) {
    return <div>Product not found</div>;  // If product is not found
  }

  const handleWriteReview = () => {
    // Navigate to review form page with product details
    navigate(`/write-review/${id}`, { state: { product, productId: id } });
  };

  return (
    <div className="container mt-4">
      <div className="card mb-4">
        <div className="card-body">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          {product.discount && <p><strong>Discount:</strong> ${product.discount}</p>}
          {product.rebate && <p><strong>Manufacturer Rebate:</strong> ${product.rebate}</p>}
          {product.warranty && <p><strong>Warranty:</strong> Yes, this product includes a warranty.</p>}
          {/* <img src={product.image} alt={product.name} className="img-fluid mt-3" /> */}
          <button className="btn btn-primary mt-3" onClick={handleWriteReview}>
            Write a Review
          </button>
        </div>
      </div>

      {/* Accessories Section */}
      <div className="mt-4">
        <h3>Accessories</h3>
        {accessories.length === 0 ? (
          <p>No accessories available for this product.</p>
        ) : (
          <div className="row">
            {accessories.map((accessory) => (
              <div className="col-md-4 mb-4" key={accessory.id}>
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{accessory.name}</h5>
                    <p className="card-text">{accessory.description}</p>
                    <p className="card-text"><strong>Price:</strong> ${accessory.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review Section */}
      <div className="mt-5">
        <h3>Customer Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to write a review!</p>
        ) : (
          <div className="row">
            {reviews.map((review) => (
              <div className="col-md-4 mb-4" key={review._id}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Rating: {review.reviewRating}/5</h5>
                    <h6 className="card-subtitle mb-2 text-muted">By {review.userOccupation}, {review.userAge} years old</h6>
                    <p className="card-text">{review.reviewText}</p>
                    <p className="card-text"><strong>Reviewed on:</strong> {new Date(review.reviewDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;