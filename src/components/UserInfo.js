import { profileIdKey } from "../utils/constants";

export default class UserInfo {
  constructor(elements) {
    this._profileName = elements.name;
    this._profileJob = elements.info;
    this._profileAvatar = elements.avatar;
  }

  setUserInfo(data) {
    sessionStorage.setItem(profileIdKey, data._id);
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
      about: this._profileJob.textContent,
    };

    return this._userData;
  }
}
