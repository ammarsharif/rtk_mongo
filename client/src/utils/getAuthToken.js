import store from '../App/store';
export const getToken = () => store.getState().user.loggedInUser?.token;
