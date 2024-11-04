import { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case 'logout':
      return initialState;
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
}

// Fake user for demonstration purposes, this can be seen in source
const FAKE_USER = {
  name: 'Jens',
  email: 'jack@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=zz',
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  function login(email, password) {
    if (email !== FAKE_USER.email || password !== FAKE_USER.password) {
      throw new Error('Invalid email or password');
    }

    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({
        type: 'login',
        payload: { name: FAKE_USER.name, avatar: FAKE_USER.avatar },
      });
    }
  }

  function logout() {
    dispatch({ type: 'logout' });
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}

export { AuthProvider, useAuth };
