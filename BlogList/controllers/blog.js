//--Creating a Router and Importing a Model-----------------
const blogRouter = require('express').Router();

const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

//----------------------------------------------------------

//--GET REQUEST HANDLER ALL BLOGS---------------------------
blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  });

  response.json(blogs);
});

//----------------------------------------------------------

//--GET REQUEST HANDLER *SINGLE* BLOG---------------------------
blogRouter.get('/:id', async (request, response) => {
  const result = await Blog.findById(request.params.id);
  response.json(result);
});

//----------------------------------------------------------

//--POST REQUEST HANDLER SINGLE BLOG------------------------
blogRouter.post('/', async (request, response) => {
  const { body } = request;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    ...body,
    likes: body.likes || 0,
    user: user._id,
  });

  if (!blog.title || !blog.url) {
    response.status(400).end();
  } else {
    const savedBlog = await blog.save();
    if (user.blogs.length < 1) {
      user.blogs = [savedBlog._id];
    } else if (user.blogs.length < 2) {
      user.blogs = [user.blogs, savedBlog._id];
    } else {
      user.blogs = [...user.blogs, savedBlog._id];
    }
    await user.save();
    response.json(savedBlog);
  }
});
//----------------------------------------------------------

//--PUT REQUEST, UPDATE SINGLE BLOG------------------------
blogRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body;
  const newBlog = { title, author, url, likes: likes || 0 };
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, {
    new: true,
  });
  if (!newBlog.title || !newBlog.url) {
    response.status(400).end();
  } else {
    response.json(updatedBlog);
  }
});

//----------------------------------------------------------
const getTokenFrom = (request, response, next) => {
  const authorization = request.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return;
};
//--DELETE REQUEST HANDLER *SINGLE* BLOG---------------------------
blogRouter.delete('/:id', async (request, response) => {
  const token = getTokenFrom(request);
  console.log('***TOKEN variable***', token);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  console.log('__DECODED TOKEN__', decodedToken);
  console.log('__ID OF BLOG POST__', request.params.id);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);
  console.log('USER FOUND______', user);
  if (user._id === decodedToken.id) {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } else {
    response.status(401).json({ error: 'NO DELETING! NOT YOURS' });
  }
});
//----------------------------------------------------------

module.exports = blogRouter;
