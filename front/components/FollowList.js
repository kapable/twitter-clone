import PropTypes from 'prop-types';
import { Card, List, Button } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { UNFOLLOW_REQUEST, REMOVE_FOLLOWER_REQUEST } from '../reducers/user';


const FollowList = ({ header, data, onClickMore, loading }) => {
    const dispatch = useDispatch();
    const onCancel = (id) => () => {
        if(header === 'following list') {
            dispatch({
                type: UNFOLLOW_REQUEST,
                data: id,
            })
        } 
        dispatch({
            type: REMOVE_FOLLOWER_REQUEST,
            data: id,
        })
    }
    return(
        <List
        style={{ marginBottom: 20}}
        grid={{ gutter: 4, xs: 2, md: 3}}
        size="small"
        header={<div>{header}</div>}
        loadMore={(<div style={{ textAlign: 'center', margin: '10px 0' }}>
                <Button onClick={onClickMore} loading={loading}>Show more</Button>
            </div>)}
        bordered
        dataSource={data}
        renderItem={(item) => (
            <List.Item style={{ marginTop: 20 }}>
                <Card actions={[<StopOutlined key="stop" onClick={onCancel(item.id)} />]}>
                    <Card.Meta description={item.nickname} />
                </Card>
            </List.Item>
        )}
    />
    )
    
};

FollowList.propTypes = {
    header: PropTypes.string.isRequired,
    data: PropTypes.array,  // Not required, because list can be null
    onClickMore: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default FollowList;