const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

//--Defines the Mongoose Schema for new entries

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = Blog = mongoose.model('Blog', blogSchema);
