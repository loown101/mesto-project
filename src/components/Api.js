export default class Api {
  constructor(data) {
    this._headers = data.headers;
    this._baseUrl = data.baseUrl;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(res);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: this._headers,
    })
      .then(this._checkResponse);
  }

  getCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: this._headers,
    })
      .then(this._checkResponse);
  }

  editUserInfo(nameInputValue, jobInputValue) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: `${nameInputValue}`,
        about: `${jobInputValue}`,
      }),
    })
      .then(this._checkResponse);
  }

  addCard(placeLinkValue, placeDescriptionValue) {
    return fetch(`${this._baseUrl}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: `${placeDescriptionValue}`,
        link: `${placeLinkValue}`,
      }),
    })
      .then(this._checkResponse);
  }

  deleteCard(cardID) {
    return fetch(`${this._baseUrl}cards/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._checkResponse);
  }

  getLikeCard(cardID, method) {
    return fetch(`${this._baseUrl}cards/likes/${cardID}`, {
      method: method,
      headers: this._headers,
    })
      .then(this._checkResponse);
  }

  editAvatar(avatarInputValue) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: `${avatarInputValue}`,
      }),
    })
      .then(this._checkResponse);
  }
}

