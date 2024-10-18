Here’s an updated `README.md` file based on the changes made during the project. It includes the latest features, API changes, and updates to the setup instructions:

---

# SmartHomes Web Application

This is a full-stack web application for a SmartHome product retailer, where users can browse smart products, leave reviews, and place orders. The backend is built using Node.js, Express, and MySQL for product and order management, and MongoDB for product reviews. The frontend is developed using React, Bootstrap, and features like product listings, reviews, search auto-completion, and trending product data visualization.

## Features

1. **User Roles**:
   - **Customer**: Can browse products, write reviews, place orders, and view past orders.
   - **Salesman**: Can manage customer accounts and customer orders.
   - **Store Manager**: Can manage products, including adding, updating, and deleting products. They can also view inventory and sales reports.

2. **Order Management**:
   - Customers can choose either **home delivery** or **in-store pickup**.
   - Each order includes user details, shipping address, product details, and total price.
   - The stock of products is automatically updated when an order is placed.

3. **Product Reviews**:
   - Customers can submit reviews for products they've purchased.
   - Reviews include ratings, product details, and user feedback.

4. **Trending Page**:
   - Users can view charts for the top 5 most liked products, top 5 zip codes for maximum sales, and top 5 most sold products.

5. **Search Auto-Completion**:
   - When users start typing a product name, search suggestions will appear. Selecting a suggestion will take users directly to that product's detail page.

6. **Inventory and Sales Management**:
   - Store managers can track inventory, update stock quantities, and view sales reports.

7. **Product Sales Chart**:
   - Visual representation of total sales for each product using dynamic Y-axis scaling based on the product sales data.

## Tech Stack

- **Backend**:
  - Node.js
  - Express
  - MySQL (for users, products, orders)
  - MongoDB (for product reviews)

- **Frontend**:
  - React.js
  - Bootstrap
  - Recharts (for data visualization)

## Setup Instructions

### 1. Prerequisites

- Node.js (>= v16)
- MySQL (>= v8.0)
- MongoDB (>= v4.0)
- MongoDB Compass (for viewing and managing MongoDB data)
- Git
- npm (or yarn)

### 2. Installation

#### Step 1: Clone the repository
```bash
git clone <repository-url>
cd smarthomes
```

#### Step 2: Backend Setup

1. **Install dependencies** for the backend:
   ```bash
   cd smarthomes-backend
   npm install
   ```

2. **Configure MySQL**:
   - Create a MySQL database named `smarthomes`.
   - Ensure the MySQL tables `users`, `products`, `CustomerOrder`, and `orders` are created. (Schema provided below.)

3. **Configure MongoDB**:
   - Ensure that MongoDB is running and use the `reviews` collection to store product reviews.

4. **Add `.env` file** in `smarthomes-backend/` directory with the following configurations:
   ```
   MYSQL_HOST=localhost
   MYSQL_USER=root
   MYSQL_PASSWORD=<your_mysql_password>
   MYSQL_DATABASE=smarthomes
   MONGO_URI=mongodb://localhost:27017/smartHome
   PORT=3001
   ```

5. **Start the backend server**:
   ```bash
   node server.js
   ```

#### Step 3: Frontend Setup

1. **Install dependencies** for the frontend:
   ```bash
   cd ../smarthomes-frontend
   npm install
   ```

2. **Start the frontend server**:
   ```bash
   npm start
   ```

   The frontend will run at `http://localhost:3000`.

### 3. Database Setup

#### MySQL Setup

1. **Create MySQL tables**:

   Execute the following commands in your MySQL shell:

   ```sql
   CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       email VARCHAR(255) UNIQUE NOT NULL,
       password VARCHAR(255) NOT NULL,
       role ENUM('customer', 'salesman', 'storeManager') NOT NULL
   );

   CREATE TABLE products (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       price DECIMAL(10, 2) NOT NULL,
       description TEXT,
       category ENUM('smart doorbell', 'smart doorlock', 'smart lighting', 'smart speaker', 'smart thermostat') NOT NULL,
       accessories TEXT,
       image VARCHAR(255),
       discount DECIMAL(10, 2),
       rebate DECIMAL(10, 2),
       warranty TINYINT(1) DEFAULT 0,
       stock INT DEFAULT 0
   );

   CREATE TABLE CustomerOrder (
       orderid INT AUTO_INCREMENT,
       userName VARCHAR(255) NOT NULL,
       orderName VARCHAR(255) NOT NULL,
       orderPrice DECIMAL(10, 2) NOT NULL,
       userAddress TEXT NOT NULL,
       creditCardNo VARCHAR(16) NOT NULL,
       PRIMARY KEY (orderid, userName, orderName)
   );

   CREATE TABLE orders (
       id INT AUTO_INCREMENT PRIMARY KEY,
       user_id INT NOT NULL,
       product_id INT NOT NULL,
       total_price DECIMAL(10, 2) NOT NULL,
       delivery_method ENUM('homeDelivery', 'inStorePickup') NOT NULL,
       store_location VARCHAR(255),
       status ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
       order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       delivery_date DATE NOT NULL,
       store_id INT,
       quantity INT DEFAULT 1,
       CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id),
       CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products(id)
   );

   CREATE TABLE store_locations (
       storeID INT AUTO_INCREMENT PRIMARY KEY,
       street VARCHAR(255) NOT NULL,
       city VARCHAR(255) NOT NULL,
       state VARCHAR(255) NOT NULL,
       zipcode VARCHAR(10) NOT NULL
   );
   ```

2. **Insert sample data**:

   - Populate `users`, `products`, `CustomerOrder`, and `orders` tables with at least 20 entries each.

#### MongoDB Setup

1. **Insert sample reviews**:

   Use MongoDB Compass or the `mongo` shell to insert review data into the `reviews` collection.

   ```json
   {
     "productId": 1,
     "productModelName": "Ring Video Doorbell 3",
     "productCategory": "smart doorbell",
     "productPrice": 199.99,
     "storeID": "Store#1",
     "storeZip": "60616",
     "storeCity": "Chicago",
     "storeState": "IL",
     "productOnSale": true,
     "manufacturerName": "Ring",
     "manufacturerRebate": false,
     "userID": "user001",
     "userAge": 32,
     "userGender": "Male",
     "userOccupation": "Engineer",
     "reviewRating": 5,
     "reviewDate": "2024-09-28T00:00:00Z",
     "reviewText": "Great product, easy to install and use."
   }
   ```

### 4. Usage

#### Frontend:

- Visit `http://localhost:3000` to browse products.
- Use the **Trending** page to view statistics like most sold products and zip codes.
- Write and view product reviews on the product detail pages.
- The **Store Manager** can use the dashboard to manage products, view inventory, and check sales reports.

#### Backend:

- API for fetching product reviews: `GET /reviews?productId={productId}`
- API for placing orders: `POST /place-order`
- API for product search with auto-complete: `GET /autocomplete?q={query}`

### 5. Known Issues

- Ensure the proper version of Node.js and React is used to avoid compatibility issues with hooks.

