import {Routes, Route} from 'react-router-dom';
import useStore from '../hooks/use-store';
import useSelector from "../hooks/use-selector";
import useInit from "../hooks/use-init";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from './login';
import Profile from './profile';
import ProtectedRoute from '../components/protected-route';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const store = useStore();

  const select = useSelector(state => ({
    activeModal: state.modals.name,
    isAuthorized: state.auth.authorized,
  }));

  useInit(() => {
    store.actions.auth.checkAuth();
  }, []);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/profile'} element={
          <ProtectedRoute isAuth={select.isAuthorized}>
            <Profile />
          </ProtectedRoute>
        } />
      </Routes>
      {select.activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
