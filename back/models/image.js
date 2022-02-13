const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Image extends Model {
    static init(sequelize) {
        return super.init({ 
            // id가 기본적으로 자동 삽입
            src: {
                type: DataTypes.STRING(200),
                allowNull: false,
            },
        }, {
            modelName: 'Image',
            tableName: 'images',
            charset: 'utf8',
            collate: 'utf8_general_ci', // 한글 저장
            sequelize
        })
    };
    static associate(db) {
        db.Image.belongsTo(db.Post);
    };
};