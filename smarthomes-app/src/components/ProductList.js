import React from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const categories = [
    {
      id: 1,
      name: 'Smart Doorbells',
      description: 'Enhance the security of your home with our advanced smart doorbells.',
      link: '/products/doorbells'
    },
    {
      id: 2,
      name: 'Smart Doorlocks',
      description: 'Smart doorlocks with keyless entry for improved safety and convenience.',
      link: '/products/doorlocks'
    },
    {
      id: 3,
      name: 'Smart Speakers',
      description: 'Voice-controlled smart speakers with built-in assistant.',
      link: '/products/speakers'
    },
    {
      id: 4,
      name: 'Smart Lightings',
      description: 'Smart lightings with customizable brightness and color settings.',
      link: '/products/lightings'
    },
    {
      id: 5,
      name: 'Smart Thermostats',
      description: 'Smart thermostats for optimal home temperature control.',
      link: '/products/thermostats'
    },
  ];

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Product Categories</h2>
      <div className="row">
        {categories.map(category => (
          <div className="col-md-4 mb-4" key={category.id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{category.name}</h5>
                <p className="card-text">{category.description}</p>
                {/* Use Link to redirect to respective category */}
                <Link to={category.link} className="btn btn-primary">
                  Shop {category.name}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;