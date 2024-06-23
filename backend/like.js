
const express = require("express");
const router = express.Router();
const database = require("./database");
const { checkToken } = require("./tokenlogic");
const { ObjectId } = require("mongodb");

router.post("/:id/like", async (req, res) => {
  let contextUser = checkToken(req.headers.token, res);
  if (contextUser == undefined || contextUser.includes("@") == false) {
    return res.json({ success: false });
  }
  const postId = req.params.id;
  const post = await database.findOne("posts", { _id: new ObjectId(postId) });
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }
  console.log("funkcja likowania toggle: " + post);
  /////////////
  if (
    post.likedBy == undefined ||
    post.likedBy == null ||
    post.likedBy.length == 0
  ) {
    post.likedBy = [];
  }
  post.likes = post.likes == null ? 0 : post.likes;

  if (post.likedBy.indexOf(contextUser) != -1) {
    let likedByUpdated = [];
    [...post.likedBy].forEach((user) => {
      if (user != contextUser) {
        likedByUpdated.push(user);
      }
    });

    console.log("post.likedBy: " + JSON.stringify(likedByUpdated));
    await database.updateItem(
      "posts",
      { _id: new ObjectId(postId) },
      { $set: { likes: post.likes - 1, likedBy: likedByUpdated } }
    );
  } else {
    await database.updateItem(
      "posts",
      { _id: new ObjectId(postId) },
      {
        $set: {
          likes: post.likes + 1,
          likedBy: [...post.likedBy, contextUser],
        },
      }
    );
  }
  const postUpdated = await database.findOne("posts", {
    _id: new ObjectId(postId),
  });

  return res.json({ success: true, post: postUpdated });
  /////////////
});

module.exports = router;

