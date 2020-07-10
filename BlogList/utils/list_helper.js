const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let totalLikes = 0;
  blogs.map((blog) => (totalLikes += Number(blog.likes)));
  return totalLikes;
};

const favoriteBlog = (blogs) => {
  let highestLikes = 0;
  blogs.map((blog) => {
    blog.likes > highestLikes ? (highestLikes = blog.likes) : null;
  });
  const favorite = blogs.find((blog) => blog.likes === highestLikes);
  const { title, author, likes } = favorite;
  return {
    title,
    author,
    likes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
