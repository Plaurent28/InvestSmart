{
  "name": "investsmart",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "@headlessui/react": "^2.2.0",
    "@heroicons/react": "^2.1.5",
    "@stripe/react-stripe-js": "^2.8.1",
    "@stripe/stripe-js": "^4.9.0",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.7.7",
    "bcryptjs": "^2.4.3",
    "clsx": "^2.1.1",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.21.1",
    "jsonwebtoken": "^9.0.0",
    "lucide-react": "^0.263.1",
    "mongoose": "^8.8.0",
    "passport": "^0.7.0",
    "passport-google-oauth20": "^2.0.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-icons": "^5.3.0",
    "react-router-dom": "^6.27.0",
    "react-scripts": "5.0.1",
    "recharts": "^2.13.3",
    "stripe": "^17.3.1",
    "tailwind-merge": "^2.5.4"
  },
  "devDependencies": {
    "@babel/plugin-proposal-private-property-in-object": "^7.21.11",
    "@tailwindcss/aspect-ratio": "^0.4.2",
    "@tailwindcss/forms": "^0.5.7",
    "@tailwindcss/typography": "^0.5.10",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.14"
  },
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "client": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}