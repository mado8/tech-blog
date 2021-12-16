const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const PostComment = require('./PostComment');

// Posts belong to User 
Post.belongsTo(User, {
    foreignKey: 'user_id',
})
// User has many Posts
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
})
// Comments belong to User
Comment.belongsTo(User, {
    foreignKey: 'user_id',
})
// User has many Comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
})
// Comments belong to Posts through postComments
Comment.belongsTo(Post, {
    through: {
      model: PostComment,
    },
    as: 'comment_post',
  })
// Posts have many Comments through postComments
Post.belongsToMany(Comment, {
    through: {
      model: PostComment,
    },
    as: 'post_comment',
    onDelete: 'CASCADE',
  })

  module.exports = {
    User,
    Post,
    Comment,
    PostComment,
  };