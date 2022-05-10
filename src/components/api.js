export default class Api {
  constructor(options) {
    this._url = options.url
    this._headers = options.headers
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(res);
  }

  _getUserInfo() {
    return fetch(this._url + '/users/me', {
      method: 'GET',
      headers: this._headers
    })
      .then(this._checkResponse)
  }
  
  setUserInfo (data) {
    return fetch(this._url + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      }),
    })
    .then(this._checkResponse);
  };

  updateUserAvatar (data) {
    return fetch(this._url + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      }),
    })
    .then(this._checkResponse);
  };

  getData() {
    return Promise.all([this._getUserInfo()]) // добавить карточки
  }
}

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res);
};

const getCards = (config) => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkResponse);
};

// const getUserInfo = (config) => {
//   return fetch(`${config.baseUrl}/users/me`, {
//     headers: config.headers,
//   }).then(checkResponse);
// };

// const editUserInfo = (data, config) => {
//   return fetch(`${config.baseUrl}/users/me`, {
//     method: "PATCH",
//     headers: config.headers,
//     body: JSON.stringify(data),
//   }).then(checkResponse);
// };

const addCard = (data, config) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(checkResponse);
};

const deleteCard = (id, config) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
};

const addLike = (id, config) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  }).then(checkResponse);
};

const deleteLike = (id, config) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
};

// const updateUserAvatar = (data, config) => {
//   return fetch(`${config.baseUrl}/users/me/avatar`, {
//     method: "PATCH",
//     headers: config.headers,
//     body: JSON.stringify(data),
//   }).then(checkResponse);
// };

export {
  getCards,
  addCard,
  deleteCard,
  addLike,
  deleteLike,
 // getUserInfo,
 // editUserInfo,
  //updateUserAvatar,
};
