const configCohort = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-8/',
  headers: {
    'Authorization': 'ea0f5ff1-1f3b-4f72-b28c-164c5b7a6982',
    'Content-type': 'application/json',
  }
}

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res)
}

function getUserInfo() {
  return fetch(`${configCohort.baseUrl}users/me`, {
    headers: configCohort.headers,
  })
    .then(checkResponse)
}

function getCards() {
  return fetch(`${configCohort.baseUrl}cards`, {
    headers: configCohort.headers,
  })
    .then(checkResponse)
}

function editUserInfo(nameInputValue, jobInputValue) {
  return fetch(`${configCohort.baseUrl}users/me`, {
    method: 'PATCH',
    headers: configCohort.headers,
    body: JSON.stringify({
      name: `${nameInputValue}`,
      about: `${jobInputValue}`,
    })
  })
    .then(checkResponse)
}

function addCard(placeLinkValue, placeDescriptionValue) {
  return fetch(`${configCohort.baseUrl}cards`, {
    method: 'POST',
    headers: configCohort.headers,
    body: JSON.stringify({
      name: `${placeDescriptionValue}`,
      link: `${placeLinkValue}`,
    })
  })
    .then(checkResponse)
}

function deleteCard(cardID) {
  return fetch(`${configCohort.baseUrl}cards/${cardID}`, {
    method: 'DELETE',
    headers: configCohort.headers,
  })
    .then(checkResponse)
}

function getlikeCard(cardID, method) {
  return fetch(`${configCohort.baseUrl}cards/likes/${cardID}`, {
    method: method,
    headers: configCohort.headers,
  })
    .then(checkResponse)
}

function editAvatar(avatarInputValue) {
  return fetch(`${configCohort.baseUrl}users/me/avatar`, {
    method: 'PATCH',
    headers: configCohort.headers,
    body: JSON.stringify({
      avatar: `${avatarInputValue}`,
    })
  })
    .then(checkResponse)
}

export {
  getUserInfo,
  getCards,
  addCard,
  editUserInfo,
  deleteCard,
  getlikeCard,
  editAvatar,
};

