import useInput from '../hooks/useInput';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Router from 'next/router';
import { Menu, Input, Row, Col } from 'antd';
import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import styled, { createGlobalStyle } from 'styled-components';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';

const SearchInput = styled(Input.Search)`
    vertical-align: middle
`
const Global = createGlobalStyle`
    .ant-row {
        margin-right: 0 !important;
        margin-left: 0 !important;
    }

    .ant-col:first-child {
        padding-left: 0 !important;
    }

    .ant-col:last-child {
        padding-right: 0 !important;
    }
`

const AppLayout = ({ children }) => {
    const [searchInput, onChangeSearchInput] = useInput('');
    const { me } = useSelector((state) => state.user);

    const onSearch = useCallback(() => {
        Router.push(`/hashtag/${searchInput}`);
    },[searchInput]);

    return (
        <div>
            <Global />
            <Menu mode='horizontal'>
                <Menu.Item key="home">
                    <Link href="/"><a>홈</a></Link>
                </Menu.Item>
                <Menu.Item key="login">
                    <Link href="/login"><a>로그인</a></Link>
                </Menu.Item>
                <Menu.Item key="signup">
                    <Link href="/signup"><a>회원가입</a></Link>
                </Menu.Item>
                <Menu.Item key="profile">
                    <Link href="/profile"><a>프로필</a></Link>
                </Menu.Item>
                <Menu.Item key="search">
                    <SearchInput
                        enterButton
                        value={searchInput}
                        onChange={onChangeSearchInput}
                        onSearch={onSearch}
                    />
                </Menu.Item>
            </Menu>
            <Row>
                <Col xs={24} sm={20} md={20} lg={18}>
                    { me ? <UserProfile /> : <LoginForm /> }   
                </Col>
                <Col xs={24} sm={20} md={20} lg={18}>
                    { children }   
                </Col>
                <Col xs={24} sm={20} md={20} lg={18}>
                    <a href="https://ktestone.com" target="_blank" rel="noreferrer noopener">Made by 위드썸컴퍼니</a>  
                </Col>
            </Row>
        </div>
    )
}

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AppLayout;