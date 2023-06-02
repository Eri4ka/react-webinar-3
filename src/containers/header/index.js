import {memo, useCallback} from "react";
import { Link } from "react-router-dom";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import SideLayout from "../../components/side-layout";
import AuthInfo from "../../components/auth-info";

function Header() {

  const store = useStore();

  const select = useSelector(state => ({
    user: state.user.data,
  }));

  const callbacks = {
    // Разлогиниться
    onLogout: useCallback(() => store.actions.user.logout(), [store])
  };

  const {t} = useTranslate();

  const renders = {
    authButton: useCallback(() => (
      Object.keys(select.user).length === 0 ? (
        <Link to={'/login'}><button >{t('user.login')}</button></Link>
      ) : (
        <button onClick={callbacks.onLogout}>{t('user.logout')}</button>
      )
    ), [select.user, t]),
    profile: useCallback(() => (
      Object.keys(select.user).length !== 0 && (
        <Link to={'/profile'}>{select.user.profile.name ? select.user.profile.name : t('user.defaultName')}</Link>
      )
    ), [select.user, t])
  };

  return (
    <SideLayout padding='small' side='end'>
      <AuthInfo renderAuthButton={renders.authButton} renderProfile={renders.profile} />
    </SideLayout>
  )
}

export default memo(Header);
