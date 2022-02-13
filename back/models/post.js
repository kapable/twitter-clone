const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Post extends Model {
    static init(sequelize) {
        return super.init({ // MySQL에는 posts 테이블 생성
            // id가 기본적으로 자동 삽입
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        }, {
            modelName: 'Post',
            tableName: 'posts',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci', // 한글 + 이모티콘 저장
            sequelize
        })
    };
    static associate(db) {
        db.Post.belongsTo(db.User); // post.addUser, post.getUser, post.setUser, post.removeUser
        db.Post.hasMany(db.Comment); // post.addComments
        db.Post.hasMany(db.Image); // post.addImages
        db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' }); // post.addHashtags
        db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' }); // post.addLikers, post.removeLikers
        db.Post.belongsTo(db.Post, { as: "Retweet" }); // post.addRetweet
    };
}