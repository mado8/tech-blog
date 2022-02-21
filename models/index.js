const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

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
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
  })
// Posts have many Comments through postComments
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
  })

  module.exports = {
    User,
    Post,
    Comment,
  };