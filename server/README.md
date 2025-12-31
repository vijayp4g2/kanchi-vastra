# Kanchi Vastra Backend Server

This is the backend server for Kanchi Vastra, built with Node.js, Express, and MongoDB.

## Tech Stack
- **Node.js**: Runtime environment
- **Express**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB
- **dotenv**: Environment variable management
- **CORS**: Cross-Origin Resource Sharing

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB installed locally or a MongoDB Atlas URI

### Installation
1. Navigate to the `Server` folder:
   ```bash
   cd Server
   ```
2. Install dependencies (if not already done):
   ```bash
   npm install
   ```

### Configuration
Update the `MONGODB_URI` in the `.env` file with your connection string.

### Running the Server
- Development mode (with nodemon):
  ```bash
  npm run dev
  ```
- Production mode:
  ```bash
  npm start
  ```

## Folder Structure
- `config/`: Database connection and other configurations
- `models/`: Mongoose schemas and models
- `server.js`: Entry point of the application
