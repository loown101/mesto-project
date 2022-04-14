export default class Api {
  constructor(data) {
    this._headers = data.headers;
    this._baseUrl = data.baseUrl;
    this._checkResponse = function (res) {
      console.log(res.json());
      return res.ok ? res.json() : Promise.reject(res);
    };
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  editUserInfo(nameInputValue, jobInputValue) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: `${nameInputValue}`,
        about: `${jobInputValue}`,
      }),
    }).then(this._checkResponse);
  }

  addCard(placeLinkValue, placeDescriptionValue) {
    return fetch(`${this._baseUrl}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: `${placeDescriptionValue}`,
        link: `${placeLinkValue}`,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardID) {
    return fetch(`${this._baseUrl}cards/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getlikeCard(cardID, method) {
    return fetch(`${this._baseUrl}cards/likes/${cardID}`, {
      method: method,
      headers: this._headers,
    }).then(this._checkResponse);
  }

  editAvatar(avatarInputValue) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: `${avatarInputValue}`,
      }),
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-8/",
  headers: {
    Authorization: "ea0f5ff1-1f3b-4f72-b28c-164c5b7a6982",
    "Content-type": "application/json",
  },
});
