const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (sign up at mongodb.com for free Atlas cluster)
mongoose.connect('mongodb+srv://yourusername:yourpassword@cluster0.mongodb.net/stackdev?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Post Schema
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    date: { type: Date, default: Date.now }
});
const Post = mongoose.model('Post', postSchema);

// API Routes
app.get('/api/posts', async (req, res) => {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
});

app.post('/api/posts', async (req, res) => {
    const { title, content } = req.body;
    const post = new Post({ title, content });
    await post.save();
    res.json(post);
});

app.listen(3000, () => console.log('Server running on port 3000'));