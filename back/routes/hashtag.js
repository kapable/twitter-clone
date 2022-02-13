const express = require('express');
const router = express.Router();
const { User, Post, Hashtag, Image } = require('../models');
const { Op } = require('sequelize');

router.get('/:hashtag', async (req, res, next) => { // GET /hashtag/good
    try {
        console.log("HASHTAGS", req.params.hashtag);
        const where = {};
        if (parseInt(req.query.lastId, 10)) { // 최초 로딩이 아닌경우
            where.id = { [Op.lt]: parseInt(req.query.lastId, 10) } // Operator.lt lastId 보다 작은
        }
        const posts = await Post.findAll({
            where, 
            limit: 10,
            include: [{
                model: Hashtag,
                where: { name: decodeURIComponent(req.params.hashtag) }
            },
            {
                model: User,
                attributes: ['id', 'nickname'],
            }, {
                model: Image,
            }, {
                model: Post,
                as: 'Retweet',
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                }, {
                    model: Image
                }]
            }, {
                model: User,
                through: 'Like',
                as: 'Likers',
                attributes: ['id'],
            },
        ],
        });
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;