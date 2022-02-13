import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';


const FollowButton =({ post }) => {
    const dispatch = useDispatch();
    const { me, followLoding, unFollowLoding } = useSelector((state) => state.user);
    const isFollowing = me?.Followings.find((v) => v.id === post.User.id);
    const onClickButton = useCallback(
        () => {
            if(isFollowing) {
                dispatch({
                    type: UNFOLLOW_REQUEST,
                    data: post.User.id,
                })
            } else {
                dispatch({
                    type: FOLLOW_REQUEST,
                    data: post.User.id,
                })
            }
        },
        [isFollowing],
    )
    if(post.User.id === me.id) { // 본인 게시글에는 Follow Btn이 뜨지 않도록
        return null;
    }
    return (
        <Button loading={followLoding || unFollowLoding} onClick={onClickButton}>
            {isFollowing ? 'Unfollow' : 'Follow'}
        </Button>
    );
}

FollowButton.propTypes = {
    post: PropTypes.object.isRequired
}

export default FollowButton;