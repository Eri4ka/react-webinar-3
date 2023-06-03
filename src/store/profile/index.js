import StoreModule from "../module";
import { getErrorMessage } from "../../utils";
import { getFieldFromLS } from "../../utils";

/**
 * Информация о текущем пользователе
 */
class ProfileState extends StoreModule {
  _tokenKey = 'token';

  initState() {
    return {
      data: {},
      waiting: false,
      errorMessage: '',
    }
  }

  async getProfileData() {
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
      }, 'Данные по профилю загружены');

    } catch (e) {
      this.setState({
        ...this.getState(),
        waiting: false,
        errorMessage: getErrorMessage(e)
      });
    }
  }
}

export default ProfileState;
