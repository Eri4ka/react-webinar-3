import StoreModule from "../module";
import { getErrorMessage } from "../../utils";
import { addFieldToLS, removeFieldFromLS, getFieldFromLS } from "../../utils";

/**
 * Информация о текущем пользователе
 */
class AuthState extends StoreModule {
  _tokenKey = 'token';
  _autorizedKey = 'authorized';

  initState() {
    return {
      authorized: getFieldFromLS(this._autorizedKey, '') || false,
      userName: '',
      waiting: false,
      errorMessage: '',
    }
  }

  /**
   * Авторизация пользователя
   * @param body {Object}
   * @return {Promise<void>}
   */
  async login(body) {
    this.setState({
      authorized: false,
      waiting: true,
      userName: '',
      errorMessage: '',
    });

    try {
      const response = await fetch('/api/v1/users/sign?fields=_id,email,profile(name,phone)', {
        headers: {
          "Content-Type": "application/json",
        },
        method: 'POST',
        body: JSON.stringify(body)
      });

      const json = await response.json();

      if (!response.ok) {
        throw json.error;
      }

      this.setState({
        ...this.getState(),
        authorized: true,
        userName: json.result.user.profile.name,
        waiting: false
      }, 'Пользователь авторизован');

      addFieldToLS(this._tokenKey, json.result.token);
      addFieldToLS(this._autorizedKey, true);

    } catch (e) {
      this.setState({
        ...this.getState(),
        waiting: false,
        errorMessage: getErrorMessage(e)
      });
    }
  }

  async logout() {
    if (!getFieldFromLS(this._tokenKey, '')) {
      return;
    };
    
    await fetch('/api/v1/users/sign', {
      headers: {
        "X-Token": getFieldFromLS(this._tokenKey, ''),
      },
      method: 'DELETE'
    });

    removeFieldFromLS(this._tokenKey);
    removeFieldFromLS(this._autorizedKey);

    this.setState({
      ...this.initState()
    }, 'Пользователь разлогинен');
  }

  async checkAuth() {
    if (!getFieldFromLS(this._tokenKey, '')) {
      return;
    };

    this.setState({
      ...this.getState(),
      waiting: true,
      errorMessage: '',
    });

    try {
      const response = await fetch('/api/v1/users/self?fields=_id,email,profile(name,phone)', {
        headers: {
          "X-Token": getFieldFromLS(this._tokenKey, ''),
        }
      });

      const json = await response.json();
      
      if (!response.ok) {
        throw json.error;
      }

      this.setState({
        ...this.getState(),
        authorized: true,
        userName: json.result.profile.name,
        waiting: false
      }, 'Пользователь авторизован');

    } catch (e) {
      this.setState({
        ...this.getState(),
        waiting: false,
        errorMessage: getErrorMessage(e)
      });
    }
  }

  /**
   * Сброс текста ошибки
   */
  resetErrorText() {
    this.setState({
      ...this.getState(),
      errorMessage: ''
    });
  }
}

export default AuthState;
