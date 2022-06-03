import Cookies from 'js-cookie';
import { createContext, useReducer } from 'react';

export const Store = createContext();
const initialState = {
  activeuser: Cookies.get('userMail') ? Cookies.get('userMail') : "",
  company: Cookies.get('company') ? Cookies.get('company') : "",
  location:Cookies.get('location') ? Cookies.get('location') : "",
};

function reducer(state, action) {
  switch (action.type) {

    case 'USER_LOGIN':
      return { ...state, activeuser: action.payload };

    case 'LOGGED_COMPANY':
      return { ...state, company: action.payload };

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}