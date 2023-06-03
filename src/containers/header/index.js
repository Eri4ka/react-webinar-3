import {memo, useCallback} from "react";
import { Link } from "react-router-dom";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import AuthInfo from "../../components/auth-info";

function Header() {

  const store = useStore();

  const select = useSelector(state => ({
    isAuthorized: state.auth.authorized,
    userName: state.auth.userName,
  }));

  const callbacks = {
    // Разлогиниться
    onLogout: useCallback(() => store.actions.auth.logout(), [store])
  };

  const {t} = useTranslate();

  const renders = {
    authButton: useCallback(() => (
      !select.isAuthorized ? (
        <Link to={'/login'}><button >{t('user.login')}</button></Link>
      ) : (
        <button onClick={callbacks.onLogout}>{t('user.logout')}</button>
      )
    ), [select.isAuthorized, t]),
    profile: useCallback(() => (
      select.isAuthorized && (
        <Link to={'/profile'}>{select.userName ? select.userName : t('user.defaultName')}</Link>
      )
    ), [select.isAuthorized, select.userName, t])
  };

  return <AuthInfo renderAuthButton={renders.authButton} renderProfile={renders.profile} />
}

export default memo(Header);
