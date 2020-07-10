const blogRouter = require('express').Router();
const Blog = require('../models/blog');

/* All route handlers reside here.

*/

//--GET REQUEST FOR ALL BLOG POSTS
blogRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});
//----------------------------

//--POST REQUEST A SINGLE BLOG POST
blogRouter.post('/', (request, response) => {
  console.log(request.body);
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});
//----------------------------

module.exports = blogRouter;
