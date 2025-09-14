const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const messageRoutes = require('./routes/messageRoutes');
const messageReplyRoutes = require('./routes/messageReplyRoutes');
const commentRoutes = require('./routes/commentRoutes');
const adminRoutes = require('./routes/adminRoutes')
const app = express();
const port = 3000;

app.use(cors({
  origin: ["https://dormlk-frontend-1anh.vercel.app", "https://dorm.lk"],
  methods: ["POST", "GET", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true
}));

// helmet security headers
app.use(helmet());

// strict content security Policy
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "default-src": ["'self'"],
      "script-src": [
        "'self'",
        "https://dormlk-frontend-1anh.vercel.app"
      ],
      "style-src": [
        "'self'",
        "https://fonts.googleapis.com" 
        
      ],
      "font-src": [
        "'self'",
        "https://fonts.gstatic.com",
        "data:"
      ],
      "img-src": [
        "'self'",
        "data:",
        "https://dormlk-frontend-1anh.vercel.app"
      ],
      "connect-src": [   //Added (fixes CSP fallback issue)
        "'self'",
        "https://dormlk-frontend-1anh.vercel.app",
        "https://dorm.lk"
      ],
      "object-src": ["'none'"],
      "frame-ancestors": ["'self'"],
      "form-action": ["'self'"],
      "base-uri": ["'self'"],
      "upgrade-insecure-requests": []
    }
  })
);

app.use(express.json());

//test route
app.get('/', (req, res) => {
  res.send('CSP Header Enabled');
});
// Robots.txt and Sitemap.xml routes
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send("User-agent: *\nDisallow:");
});

app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml');
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`);
});


// Connect to MongoDB
mongoose.connect(process.env.NONGO_URL).then(()=>{
    console.log("Database Connected Succesfully..");
}).catch((err)=>{
    console.log(err);
})

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/replies', messageReplyRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/admin',adminRoutes );

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
