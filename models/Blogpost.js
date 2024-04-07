const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class BlogPost extends Model {}

BlogPost.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User', // Make sure 'User' matches the actual model name
                key: 'id'
            }
        }
    },
    {
        sequelize,
        modelName: 'blogpost',
        tableName: 'blogpost' // Adjust the table name to match the actual table name
    }
);

module.exports = BlogPost;


// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');

// class BlogPost extends Model {}

// BlogPost.init({
//     id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     title: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     content: {
//         type: DataTypes.TEXT,
//         allowNull: false
//     },
//     user_id: {
//         type: DataTypes.INTEGER,
//         references: {
//             model: 'User',
//             key: 'id'
//         }
//     }
// }, {
//     sequelize,
//     // freezeTableName: true,
//     // underscored: true,
//     modelName: 'BlogPost',
//     tableName: 'BlogPost'
// });

// module.exports = BlogPost;

// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');

// class BlogPost extends Model {}

// BlogPost.init({
//     id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     title: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     post_text: {
//         type: DataTypes.TEXT,
//         allowNull: false
//     },
//     user_id: {
//         type: DataTypes.INTEGER,
//         references: {
//             model: 'User',
//             key: 'id'
//         }
//     }
// },
// {
//     sequelize,
//     freezeTableName: true,
//     underscored: true,
//     modelName: 'BlogPost'
// }
// );

// module.exports = BlogPost;