const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const hashtagRouter = require('./routes/hashtag');
const passportConfig = require('./passport');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet');
const hpp = require('hpp');

dotenv.config();
db.sequelize.sync()
    .then(() => {
        console.log('DB Connected...');
    })
    .catch(console.error);

if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
    app.use(helmet());
    app.use(hpp());
} else {
    app.use(morgan('dev'));
}
passportConfig();
app.use(cors({
	origin: 'https://jellinggame.net',
   	credentials: true,
}));
app.use('/', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: true,
        domain: process.env.NODE_ENV === 'production' && '.jellinggame.net'
    }
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(passport.initialize());
app.use(passport.session());

// get -> 가져오기
// post -> 생성하기
// put -> 전체 수정하기
// delete -> 삭제하기
// patch -> 부분 수정하기
// options -> 찔러보기
// head -> 헤더만 가져오기

app.get('/', (req, res) => {
    res.send('Hello api!')
});

app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/user', userRouter);
app.use('/hashtag', hashtagRouter);

app.listen(3065, () => {
    console.log('Server ing...');
});
