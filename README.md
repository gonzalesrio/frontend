# Blue Tech E-commerce Platform

## Project Structure
- `backend/` - Express.js API server with MongoDB
- `frontend/` - Static HTML/CSS/JavaScript client
- `Procfile` - For Render deployment
- `render.yaml` - Render configuration
- `netlify.toml` - Netlify configuration

## Deployment Options

### Netlify Deployment
1. Connect your GitHub repository to Netlify
2. Build command: `npm install --prefix backend && npm install --prefix frontend`
3. Publish directory: `frontend`
4. The backend runs as serverless functions under `/.netlify/functions/`

### Render Deployment
1. Connect your GitHub repository to Render
2. Set `MONGO_URI` environment variable
3. The app will auto-deploy using Procfile

## Local Development

### Backend
```bash
cd backend
npm install
npm start
```
Server runs on `http://localhost:5000`

### Frontend
Open `frontend/index.html` in your browser or serve with a local server:
```bash
cd frontend
python -m http.server 8000  # or any static server
```

## API Endpoints
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)
- `GET /api/users` - Get all users (admin)
- `POST /api/orders` - Create order

## Environment Variables
Create a `.env` file in the `backend/` directory:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
PORT=5000
```

## Technologies
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Deployment**: Render, Netlify, Docker
