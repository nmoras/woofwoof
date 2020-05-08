const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let reply = new Schema ({
    userId: {type: String},
    postId: {type: String},
    user: {
        name:{ type: String },
        id: { type: String },
    },
    message: {type: String},
    
},
{
    timestamps: true
});

module.exports = mongoose.model('reply', reply);