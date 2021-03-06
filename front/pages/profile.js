import { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import NincknameEditForm from '../components/NicknameEditForm'
import FollowList from '../components/FollowList'
import { useSelector } from 'react-redux'
import useSWR from 'swr';
import Router from 'next/router';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';
import { END } from 'redux-saga';
import axios from 'axios';
import { backUrl } from '../config/config';

const fetcher = (url) => axios.get(url, { withCredentials: true }).then((result) => result.data);

const Profile = () => {
    // const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);

    const [followersLimit, setFollowersLimit] = useState(3);
    const [followingsLimit, setFollowingsLimit] = useState(3);

    const { data: followersData, error: followerError } = useSWR(`${backUrl}/user/followers?limit=${followersLimit}`, fetcher);
    const { data: followingsData, error: followingError } = useSWR(`${backUrl}/user/followings?limit=${followingsLimit}`, fetcher);

    // useEffect(() => {
    //     dispatch({
    //         type: LOAD_FOLLOWERS_REQUEST,
    //     });
    //     dispatch({
    //         type: LOAD_FOLLOWINGS_REQUEST,
    //     })
    // }, []);

    useEffect(() => {
        if(!(me && me.id)) {
            Router.push('/');
        }
    }, [me && me.id]);

    const loadMoreFollowers = useCallback(() => {
        setFollowersLimit((prev) => prev + 3);
    }, []);

    const loadMoreFollowings = useCallback(() => {
        setFollowingsLimit((prev) => prev + 3);
    }, []);

    if(!me) {
        return '내 정보 로딩중...';
    };

    if (followerError || followingError) {
        console.error(followerError || followingError);
        return <div>팔로잉/팔로워 로딩 중 에러가 발생했습니다.</div>;
    }


    return (
        <>
            <Head>
                <title>내 프로필 | Jelling Game</title>
            </Head>
            <AppLayout>
                <NincknameEditForm />
                <FollowList header="following list" data={followingsData} onClickMore={loadMoreFollowings} loading={!followingsData && !followingError}/>
                <FollowList header="follower list" data={followersData} onClickMore={loadMoreFollowers} loading={!followersData && !followerError}/>
            </AppLayout>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if(context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    };
    context.store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});

export default Profile;