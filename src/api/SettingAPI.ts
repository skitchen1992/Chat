import BaseAPI from "./BaseAPI";

export interface ChangePasswordData {
  oldPassword: string
  newPassword: string
}

export interface ChangeProfileData {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
}

export class SettingAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  changePassword(data: ChangePasswordData) {
    return this.http.put('/password', data);
  }

  changeProfile(data: ChangeProfileData) {
    return this.http.put('/profile', data);
  }

  changeAvatar(data: ChangeProfileData) {
    return this.http.put('/profile/avatar', data);
  }

  create = undefined;
  update = undefined;
  delete = undefined;
  read = undefined
}

export default new SettingAPI();
