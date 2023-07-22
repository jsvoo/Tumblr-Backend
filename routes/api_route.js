const express = require("express");
const userModel = require("../models/user_md");
const postModel = require("../models/post_md");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const commentModel = require("../models/comments_md");
const followingModel = require("../models/following_md");
const nodemailer = require("nodemailer");
const { response } = require("express");
const rolesModel = require("../models/roles_md");
const post_categoryModel = require("../models/post_categories_md");
const likeModel = require("../models/likes_md");
const veri_code = Math.floor(Math.random() * 1000003);

//MULTER CONFIGURATION FOR FILE UPLOADS
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const __dir = path.join(__dirname, "../public/uploads");
    cb(null, __dir);
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.toLowerCase();
    cb(null, fileName);
  },
});

const upload = multer({ storage });

//POST ROUTES
router.post("/user/create", upload.any(), async (req, res) => {
  req.body.current_verification = veri_code;
  const existingUser = await userModel.findOne({ email: req.body.email });

  if (!existingUser) {
    const user = new userModel(req.body);

    req.files.map((e) => {
      switch (e.fieldname) {
        case "image":
          user.image = e.filename;
          break;
      }
    });
    user.save();
    res.send(user);
  } else {
    res.send("user with email already exists");
  }
});

router.post("/comment/create", async (req, res) => {
  console.log(req.body);
  const comment = await commentModel.create(req.body);
  res.send(comment);
});

router.post("/verify-account/:id", async (req, res) => {
  let user = await userModel.findOne({ _id: req.params.id });
  const code = req.body.verification_code;
  if (!user) {
    console.log("No user found");
  } else {
    if (user.current_verification == code) {
      user.verified_at = new Date().toLocaleString();
    } else {
      console.log("wrong verification code");
    }
  }
  console.log(user);
  user.save();
  res.send(user);
});

router.post("/create-follower", async (req, res) => {
  console.log(req.body);
  const follow = await followingModel.create(req.body);
  res.send(follow);
});
router.post("/user/email", async (req, res) => {
  const email = await userModel.findOne({ email: req.body.email });
  if (email) {
    res.send(true);
  } else {
    res.send(false);
  }
});
router.post("/user/signup/validemail", async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kenneth.itodo.fb@gmail.com",
      pass: "efygpjqvwglvnttx",
    },
  });

  const mailOptions = {
    from: "kenneth.itodo.fb@gmail.com",
    to: req.body.email,
    subject: "Verification Code",
    text:
      "Welcome " + req.body.name + ", Your verification code is " + veri_code,
    html: `<p> Welcome <b>${req.body.name}</b>, Your verification code is ${veri_code} </p>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  res.send({ verification_code: veri_code });
});
router.post("/user/login", async (req, res) => {
  let user = await userModel
    .findOne({ email: req.body.email })
    .populate("role_id", "role");
  if (!user) {
    res.send("user does not exist");
  } else if (user.password !== req.body.password) {
    res.send("incorrect password");
  } else {
    res.send(user);
  }
});

router.post("/create-post-category", async (req, res) => {
  const category = await post_categoryModel.create(req.body);
  res.send(category);
});
router.post("/post/create", upload.any(), (req, res) => {
  // console.log(req.files)
  const post = new postModel(req.body);

  const gallery = [];

  req.files.map((e) => {
    switch (e.fieldname) {
      case "image":
        gallery.push(e.filename);
        break;
    }
  });
  post.image = gallery;

  post.save();
  if (post) {
    res.send("post created successfully");
  } else {
    res.send("failed");
  }

  // res.send("done")
});

router.post("/like", async (req, res) => {
  const existing = await likeModel.find({
    post_id: req.body.post_id,
    likedBy: req.body.likedBy,
  });
  if (!existing.length) {
    const like = await likeModel.create(req.body);
    res.send(like);
    const likedPost = await postModel.find({ _id: like.post_id });
    await postModel.updateOne(
      { _id: like.post_id },
      { ...likedPost, likes: likedPost[0].likes + 1 }
    );
  } else {
    const likedPost = await postModel.find({ _id: req.body.post_id });
    await likeModel.deleteOne({
      post_id: req.body.post_id,
      likedBy: req.body.likedBy,
    });
    await postModel.updateOne(
      { _id: req.body.post_id },
      { ...likedPost, likes: likedPost[0].likes - 1 }
    );
    res.send(false);
  }
});

router.post("/create-role", async (req, res) => {
  const role = await rolesModel.create(req.body);
  res.send(role);
});
//GET ROUTES

router.get("/", (req, res) => {
  res.send("working");
});
router.get("/posts", async (req, res) => {
  const posts = await postModel.find().lean().populate("user_id", "name image");
  const likes = await likeModel.find().lean();
  // const categories = await post_categoryModel.find().lean()
  // const users = await userModel.find().lean()

  // postModel.find().populate('user_id', "name phone")
  //     .then(post => console.log(post))
  //     .catch(err => console.log(err))

  // posts.forEach((post) => {
  //     if (!post.likes) {
  //         post.likes = 0
  //     }

  //     categories.forEach((cat) => {
  //         if (post.post_category_id == cat._id) {
  //             console.log(cat)
  //             post.category = cat.post_category
  //         }
  //     })

  //     users.forEach(user => {
  //         if (post.user_id == user._id) {
  //             post.author = { name: user.name, id: user._id }
  //         }
  //     })
  // })
  // let nLikes=0
  posts.forEach((e) => {
    switch (e.likes) {
      case undefined:
        e.likes = 0;
        break;
      case "":
        e.likes = 0;
        break;
      case null:
        e.likes = 0;
    }

    // likes.forEach(like => {
    //     if (e._id == like.post_id) {
    //         // nLikes += 1
    //         e.likes = e.likes + 1
    //     }

    // })
  });

  res.send(posts);
});
router.get("/users", async (req, res) => {
  const users = await userModel.find().lean().populate("role_id", "role");

  res.send(users);
});

router.get("/user/:id", async (req, res) => {
  const user = await userModel
    .findOne({ _id: req.params.id })
    .populate("role_id", "role");
  res.send(user);
});

router.get("/post/:id", async (req, res) => {
  const post = await postModel
    .findOne({ _id: req.params.id })
    .populate("post_category_id user_id", "name image post_category");
  res.send(post);
});

router.get("/comments", async (req, res) => {
  const comments = await commentModel
    .find()
    .lean()
    .populate("user_id post_id", "name title");
  res.send(comments);
});

router.get("/likes", async (req, res) => {
  const likes = await likeModel
    .find()
    .lean()
    .populate("likedBy post_id", "name title");
  res.send(likes);
});

router.get("/comments/:postId", async (req, res) => {
  const comments = await commentModel
    .find({ post_id: req.params.postId })
    .populate("user_id", "name");
  res.send(comments);
});

router.get("/:postId/likes", async (req, res) => {
  const likes = await likeModel
    .find({ post_id: req.params.postId })
    .populate("likedBy post_id", "name title");
  res.send(likes);
});

router.get("/user/:id/posts", async (req, res) => {
  const posts = await postModel.find({ user_id: req.params.id });
  res.send(posts);
});

router.get("/:postId/like/:user_id", async (req, res) => {
  const like = await likeModel
    .findOne({ post_id: req.params.postId, likedBy: req.params.user_id })
    .populate("likedBy post_id", "name title");
  if (like) {
    res.send(true);
  } else {
    res.send(false);
  }
});

router.get("/posts/categories", async (req, res) => {
  let categories = await post_categoryModel.find().lean();
  res.send(categories);
});
router.get("/roles", async (req, res) => {
  let roles = await rolesModel.find().lean();
  res.send(roles);
});

//UDPDATE ROUTES
router.put("/user", upload.any(), async (req, res) => {
  const body = req.body;
  if (req.files) {
    req.files.map((e) => {
      switch (e.fieldname) {
        case "image":
          body.image = e.filename;
          break;
      }
    });
  }

  await userModel
    .updateOne({ _id: req.body.id }, body)
    .then(async () => res.send({ success: true, data: body }))
    .catch((err) => {
      res.send(err);
    });
});

router.put("/post", upload.any(), async (req, res) => {
  const body = req.body;

  req.files.map((e) => {
    switch (e.fieldname) {
      case "image":
        body.image = e.filename;
        break;
    }
  });
  const post = await postModel.findOne({ _id: body.id });

  if (post) {
    await postModel
      .updateOne({ _id: req.body.id }, body)
      .then(async () => res.send({ success: true, data: body }))
      .catch((err) => {
        res.send(err);
      });
  } else {
    res.send({ success: false, reason: "post not found" });
  }
});

router.put("/comment", async (req, res) => {
  commentModel
    .updateOne({ _id: req.body.id }, req.body)
    .then(async () => {
      let newComment = await commentModel.findOne({ _id: req.body.id });
      if (newComment) {
        res.send({ success: true, data: newComment });
      } else {
        res.send({ success: false, data: "comment not updated" });
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

//DELETE ROUTES

router.delete("/post/:id", async (req, res) => {
  await postModel.findByIdAndDelete({ _id: req.params.id });
  await likeModel.deleteMany({ post_id: req.params.id });
  await commentModel.deleteMany({ post_id: req.params.id });
  res.send("Post deleted successfully");
});

router.delete("/user/:id", async (req, res) => {
  await userModel.findByIdAndDelete({ _id: req.params.id });
  res.send("User deleted successfully");
});

router.delete("/comment/:id", async (req, res) => {
  await commentModel.findByIdAndDelete({ _id: req.params.id });
  res.send("comment deleted successfully");
});







// ADMIN SPECIFIC ROUTES

// GET ADMIN POSTS

router.get("/admin/:adminId/posts", async (req, res) => {
  const { adminId } = req.params; 
 
  if(!adminId){
    res.status(403).json({ code:403, message: "admin Id is required" });
  }else{
    try {
        const adminPosts = await postModel.find({ adminId });
    
        res
          .status(200)
          .json({ code:200, message: "admin posts fetched successfully", data: adminPosts });
      } catch (error) {
        res.status(500).json({ message: "an error occurred" });
      }
  }
 

});



// GET ADMIN USERS

router.get("/admin/:adminId/users", async (req, res) => {
    const { adminId } = req.params; 
   
    if(!adminId){
      res.status(403).json({ code:403, message: "admin Id is required" });
    }else{
      try {
          const adminUsers = await userModel.find({ adminId });
      
          res
            .status(200)
            .json({ code:200, message: "admin users fetched successfully", data: adminUsers });
        } catch (error) {
            console.log(error)
          res.status(500).json({ message: "an error occurred" });
        }
    }
   
  
  });
  





module.exports = router;
