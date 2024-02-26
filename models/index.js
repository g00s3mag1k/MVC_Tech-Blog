const Blogpost = require('./Blogpost');
const User = require('./User');
const Comment = require('./Comment');

User.hasMany(Blogpost, {
  foreignKey: 'user_id'
});

Blogpost.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'cascade'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'cascade'
});

Comment.belongsTo(Blogpost, {
  foreignKey: 'post_id',
  onDelete: 'cascade'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'cascade'
});

Blogpost.hasMany(Comment, {
  foreginKey: 'post_id',
  onDelete: 'cascade'
});

module.exports = { User, Comment, Blogpost };