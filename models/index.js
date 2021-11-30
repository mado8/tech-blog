const User = require('./User');
const Posts = require('./Posts');
const Comments = require('./Comments');
const PostComments = require('./PostComments');

// Posts belong to User 
Posts.belongsTo(User, {
    foreignKey: 'user_id',
})
// User has many Posts
User.hasMany(Posts, {
    foreignKey: 'user_id',
})
// Comments belong to User
Comments.belongsTo(User, {
    foreignKey: 'user_id',
})
// User has many Comments
User.hasMany(Comments, {
    foreignKey: 'user_id',
})
// Comments belong to Posts through postComments
Comments.belongsTo(Posts, {
    through: {
      model: PostComments,
    },
    as: 'comment_post',
  })
// Posts have many Comments through postComments
Posts.hasMany(Comments, {
    through: {
      model: PostComments,
    },
    as: 'post_comment',
  })

  module.exports = {
    User,
    Posts,
    Comments,
    PostComments,
  };