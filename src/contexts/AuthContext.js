import React, { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

const initialState = {
  user: null,
  isLoggedIn: false,
  notifications: [],
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    case 'LOGOUT':
      return initialState;
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notifications]
      };
    case 'MARK_NOTIFICATIONS_READ':
      return {
        ...state,
        notifications: state.notifications.map(notif => ({
          ...notif,
          read: true
        }))
      };
    default:
      return state;
  }
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (username) => {
    dispatch({
      type: 'LOGIN',
      payload: { username }
    });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const addNotification = (notification) => {
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: Date.now(),
        ...notification,
        read: false,
        timestamp: new Date().toISOString()
      }
    });
  };

  const markNotificationsRead = () => {
    dispatch({ type: 'MARK_NOTIFICATIONS_READ' });
  };

  const value = {
    user: state.user,
    isLoggedIn: state.isLoggedIn,
    notifications: state.notifications,
    unreadCount: state.notifications.filter(n => !n.read).length,
    login,
    logout,
    addNotification,
    markNotificationsRead
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 