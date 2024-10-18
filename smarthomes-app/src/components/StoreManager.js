import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StoreManager = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: 'smart doorbell',
    accessories: '',
    image: '',
    discount: '',
    rebate: '',
    warranty: 0,
    stock: 0
  });
  const [editProduct, setEditProduct] = useState(null);

  // Fetch all products when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products from API
  const fetchProducts = () => {
    axios.get('http://localhost:3001/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  // Add a new product
  const handleAddProduct = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/products', newProduct)
      .then(response => {
        alert('Product added successfully');
        fetchProducts(); // Refresh the product list
        setNewProduct({
          name: '',
          price: '',
          description: '',
          category: 'smart doorbell',
          accessories: '',
          image: '',
          discount: '',
          rebate: '',
          warranty: 0,
          stock: 0
        });
      })
      .catch(error => {
        console.error('Error adding product:', error);
      });
  };

  // Update product
  const handleUpdateProduct = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/products/${editProduct.id}`, editProduct)
      .then(response => {
        alert('Product updated successfully');
        fetchProducts();
        setEditProduct(null); // Reset the edit form
      })
      .catch(error => {
        console.error('Error updating product:', error);
      });
  };

  // Delete product
  const handleDeleteProduct = (id) => {
    axios.delete(`http://localhost:3001/products/${id}`)
      .then(response => {
        alert('Product deleted successfully');
        fetchProducts(); // Refresh the product list
      })
      .catch(error => {
        console.error('Error deleting product:', error);
      });
  };

  // Handle input change for adding and updating products
  const handleInputChange = (e, isEdit = false) => {
    const { name, value } = e.target;
    if (isEdit) {
      setEditProduct({ ...editProduct, [name]: value });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  return (
    <div className="container mt-5">
      <h1>Store Manager Dashboard</h1>
      <p>Here you can Add, Update, or Delete products.</p>

      {/* Add Product Form */}
      <form onSubmit={handleAddProduct} className="mb-4">
        <h3>Add New Product</h3>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Product Name"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Price"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Description"
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <select
            className="form-select"
            name="category"
            value={newProduct.category}
            onChange={handleInputChange}
            required
          >
            <option value="smart doorbell">Smart Doorbell</option>
            <option value="smart doorlock">Smart Doorlock</option>
            <option value="smart lighting">Smart Lighting</option>
            <option value="smart speaker">Smart Speaker</option>
            <option value="smart thermostat">Smart Thermostat</option>
          </select>
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Accessories"
            name="accessories"
            value={newProduct.accessories}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Image URL"
            name="image"
            value={newProduct.image}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Discount"
            name="discount"
            value={newProduct.discount}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Rebate"
            name="rebate"
            value={newProduct.rebate}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <select
            className="form-select"
            name="warranty"
            value={newProduct.warranty}
            onChange={handleInputChange}
          >
            <option value="0">No Warranty</option>
            <option value="1">Warranty Included</option>
          </select>
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Stock"
            name="stock"
            value={newProduct.stock}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>

      {/* Update Product Form (Only if editing a product) */}
      {editProduct && (
        <form onSubmit={handleUpdateProduct} className="mb-4">
          <h3>Update Product</h3>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Product Name"
              name="name"
              value={editProduct.name}
              onChange={(e) => handleInputChange(e, true)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Price"
              name="price"
              value={editProduct.price}
              onChange={(e) => handleInputChange(e, true)}
              required
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Description"
              name="description"
              value={editProduct.description}
              onChange={(e) => handleInputChange(e, true)}
            />
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              name="category"
              value={editProduct.category}
              onChange={(e) => handleInputChange(e, true)}
              required
            >
              <option value="smart doorbell">Smart Doorbell</option>
              <option value="smart doorlock">Smart Doorlock</option>
              <option value="smart lighting">Smart Lighting</option>
              <option value="smart speaker">Smart Speaker</option>
              <option value="smart thermostat">Smart Thermostat</option>
            </select>
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Accessories"
              name="accessories"
              value={editProduct.accessories}
              onChange={(e) => handleInputChange(e, true)}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Image URL"
              name="image"
              value={editProduct.image}
              onChange={(e) => handleInputChange(e, true)}
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Discount"
              name="discount"
              value={editProduct.discount}
              onChange={(e) => handleInputChange(e, true)}
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Rebate"
              name="rebate"
              value={editProduct.rebate}
              onChange={(e) => handleInputChange(e, true)}
            />
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              name="warranty"
              value={editProduct.warranty}
              onChange={(e) => handleInputChange(e, true)}
            >
              <option value="0">No Warranty</option>
              <option value="1">Warranty Included</option>
            </select>
          </div>
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Stock"
              name="stock"
              value={editProduct.stock}
              onChange={(e) => handleInputChange(e, true)}
            />
          </div>
          <button type="submit" className="btn btn-warning">Update Product</button>
        </form>
      )}

      {/* Product List Table */}
      <h3>Product List</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Accessories</th>
            <th>Discount</th>
            <th>Rebate</th>
            <th>Warranty</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>{product.category}</td>
              <td>{product.accessories}</td>
              <td>{product.discount}</td>
              <td>{product.rebate}</td>
              <td>{product.warranty === 1 ? 'Yes' : 'No'}</td>
              <td>{product.stock}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => setEditProduct(product)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StoreManager;