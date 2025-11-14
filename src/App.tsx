import './App.css';
import { Button, Divider } from 'antd';
import { LanguageSwitcher } from './components/LanguageSwitch';
import { Routes, Route, useNavigate } from 'react-router';
import Login from './pages/Login';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { selectToken, setToken } from './redux/auth/authSlice';
import Invoices from './pages/Invoices';
import { useTranslation } from './hooks/useTranslation';
import Invoice from './pages/Invoice';

function App() {
  const token = useAppSelector(selectToken);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  let navigate = useNavigate();

  return (
    <>
      <LanguageSwitcher />
      {token && (
        <Button
          danger
          style={{ marginLeft: 16 }}
          onClick={() => {
            dispatch(setToken(null));
            navigate('/');
          }}
        >
          {t('logout')}
        </Button>
      )}
      <Divider />
      {token ? (
        <Routes>
          <Route path='/' element={<Invoices />} />
          <Route path='/invoice/:id' element={<Invoice />} />
        </Routes>
      ) : (
        <Routes>
          <Route path='/' element={<Login />} />
        </Routes>
      )}
    </>
  );
}

export default App;
