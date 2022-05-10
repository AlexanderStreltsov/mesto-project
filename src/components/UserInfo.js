export default class UserInfo {
  constructor(userSelectors) {
    this._profileName = userSelectors.name;
    this._profileJob = userSelectors.info;
    this._profileAvatar = userSelectors.avatar;
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileJob.textContent = data.about;
    this.setUserAvatar(data);
  }

  setUserAvatar(data) {
    this._profileAvatar.style.backgroundImage = `url(${data.avatar})`;
  }

  getUserInfo() {
    this._userData = {
      name: this._profileName.textContent,
      info: this._profileJob.textContent,
    };

    return this._userData;
  }
}
