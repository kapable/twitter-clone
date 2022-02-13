const express = require('express');
const router = express.Router();
const { User, Post, Image, Comment } = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { Op } = require('sequelize');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

router.get(`/`, async (req, res, next) => { // GET /user
    try {
        if(req.user) {
            const fullUserWithoutPassword = await User.findOne({
                where: { id: req.user.id },
                attributes: {
                    exclude: ['password']
                },
                include: [{
                    model: Post,
                    attributes: ['id'],
                }, {
                    model: User,
                    as: 'Followings',
                    attributes: ['id', 'nickname'],
                }, {
                    model: User,
                    as: 'Followers',
                    attributes: ['id', 'nickname'],
                }],
            })
            res.status(200).json(fullUserWithoutPassword);
        } else {
            res.status(200).json(null);
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get(`/followers`, isLoggedIn, async (req, res, next) => { // PATCH /user/followers
    try {
        const user = await User.findOne({ where: { id: req.user.id }});
        if(!user) {
            res.status(403).send('존재하지 않는 유저예요!');
        }
        const followers = await user.getFollowers({
            limit: parseInt(req.query.limit, 10),
        });
        res.status(200).json(followers);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get(`/followings`, isLoggedIn, async (req, res, next) => { // PATCH /user/followers
    try {
        const user = await User.findOne({ where: { id: req.user.id }});
        if(!user) {
            res.status(403).send('존재하지 않는 유저예요!');
        }
        const followings = await user.getFollowings({
            limit: parseInt(req.query.limit, 10),
        });
        res.status(200).json(followings);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get(`/:userId`, async (req, res, next) => { // GET /user/1
    try {
        const fullUserWithoutPassword = await User.findOne({
            where: { id: req.params.userId },
            attributes: {
                exclude: ['password']
            },
            include: [{
                model: Post,
                attributes: ['id'],
            }, {
                model: User,
                as: 'Followings',
                attributes: ['id'],
            }, {
                model: User,
                as: 'Followers',
                attributes: ['id'],
            }],
        })
        if(fullUserWithoutPassword) {
            const data = fullUserWithoutPassword.toJSON();
            data.Posts = data.Posts.length;
            data.Followings = data.Followings.length;
            data.Followers = data.Followers.length;
            res.status(200).json(data);
        } else {
            res.status(200).json('존재하지 않는 사용자입니다.');
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        if (info) {
            return res.status(401).send(info.reason); // 401 -> Unauthorized
        }
        return req.login(user, async (loginErr) => {
            if (loginErr) {
                console.error(loginErr);
                return next(loginErr);
            }
            const fullUserWithoutPassword = await User.findOne({
                where: { id: user.id },
                attributes: {
                    exclude: ['password']
                },
                include: [{
                    model: Post,
                    attributes: ['id'],
                }, {
                    model: User,
                    as: 'Followings',
                    attributes: ['id'],
                }, {
                    model: User,
                    as: 'Followers',
                    attributes: ['id'],
                }],
            })
            return res.status(200).json(fullUserWithoutPassword);
        });
    })(req, res, next);
});

router.post('/', isNotLoggedIn, async (req, res, next) => { // POST /user/
    try {
        const exUser = await User.findOne({ // 기존에 있는 아이디(이메일)인지 찾은 후,
            where: {
                email: req.body.email,
            }
        });
        if(exUser) { // 기존에 사용자가 있다면,
            return res.status(403).send('이미 사용중인 아이디입니다.'); // return으로 response 1개만 보내기
        }
        const hashedPassword = await bcrypt.hash(req.body.Password, 12);
        await User.create({
            email: req.body.email,
            nickname: req.body.nickname,
            password: hashedPassword,
        });
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000/');
        res.status(201).send('Ok!'); // 201 = 200 + 생성 성공
    } catch(error) {
        console.error(error);
        next(error); // status 500
    }
});

router.post(`/logout`, isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('Okay!');
});

router.patch(`/nickname`, isLoggedIn, async (req, res, next) => { // PATCH /user/nickname
    try {
        await User.update({
            nickname: req.body.nickname,
        }, {
            where: { id: req.user.id },
        });
        res.status(200).json({ nickname: req.body.nickname });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.patch(`/:userId/follow`, isLoggedIn, async (req, res, next) => { // PATCH /user/1/follow
    try {
        const user = await User.findOne({ where: { id: req.params.userId }});
        if(!user) {
            res.status(403).send('존재하지 않는 유저예요!');
        }
        await user.addFollowers(req.user.id);
        res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.delete(`/:userId/follow`, isLoggedIn, async (req, res, next) => { // DELETE /user/1/follow
    try {
        const user = await User.findOne({ where: { id: req.params.userId }});
        if(!user) {
            res.status(403).send('존재하지 않는 유저예요!');
        }
        await user.removeFollowers(req.user.id);
        res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.delete(`/follower/:userId/`, isLoggedIn, async (req, res, next) => { // DELETE /user/1/follow
    try {
        const user = await User.findOne({ where: { id: req.params.userId }});
        if(!user) {
            res.status(403).send('존재하지 않는 유저예요!');
        }
        await user.removeFollowings(req.user.id);
        res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/:userId/posts', async (req, res, next) => { // GET /user/1/posts
    try {
        const where = { UserId: req.params.userId };
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