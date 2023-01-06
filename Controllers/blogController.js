const blog = require("../model/blog");
const User = require("../model/user");

const blogController = {
  postblogData: async (req, res) => {
    try {
      const { details } = req.body;
      const _id = req.params.id;

      const user = await User.findById({ _id });

      const blogData = new blog({
        details: details,
        userId: req.params.id,
        username: user.username,
      });

      await blogData.save();

      return res.status(201).json({
        success: true,
        message: "blog created successful",
        data: blogData,
      });
    } catch (error) {
      return res.status(412).send({
        success: false,
        message: error.message,
      });
    }
  },
  getblogData: async (req, res) => {
    const blogs = await blog
      .find({ userId: req.params.id })
      .sort({ createdAt: -1 });
    // .populate({ path: "userId", model: "User" });
    res.json(blogs);
  },
  allblogs: async (req, res) => {
    const blogs = await blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  },
  getSingleBlog: async (req, res) => {
    const SingleBlogData = await blog.findById({ _id: req.params.id });

    res.json(SingleBlogData);
  },
};

module.exports = blogController;
