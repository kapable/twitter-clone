const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class User extends Model {
    static init(sequelize) {
        return super.init({ // MySQL에는 users 테이블 생성
            // id가 기본적으로 자동 삽입
            email: {
                type: DataTypes.STRING(30),
                allowNull: false, // required
                unique: true,
            },
            nickname: {
                type: DataTypes.STRING(30),
                allowNull: false, // required
            },
            password: {
                type: DataTypes.STRING(70),
                allowNull: false, // required
            },
        }, {
            modelName: 'User',
            tableName: 'users',
            charset: 'utf8',
            collate: 'utf8_general_ci', // 한글 저장
            sequelize
        })
    };
    static associate(db) {
        db.User.hasMany(db.Post); // user.addPosts
        db.User.hasMany(db.Comment); // user.addComments
        db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' }); // 좋아요 기능에 대한 User & Post 중간 테이블 // user.addLikeds
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' }); // user.addFollowers
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId' }); // user.addFollowings
    };
};