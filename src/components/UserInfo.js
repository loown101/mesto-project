import { api } from '../pages/index.js'; // удалить в будущем
export default class UserInfo {
  constructor({ nameElement, aboutElement, avatarElement }) {
    this._name = nameElement;
    this._about = aboutElement;
    this._avatar = avatarElement;
  }

  getUserInfo(data) { // убрать связку
    api.getUserInfo()
      .then((res) => {
        data.name.value = res.name;
        data.about.value = res.about;
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      })
  }

  setUserInfo(config) {
    this._name.textContent = config.name;
    this._about.textContent = config.about;
    this._avatar.src = config.avatar;
  }

}
