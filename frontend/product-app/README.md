Project Overview

This project is a Product Dashboard built with React.js that fetches, displays, filters, and sorts product data from an API. The dashboard includes features like pagination, a detailed product view in a modal, search, and filtering by price and popularity.

Table of Contents

Prerequisites
Project Setup
Running the Project
Configuration
Key Components Overview
Common Issues and Troubleshooting
Future Enhancements

1. Prerequisites
   Before setting up the project, ensure you have the following installed:

Node.js (v14 or higher)
npm (v6 or higher)
Git (for cloning the repository) 2. Project Setup
Step 1: Clone the Repository
bash
Copy code
git clone https://github.com/yourusername/product-dashboard.git
cd product-dashboard
Step 2: Install Dependencies
Navigate to the project directory and install the necessary dependencies:

bash
Copy code
npm install
This command will install all the required packages listed in the package.json file.

3. Running the Project
   Development Mode
   To start the project in development mode with hot-reloading:

bash
Copy code
npm start
The application will be available at http://localhost:3000.

Production Build
To create an optimized production build:

bash
Copy code
npm run build
This will generate a build directory with all the production files. You can then deploy these files to your preferred hosting service.

4. Configuration
   The project comes with default configuration settings, but you can customize them as needed:

API Endpoint: The API endpoint for fetching products is specified in the src/App.js file within the axios.get('/api/products') line. Update it to point to your backend or another API source.
Environment Variables: If you need to configure environment variables (e.g., API keys, environment settings), create a .env file in the root directory. Example:
plaintext
Copy code
REACT_APP_API_URL=https://api.yourservice.com/products
Make sure to restart the development server after making changes to the .env file.

5. Key Components Overview
   Here is a brief overview of the key components in the project:

App.js: The main component that handles the entire product dashboard, including data fetching, filtering, searching, sorting, pagination, and displaying product details in a modal.

ProductDetailsModal.js: A component that displays detailed information about a selected product in a modal popup. It shows the product's title, price, popularity, and description.

useState, useEffect: React hooks used for managing state and side effects like data fetching.

axios: A library used for making HTTP requests to fetch the product data from an API.

BrowserRouter, Route, Routes, Link, useParams: Components from react-router-dom used for routing and navigation, though the current setup primarily uses modal and state management for product detail views.

Modal: A component from the react-modal library used for displaying the product details in a modal window.

CSS (App.css): The stylesheet for styling the components and ensuring a consistent layout across the application.



live demo link :  https://mobileproductdashboard.netlify.app/