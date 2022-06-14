export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector, handleGetUserInfo }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._handleGetUserInfo = handleGetUserInfo;
  }

  getUserInfo() {
    return this._handleGetUserInfo()
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.src = avatar;
    this._id = _id;
  }

}
