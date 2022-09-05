const blog = require('../model/blog');

const blogController = {
    postblogData: async (req, res) => {
        try {

            const { title, details
            
            } = req.body;

            const blogData = new blog({
                title: title, details: details,
                userId: req.params.id
            })

            await blogData.save()

            return res.status(201).json({
                success: true,
                message: "blog created successful",
                data: blogData
            });

        } catch (error) {
            return res.status(412).send({
                success: false,
                message: error.message
            })
        }
    },
    getblogData: async (req, res) => {
        const blogs = await blog.find({userId: req.params.id}).sort({createdAt: -1});
        res.json(blogs)
    },
    allblogs: async (req, res) => {
        const blogs = await blog.find().sort({createdAt: -1}).populate({
            path: "userId",
            model:  "User"
        });
        res.json(blogs)
    },
    getSingleBlog: async (req, res) => {

        const SingleBlogData = await blog.findById({ _id: req.params.id })

        res.json(SingleBlogData)
    },

    updateSingleBlog: async (req, res) => {
        const update = await blog.findByIdAndUpdate({ _id: req.params.id }, { title: req.body.blog.title, details: req.body.blog.details })
        res.json({ status: 200, update })
    },
    deleteBlog: async (req, res) => {
        await blog.findByIdAndDelete({ _id: req.params.id });
        res.json({ msg: 'blog deleted' })
    }
}

module.exports = blogController;