const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class PostComment extends Model {}

PostComment.init(
    {
        post_id: {
            type: DataTypes.INTEGER,
            references: {
            model: 'post',
            key: 'id',
             },
        },
        comment_id: {
            type: DataTypes.INTEGER,
            references: {
            model: 'comment',
            key: 'id',
             },
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'postComment',
    }
);

module.exports = PostComment;