const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: { type: String, required: true, maxlength: 500 },
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model('Comment', commentSchema);

// API Endpoints
app.post('/comments', (req, res) => {
  const { postId, userId, text } = req.body;
  const newComment = new Comment({ postId, userId, text });
  newComment.save()
    .then(comment => res.status(201).send(comment))
    .catch(err => res.status(500).send(err));
});

app.put('/comments/:id', (req, res) => {
  const { text } = req.body;
  Comment.findByIdAndUpdate(req.params.id, { text }, { new: true })
    .then(comment => res.send(comment))
    .catch(err => res.status(500).send(err));
});

app.delete('/comments/:id', (req, res) => {
  Comment.findByIdAndDelete(req.params.id)
    .then(result => res.send({ message: 'Comment deleted' }))
    .catch(err => res.status(500).send(err));