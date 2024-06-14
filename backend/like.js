const DatabaseController = require('./database');
postSchema.add({ likes: { type: Number, default: 0 } });

app.post('/posts/:id/like', (req, res) => {
  Post.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } }, { new: true })
    .then(post => res.send(post))
    .catch(err => res.status(500).send(err));
});
