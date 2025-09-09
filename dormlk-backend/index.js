const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const messageRoutes = require('./routes/messageRoutes');
const messageReplyRoutes = require('./routes/messageReplyRoutes');
const commentRoutes = require('./routes/commentRoutes');
const adminRoutes = require('./routes/adminRoutes')

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;
app.use(cors( {
    origin: ["https://dormlk-frontend-1anh.vercel.app", "https://dorm.lk"],
    methods: ["POST", "GET", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true
}))
app.get('/', (req, res) => {
    res.send('Hello, World!');
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
