import createDataContext from './createDataContext';
import { auth } from '../firebaseconfig';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'signout':
      return {token: null, email: ''};
    case 'signin':
    case 'signup':
      return {
        token: action.payload.token,
        email: action.payload.email,
      };
    default:
      return state;
  }
};

const signup = dispatch => {
  return ({email, password}) => {
    console.log('Signup');
  };
};

const signin = dispatch => {
  return ({email, password}) => {
    auth
    .signInWithEmailAndPassword(email,password)
    .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email)
    })
    dispatch({
      type: 'signin',
      payload: {
        token: password,
        email,
      },
    });
  };
};

const signout = dispatch => {
  return () => {
    dispatch({type: 'signout'});
  };
};

export const {Provider, Context} = createDataContext(
  authReducer,
  {signin, signout, signup},
  {token: null, email: ''},
);