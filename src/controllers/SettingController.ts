import API, { ChangePasswordData, ChangeProfileData, SettingAPI } from "../api/SettingAPI";
import { Routes } from "../index";
import router from "../utils/Router";
import store from "../utils/Store";
import HTTPTransport from "../utils/HTTPTransport";

export class SettingController {
  private readonly api: SettingAPI;

  constructor() {
    this.api = API;
  }


  async changePassword(data: ChangePasswordData) {
    try {
      await this.api.changePassword(data);

      router.go(Routes.Messenger);
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async changeProfile(data: ChangeProfileData) {
    try {
      const user = await this.api.changeProfile(data);

      store.set("user", user);

      router.go(Routes.Messenger);
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async changeAvatar(formData: FormData) {
    try {
      const user = await fetch(`${HTTPTransport.API_URL}/user/profile/avatar`, {
        method: "PUT",
        credentials: "include",
        mode: "cors",
        body: formData
      });

      store.set("user", user);

      router.go(Routes.Profile);
    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export default new SettingController();
