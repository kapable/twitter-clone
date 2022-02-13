import { useCallback, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'
import { loginRequestAction } from '../reducers/user';
import useInput from '../hooks/useInput'

const ButtonWrapper = styled.div`
    margin-top: 10px;
`

const FormWrapper = styled(Form)`
    padding: 10px;
`

const LoginForm = () => {
    const dispatch = useDispatch();
    const { logInLoading, logInError } = useSelector((state) => state.user);
    const [email, onChangeEmail] = useInput('');
    const [Password, onChangePassword] = useInput('');

    useEffect(() => {
        if(logInError) {
            alert(logInError);
        }
    }, [logInError])

    const onSubmitForm = useCallback(
        () => {
            dispatch(loginRequestAction({email, Password}));
        },
        [email, Password],
    )

    return (
        <FormWrapper onFinish={onSubmitForm}>
            <div>
                <label htmlFor='user-email'>이메일</label>
                <br />
                <Input name='user-email' type="email" value={email} onChange={onChangeEmail} required />
            </div>
            <div>
                <label htmlFor='user-passwrod'>비밀번호</label>
                <br />
                <Input name='user-passwrod' type='password' value={Password} onChange={onChangePassword} required />
            </div>
            <div>
                <ButtonWrapper>
                <Button type='primary' htmlType='submit' loading={logInLoading}>로그인</Button>
                <Link href='/signup'><a><Button>회원가입</Button></a></Link>
                </ButtonWrapper>
            </div>
        </FormWrapper>
    )
}

export default LoginForm;