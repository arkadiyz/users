import { useState } from 'react';
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
import { signUp } from '../../services/auth.service';
import { useSelector, useDispatch } from 'react-redux';
import { setloading } from '../../store/loaderSlice';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const { isLoading } = useSelector((state) => state.loading) || false;
  const { errMessage } = useSelector((state) => state.error) || '';
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    repeatPassword: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    repeatPassword: '',
  });

  const handleRegisterChange = (e) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onRegister = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isEmpty = validate();
    if (isEmpty) {
      dispatch(setloading(true));
      try {
        await signUp(formData);
        dispatch(setloading(false));
        navigate('/');
      } catch (error) {
        dispatch(setloading(false));
      }
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is not valid.';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }
    if (formData.password !== formData.repeatPassword) {
      newErrors.repeatPassword =
        'The passwords must be identical to each other.';
    } else {
      newErrors.repeatPassword = '';
    }
    setErrors((prevState) => {
      return {
        ...newErrors,
      };
    });
    const isEmpty = Object.values(newErrors).every((value) => value === '');
    return isEmpty;
  };

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Image src={LogoIcon} alt={'Logo'} /> Sign Up your account
        </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input
              fluid
              name='email'
              icon='mail'
              iconPosition='left'
              placeholder='E-mail address'
              value={formData.email}
              onChange={handleRegisterChange}
              error={
                errors.email
                  ? {
                      content: errors.email,
                      pointing: 'below',
                    }
                  : null
              }
            />
            <Form.Input
              fluid
              name='firstname'
              icon='user'
              iconPosition='left'
              placeholder='First Name'
              value={formData.firstname}
              onChange={handleRegisterChange}
            />
            <Form.Input
              fluid
              name='lastname'
              icon='user'
              iconPosition='left'
              placeholder='Last Name'
              value={formData.lastname}
              onChange={handleRegisterChange}
            />
            <Form.Input
              fluid
              name='password'
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              value={formData.password}
              onChange={handleRegisterChange}
              error={
                errors.password
                  ? {
                      content: errors.password,
                      pointing: 'below',
                    }
                  : null
              }
            />
            <Form.Input
              fluid
              name='repeatPassword'
              icon='lock'
              iconPosition='left'
              placeholder='Repeat Password'
              type='password'
              value={formData.repeatPassword}
              onChange={handleRegisterChange}
              error={
                errors.repeatPassword
                  ? {
                      content: errors.repeatPassword,
                      pointing: 'below',
                    }
                  : null
              }
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
            <Button fluid color='teal' size='large' onClick={onRegister}>
              Sign Up
            </Button>
          </Segment>
        </Form>
        <Message>
          Already have an account? <a href='/'>Login</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default SignUp;
