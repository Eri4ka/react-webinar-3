import StoreModule from "../module";
import { getErrorMessage } from "../../utils";
import { addFieldToLS, removeFieldFromLS, getFieldFromLS } from "../../utils";

/**
 * Информация о текущем пользователе
 */
class UserState extends StoreModule {
  _tokenKey = 'token';

  initState() {
    return {
      data: {},
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
      data: {},
      waiting: true,
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
        data: json.result.user,
        waiting: false
      }, 'Пользователь авторизован');

      addFieldToLS(this._tokenKey, json.result.token);

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

    this.setState({
      ...this.initState()
    }, 'Пользователь разлогинен');

    removeFieldFromLS(this._tokenKey);
  }

  async getUser() {
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
        data: json.result,
        waiting: false
      }, 'Пользователь загружен');

    } catch (e) {
      this.setState({
        ...this.getState(),
        waiting: false,
        errorMessage: getErrorMessage(e)
      });
    }
  }
}

export default UserState;
