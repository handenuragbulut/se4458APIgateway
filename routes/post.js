const express = require('express');
const Post = require('../models/post');
const router = express.Router();

router.post('/', async (req, res) => {
    const { title, content } = req.body;
    try {
        const post = new Post({ title, content });
        await post.save();
        res.status(201).send(post);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.send(posts);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send({ error: 'Post not found' });
        }
        res.send(post);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { title, content } = req.body;
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
        if (!post) {
            return res.status(404).send({ error: 'Post not found' });
        }
        res.send(post);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).send({ error: 'Post not found' });
        }
        res.send({ message: 'Post deleted successfully!' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = router;
