import API, { ChangePasswordData, ChangeProfileData, SettingAPI } from "../api/SettingAPI";
import { Routes } from "../index";
import router from "../utils/Router";
import store from "../utils/Store";

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

  async changeAvatar(data: ChangeProfileData) {
    try {
      const user = await this.api.changeProfile(data);

      store.set("user", user);

      router.go(Routes.Messenger);
    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export default new SettingController();
