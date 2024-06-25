const express = require("express");
const router = express.Router();
const database = require("./database");
const { checkToken } = require("./tokenlogic");
const { ObjectId } = require("mongodb");

router.post("/:id/comment", async (req, res) => {
  let contextUser = checkToken(req.headers.token, res);
  if (contextUser == undefined || contextUser.includes("@") == false) {
    return res.json({ success: false });
  }
  const postId = req.params.id;
  const post = await database.findOne("posts", { _id: new ObjectId(postId) });
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }
  if (post.comments == undefined || post.comments == null) {
    post.comments = [];
  }

  await database.updateItem(
    "posts",
    { _id: new ObjectId(postId) },
    {
      $set: {
        comments: [
          ...post.comments,
          { content: req.body.content, authorFullName: contextUser },
        ],
      },
    }
  );

  console.log("Console add function ", req.body.content);

  return res.json({ success: true, post: null });
  /////////////
});

module.exports = router;
