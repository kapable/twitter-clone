import { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { Button, Checkbox, Form, Input } from 'antd';
import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput'
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { SIGN_UP_REQUEST, LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';
import { END } from 'redux-saga';
import axios from 'axios';

const ErrorMessage = styled.div`
    color: red;
`;

const SignUp = () => {

    const dispatch = useDispatch();
    const { signUpLoading, signUpDone, signUpError, me } = useSelector((state) => state.user);

    useEffect(() => {
        if((me && me.id)) {
            Router.replace('/');
        }
    }, [me && me.id]);

    useEffect(() => {
        if(signUpDone) {
            Router.replace('/');
        }
    }, [signUpDone]);

    useEffect(() => {
        if(signUpError) {
            alert(signUpError);
        }
    }, [signUpError]);

    const [email, onChangeEmail] = useInput('');
    const [nickname, onChangeNickname] = useInput('');
    const [Password, onChangePassword] = useInput('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const onChangePasswordCheck = useCallback(
        (e) => {
            setPasswordCheck(e.target.value);
            setPasswordError(e.target.value !== Password);
        },
        [Password],
    )

    const [term, setTerm] = useState('');
    const [termError, setTermError] = useState(false);
    const onChangeTerm = useCallback(
        (e) => {
            setTerm(e.target.checked);
            setTermError(false);
        },
        [],
    )

    const onSubmit = useCallback(
        () => {
            if(Password !== passwordCheck) {
                return setPasswordError(true);
            }
            if(!term) {
                return setTermError(true);
            }
            dispatch({
                type: SIGN_UP_REQUEST,
                data: { email, nickname, Password }
            });
        },
        [Password, passwordCheck, setPasswordError, term, setTermError, email, nickname],
    )

    return (
        <AppLayout>
            <Head>
                <title>회원 가입 | Jelling Game</title>
            </Head>
            <Form onFinish={onSubmit}>
                <div>
                    <label htmlFor="user-email">이메일</label>
                    <br />
                    <Input name="user-email" type="email" value={email} required onChange={onChangeEmail}/>
                </div>
                <div>
                    <label htmlFor="user-nick">Nickname</label>
                    <br />
                    <Input name="user-nick" value={nickname} required onChange={onChangeNickname}/>
                </div>
                <div>
                    <label htmlFor="user-password">Password</label>
                    <br />
                    <Input name="user-password" type="password" value={Password} required onChange={onChangePassword}/>
                </div>
                <div>
                    <label htmlFor="user-password-check">Check Password</label>
                    <br />
                    <Input
                        name="user-password-check"
                        type="password"
                        value={passwordCheck}
                        required
                        onChange={onChangePasswordCheck}
                    />
                    {passwordError && <ErrorMessage>Password Not Correct</ErrorMessage>}
                </div>
                <div>
                    <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>I Agree to the term</Checkbox>
                    {termError && <ErrorMessage>You have to agree with the term</ErrorMessage>}
                </div>
                <div style={{ marginTop: 10 }}>
                    <Button type="primary" htmlType="submit" loading={signUpLoading}>Sign Up</Button>
                </div>
            </Form>
        </AppLayout>
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
})

export default SignUp;