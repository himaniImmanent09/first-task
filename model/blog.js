const mongoose = require('mongoose');
const schema = mongoose.Schema;


const blogSchema = new schema({
    title: {
        type: String,
        required: true    
    }, 
    details: {
        type: String,
        required: true
    }, 
    userId:{
        type:String,
        required:true
    }
},{
    timestamps: true,
})

module.exports = mongoose.model('Blog', blogSchema)