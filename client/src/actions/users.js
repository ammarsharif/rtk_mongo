import { login, signUp, deleteUser } from '../features/reducer/reducer';
import { apiRequest } from '../utils/axios';

export const signIn =
  ({ email, password }) =>
  async (dispatch) => {
    await apiRequest(`http://localhost:5000/users/login`, 'post', {
      email,
      password,
    })
      .then((response) => {
        console.log(response, 'response');
        dispatch(login(response.data.users));
      })
      .catch((error) => {
        console.error('API Request Error:', error);
      });
  };
export const createNewUser =
  ({ userName, email, password }) =>
  async (dispatch) => {
    await apiRequest('http://localhost:5000/users/createNewUser', 'post', {
      userName,
      email,
      password,
    }).then((response) => {
      dispatch(signUp(response.data));
    });
  };
export const userDelete = (userId) => (dispatch) => {
  apiRequest(`http://localhost:5000/users/delete?id=${userId}`, 'delete').then(
    (response) => dispatch(deleteUser(response.data.users))
  );
};
