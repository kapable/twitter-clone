import { useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import { useSelector, useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';
import axios from 'axios';

const Home = () => {
    const { me } = useSelector((state) => state.user);
    const { mainPosts, hasMorePosts, loadPostsLoading, retweetError } = useSelector((state) => state.post);
    const dispatch = useDispatch();

    useEffect(() => {
        if(retweetError) {
            alert(retweetError);
        }
    }, [retweetError]);

    useEffect(() => {
        function onScroll() {
            // console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);
            if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 500) {
                if(hasMorePosts && !loadPostsLoading) {
                    const lastId = mainPosts[mainPosts.length - 1]?.id;
                    dispatch({
                        type: LOAD_POSTS_REQUEST,
                        lastId
                    })
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, [hasMorePosts, loadPostsLoading, mainPosts])

    return (
        <AppLayout>
            {me && <PostForm />}
            {mainPosts.map((post) => <PostCard key={post.id} post={post}/>)}
        </AppLayout>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if(context.req && cookie) { // 다른 사용자와 쿠키(로그인 상태)를 공유하지 않기 위해 req를 보내면서 쿠키가 존재할 때만 쿠키 헤더 넣기
        axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch({
        type: LOAD_POSTS_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});

export default Home;