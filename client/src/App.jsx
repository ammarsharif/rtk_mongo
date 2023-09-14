import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import LoginView from './components/login/LoginView';
import SignupView from './components/signup/SignupView';
import ListView from './components/todo/ListView';

function App() {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location);
  useEffect(() => {
    if (location.pathname === '/login' && loggedInUser?.email) {
      navigate('/todo');
    } else if (location.pathname === '/todo' && !loggedInUser.email) {
      navigate('/login');
    }
  }, [location.pathname]);
  return (
    <div className="App">
      <div>
        <Routes>
          <Route path="/" element={<SignupView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/todo" element={<ListView />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
