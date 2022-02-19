import produce from '../util/produce';
// import shortId from 'shortid';
// import faker from 'faker';

export const initialState = {
    // mainPosts: [{
    //     id: 1,
    //     User: {
    //         id:1,
    //         nickname: "Seeyong",
    //     },
    //     content: 'First comment #Hash #Express',
    //     Images: [{
    //         id:shortId.generate(),
    //         src: 'https://images.unsplash.com/photo-1587813368357-9e58f27691b2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80'
    //     }, {
    //         id:shortId.generate(),
    //         src: 'https://images.unsplash.com/photo-1591347887817-173e3d5c4891?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1507&q=80'
    //     }, {
    //         id:shortId.generate(),
    //         src: 'https://images.unsplash.com/photo-1536173375199-161929d85af2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1471&q=80'
    //     }],
    //     Comments: [{
    //         id:shortId.generate(),
    //         User: {
    //             id:shortId.generate(),
    //             nickname: 'abcd',
    //         },
    //         content: 'Wow',
    //     }, {
    //         id:shortId.generate(),
    //         User: {
    //             id:shortId.generate(),
    //             nickname: 'qwer',
    //         },
    //         content: 'This one!'
    //     }]
    // }],
    mainPosts: [],
    singlePost: null,
    imagePaths: [],
    hasMorePosts: true,
    loadPostLoading: false,
    loadPostDone: false,
    loadPostError: false,
    loadPostsLoading: false,
    loadPostsDone: false,
    loadPostsError: false,
    loadUserPostsLoading: false,
    loadUserPostsDone: false,
    loadUserPostsError: false,
    loadHashtagPostsLoading: false,
    loadHashtagPostsDone: false,
    loadHashtagPostsError: false,
    addPostLoading: false,
    addPostDone: false,
    addPostError: false,
    uploadImagesLoading: false,
    uploadImagesDone: false,
    uploadImagesError: false,
    updatePostLoading: false,
    updatePostDone: false,
    updatePostError: false,
    removePostLoading: false,
    removePostDone: false,
    removePostError: false,
    likePostLoading: false,
    likePostDone: false,
    likePostError: false,
    unlikePostLoading: false,
    unlikePostDone: false,
    unlikePostError: false,
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: false,
    retweetLoading: false,
    retweetDone: false,
    retweetError: false,
}

// export const generateDummyPost = (number) => Array(number).fill().map(() => ({
//     id: shortId.generate(),
//     User: {
//         id: shortId.generate(),
//         nickname: faker.name.findName()
//     },
//     content: faker.lorem.paragraph(),
//     Images: [{
//         // src: faker.image.image(),
//         src: null,
//     }],
//     Comments: [{
//         User: {
//             id: shortId.generate(),
//             nickname: faker.name.findName()
//         },
//         content: faker.lorem.sentence(),
//     }],
// }));

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const UPDATE_POST_REQUEST = 'UPDATE_POST_REQUEST';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILURE = 'UPDATE_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export const addPost = (data) => ({
    type: ADD_POST_REQUEST,
    data,
});

export const addComment = (data) => ({
    type: ADD_COMMENT_REQUEST,
    data,
});

// const dummyPost = (data) => ({
//     id: data.id,
//     content: data.content,
//     User: {
//         id: 1,
//         nickname: 'abcd',
//     },
//     Images: [],
//     Comments: [],
// });

// const dummyComment = (data) => ({
//     id: shortId.generate(),
//     content: data,
//     User: {
//         id:1,
//         nickname: 'SY',
//     },
// })

const reducer = (state=initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case LOAD_POST_REQUEST:
                draft.loadPostLoading = true;
                draft.loadPostDone = false;
                draft.loadPostError = null;
                break;
            case LOAD_POST_SUCCESS:
                draft.singlePost = action.data;
                draft.loadPostDone = true;
                draft.loadPostLoading = false;
                break;
            case LOAD_POST_FAILURE:
                draft.loadPostLoading = false;
                draft.loadPostError = action.error;
                break;
            case LOAD_POSTS_REQUEST:
            case LOAD_USER_POSTS_REQUEST:
            case LOAD_HASHTAG_POSTS_REQUEST:
                draft.loadPostsLoading = true;
                draft.loadPostsDone = false;
                draft.loadPostsError = null;
                break;
            case LOAD_POSTS_SUCCESS:
            case LOAD_USER_POSTS_SUCCESS:
            case LOAD_HASHTAG_POSTS_SUCCESS:
                draft.mainPosts = draft.mainPosts.concat(action.data);
                draft.hasMorePosts = action.data.length === 10;
                draft.loadPostsDone = true;
                draft.loadPostsLoading = false;
                break;
            case LOAD_POSTS_FAILURE:
            case LOAD_USER_POSTS_FAILURE:
            case LOAD_HASHTAG_POSTS_FAILURE:
                draft.loadPostsLoading = false;
                draft.loadPostsError = action.error;
                break;
            case ADD_POST_REQUEST:
                draft.addPostLoading = true;
                draft.addPostDone = false;
                draft.addPostError = null;
                break;
            case ADD_POST_SUCCESS:
                draft.mainPosts.unshift(action.data);
                draft.addPostDone = true;
                draft.addPostLoading = false;
                draft.imagePaths = [];
                break;
            case ADD_POST_FAILURE:
                draft.addPostLoading = false;
                draft.addPostError = action.error;
                break;
            case UPLOAD_IMAGES_REQUEST:
                draft.uploadImagesLoading = true;
                draft.uploadImagesDone = false;
                draft.uploadImagesError = null;
                break;
            case UPLOAD_IMAGES_SUCCESS:
                draft.imagePaths = action.data;
                draft.uploadImagesDone = true;
                draft.uploadImagesLoading = false;
                break;
            case UPLOAD_IMAGES_FAILURE:
                draft.uploadImagesLoading = false;
                draft.uploadImagesError = action.error;
                break;
            case UPDATE_POST_REQUEST:
                draft.udpatePostLoading = true;
                draft.udpatePostDone = false;
                draft.udpatePostError = null;
                break;
            case UPDATE_POST_SUCCESS:
                draft.mainPosts.find((v) => v.id === action.data.PostId).content = action.data.content;
                draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data.PostId);
                draft.udpatePostDone = true;
                draft.udpatePostLoading = false;
                break;
            case UPDATE_POST_FAILURE:
                draft.removePostLoading = false;
                draft.removePostError = action.error;
                break;
            case REMOVE_POST_REQUEST:
                draft.removePostLoading = true;
                draft.removePostDone = false;
                draft.removePostError = null;
                break;
            case REMOVE_POST_SUCCESS:
                draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data.PostId);
                draft.removePostDone = true;
                draft.removePostLoading = false;
                break;
            case REMOVE_POST_FAILURE:
                draft.removePostLoading = false;
                draft.removePostError = action.error;
                break;
            case LIKE_POST_REQUEST:
                draft.likePostLoading = true;
                draft.likePostDone = false;
                draft.likePostError = null;
                break;
            case LIKE_POST_SUCCESS: {
                const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
                post.Likers.push({ id: action.data.UserId });
                draft.likePostDone = true;
                draft.likePostLoading = false;
                break;
            }
            case LIKE_POST_FAILURE:
                draft.likePostLoading = false;
                draft.likePostError = action.error;
                break;
            case UNLIKE_POST_REQUEST:
                draft.unlikePostLoading = true;
                draft.unlikePostDone = false;
                draft.unlikePostError = null;
                break;
            case UNLIKE_POST_SUCCESS: {
                const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
                post.Likers = post.Likers.filter((v) => v.id !== action.data.UserId );
                draft.unlikePostDone = true;
                draft.unlikePostLoading = false;
                break;
            }
            case UNLIKE_POST_FAILURE:
                draft.unlikePostLoading = false;
                draft.unlikePostError = action.error;
                break;
            case ADD_COMMENT_REQUEST:
                draft.addCommentLoading = true;
                draft.addCommentDone = false;
                draft.addCommentError = null;
                break;
            case ADD_COMMENT_SUCCESS: {
                const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
                post.Comments.unshift(action.data);
                draft.addCommentDone = true;
                draft.addCommentLoading = false;
                break;
                // const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
                // const post = { ...state.mainPosts[postIndex] };
                // post.Comments = [dummyComment(action.data.content), ...post.Comments]
                // const mainPosts = [...state.mainPosts]
                // mainPosts[postIndex] = post;
                // return {
                //     ...state,
                //     mainPosts,
                //     addCommentDone: true,
                //     addCommentLoading: false,
                // }
                };
            case ADD_COMMENT_FAILURE:
                draft.addCommentLoading = false;
                draft.addCommentError = action.error;
                break;
            case RETWEET_REQUEST:
                draft.retweetLoading = true;
                draft.retweetDone = false;
                draft.retweetError = null;
                break;
            case RETWEET_SUCCESS:
                draft.mainPosts.unshift(action.data);
                draft.retweetDone = true;
                draft.retweetLoading = false;
                break;
            case RETWEET_FAILURE:
                draft.retweetLoading = false;
                draft.retweetError = action.error;
                break;
            case REMOVE_IMAGE:
                draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data);
                break;
            default:
                break;
        }
    });
};

export default reducer;