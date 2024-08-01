import './App.css';
import Header from './components/header';
import SignIn from './components/signIn';
import SignUp from './components/signUp';
import Profile from './pages/profile';
import MyLinks from './pages/myLinks';
import Preview from './pages/preview';
import PreventLogin from './helpers/preventLogin';
import ProtectedRoute from './helpers/protectedRoute';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/auth';
import { ToastContainer } from 'react-toastify';
function App() {
  const location = useLocation();
  const { isLogin } = useAuth();

  return (
    <>
      <ToastContainer position='top-center' />
      {isLogin() && location.pathname !== "/preview" && <Header />}
      <Routes>
        {isLogin() ? (
          <>
            <Route path='/' element={<ProtectedRoute><MyLinks /></ProtectedRoute>} />
            <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path='/preview' element={<ProtectedRoute><Preview /></ProtectedRoute>} />
          </>
        ) : (
          <>
            <Route path='/' element={<PreventLogin><SignIn /></PreventLogin>} />
            <Route path='/signUp' element={<PreventLogin><SignUp /></PreventLogin>} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
