app.delete('/my-posts/:id', (req, res) => {
  // Verify user owns the post
  Post.findOneAndDelete({ _id: req.params.id, userId: req.user._id })
    .then(() => res.send({ message: 'Your post has been deleted' }))
    .catch(err => res.status(500).send(err));
});

const DatabaseController = require('./database');

const User = ./database.model('User', userSchema);
const checkAdminRole = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send('Authentication required'); // User not logged in
  }

  User.findById(req.user.id, (err, user) => {
    if (err) {
      return res.status(500).send('Error checking user permissions');
    }
    if (!user) {
      return res.status(404).send('User not found');
    }
    if (user.role !== 'admin') {
      return res.status(403).send('You do not have permission to perform this action');
    }
    next(); // User is an admin, proceed to the next middleware
  });
};
const express = require('express');
const app = express();


app.delete('/posts/:id', checkAdminRole, (req, res) => {
  Post.findByIdAndRemove(req.params.id)
    .then(() => res.send({ message: 'Post deleted' }))
    .catch(err => res.status(500).send(err));
});
