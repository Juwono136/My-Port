import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
// import tokenReducer from '../features/token/tokenSlice';
import userReducer from '../features/user/userSlice';
import skillReducer from '../features/skill/skillSlice';
import portfolioReducer from '../features/portfolio/portfolioSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // token: tokenReducer,
    user: userReducer,
    skill: skillReducer,
    portfolio: portfolioReducer
  },
});
