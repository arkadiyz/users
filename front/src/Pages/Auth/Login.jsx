import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Message,
  MessageContent,
  MessageHeader,
  Segment,
} from 'semantic-ui-react';
import LogoIcon from '../../assets/icons/logo.png';
import { login } from '../../services/net.service';
import { useSelector, useDispatch } from 'react-redux';
import { setloading } from '../../store/loaderSlice';
const Login = () => {
  const { isLoading } = useSelector((state) => state.loading);
  const { errMessage } = useSelector((state) => state.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userParams, setUserParams] = useState({
    email: '',
    password: '',
  });

  const handleLoginChange = (e) => {
    setUserParams((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onLogin = async () => {
    dispatch(setloading(true));
    try {
      await login(userParams);
      navigate('./homepage');
    } catch (error) {
    } finally {
      dispatch(setloading(false));
    }
  };

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Image src={LogoIcon} alt={'Logo'} /> Log-in to your account
        </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input
              fluid
              name='email'
              icon='user'
              iconPosition='left'
              placeholder='E-mail address'
              value={userParams.email ?? ''}
              onChange={handleLoginChange}
            />
            <Form.Input
              fluid
              name='password'
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              value={userParams.password ?? ''}
              onChange={handleLoginChange}
            />

            {errMessage !== null && (
              <Message color={'red'} className='error-form--msg'>
                Error: {errMessage}
              </Message>
            )}
            {isLoading && (
              <Message icon>
                <Icon name='circle notched' loading />
                <MessageContent>
                  <MessageHeader>Just one second</MessageHeader>
                  We are fetching that content for you.
                </MessageContent>
              </Message>
            )}

            <Button color='teal' fluid size='large' onClick={onLogin}>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <a href='/signup'>Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};
export default Login;
