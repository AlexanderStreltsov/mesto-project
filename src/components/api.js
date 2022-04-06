const onResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res);
};

const getAllCards = (config) => {
  return fetch(`${config.urlCards}`, {
    headers: config.headers,
  }).then(onResponse);
};

const getProfileInfo = (config) => {
  return fetch(`${config.urlProfile}`, {
    headers: config.headers,
  }).then(onResponse);
};

const editProfileInfo = (data, config) => {
  return fetch(`${config.urlProfile}`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(onResponse);
};

const addCard = (data, config) => {
  return fetch(`${config.urlCards}`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(onResponse);
};

const deleteCard = (id, config) => {
  return fetch(`${config.urlCards}/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(onResponse);
};

const addLike = (id, config) => {
  return fetch(`${config.urlLikes}/${id}`, {
    method: "PUT",
    headers: config.headers,
  }).then(onResponse);
};

const deleteLike = (id, config) => {
  return fetch(`${config.urlLikes}/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(onResponse);
};

export {
  getAllCards,
  getProfileInfo,
  editProfileInfo,
  addCard,
  deleteCard,
  addLike,
  deleteLike,
};
