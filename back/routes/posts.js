const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const { Post, User, Image, Comment } = require('../models');

router.get('/', async (req, res, next) => { // GET /posts
    try {
        const where = {};
        if (parseInt(req.query.lastId, 10)) { // 최초 로딩이 아닌경우
            where.id = { [Op.lt]: parseInt(req.query.lastId, 10) } // Operator.lt lastId 보다 작은
        }
        const posts = await Post.findAll({
            where, 
            limit: 10,
            // offset: 0, // DB에서 가져오는 중간에 새 post가 생성되거나 삭제될 경우 중간 게시물을 중복으로 가져오거나 누락하는 경우 발생
            order: [
                ['createdAt', 'DESC'],
                [Comment, 'createdAt', 'DESC'],
            ],
            include: [{
                model: User,
                attributes: ['id', 'nickname'],
            }, {
                model: Image,
            }, {
                model: Comment,
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }]
            }, {
                model: User,
                as: 'Likers',
                attributes: ['id'],
            }],
        });
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;