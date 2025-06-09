// src/App.tsx
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { CssBaseline } from '@mui/material';
import './App.css';
import PostInfo from './pages/main/PostInfo';
import PostList from './pages/main/Post';
import Header from './components/header/Header';
import SignInForm from './pages/auth/SignInForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { POSTS, SIGN_IN } from './constant/navigation';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('accessToken'); // Replace "token" with your key

  useEffect(() => {
    if (!token && location.pathname !== SIGN_IN) {
      navigate(SIGN_IN);
    } else if (token && location.pathname === '/') {
      navigate(POSTS);
    }
  }, [location.pathname, navigate, token]);

  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      <CssBaseline />
      {token && <Header />}
      <main>
        <Routes>
          <Route path={SIGN_IN} element={<SignInForm />} />
          <Route path={POSTS} element={<PostList />} />
          <Route path={`${POSTS}/:id`} element={<PostInfo />} />
        </Routes>
      </main>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
