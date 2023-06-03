import {memo, useCallback, useEffect, useState} from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Input from "../../components/input";
import { useNavigate } from "react-router-dom";
import AuthFormLayout from "../../components/authform-layout";
import InputLabel from "../../components/input-label";
import useInit from "../../hooks/use-init";

function LoginForm() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const store = useStore();

  const select = useSelector(state => ({
    isAuthorized: state.auth.authorized,
    errorMessage: state.auth.errorMessage,
    waiting: state.auth.waiting,
  }));

  const isDisabledForm = !login || !password || select.waiting;

  const callbacks = {
    // Установка логина
    onAddLogin: useCallback(login => setLogin(login), []),
    // Установка пароля
    onAddPassword: useCallback(password => setPassword(password), []),
    // Вызов формы
    onSubmitForm: useCallback(event => {
      event.preventDefault();
      store.actions.auth.login({ login, password });
    }),
    // Сброс состоянии авторизации
    onResetErrorText: useCallback(() => store.actions.auth.resetErrorText(), [store]),
  };

  useEffect(() => {
    if (select.isAuthorized) {
      navigate(-1);
    }
  }, [select.isAuthorized]);

  useInit(() => {
    callbacks.onResetErrorText()
  }, [])

  const {t} = useTranslate();

  return (
    <AuthFormLayout 
      title={t('login.title')} 
      onSubmit={callbacks.onSubmitForm}
      submitButtonText={t('login.enter')}
      errorMessage={select.errorMessage}
      isDisabled={isDisabledForm}
      isActive={select.waiting}
      >
      <InputLabel text={t('login.labelLogin')} inputName='login' >
        <Input 
          theme='medium' 
          onChange={callbacks.onAddLogin} 
          value={login} 
          name='login'
          debounceTime={0}
        />
      </InputLabel>
      <InputLabel text={t('login.labelPass')} inputName='password' >
        <Input 
          theme='medium' 
          onChange={callbacks.onAddPassword} 
          value={password} 
          name='password' 
          type='password'
          debounceTime={0}
        />
      </InputLabel>
    </AuthFormLayout>
  )
}

export default memo(LoginForm);
