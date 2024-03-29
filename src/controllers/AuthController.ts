import API, { AuthAPI, SigninData, SignupData } from "../api/AuthAPI";
import store from "../utils/Store";
import router from "../utils/Router";
import { Routes } from "../index";
import MessagesController from "./MessagesController";

export class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = API;
  }

  async signin(data: SigninData) {
    try {
      await this.api.signin(data);

      router.go(Routes.Messenger);
    } catch (e: any) {
      console.error(e);
    }
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data);

      await this.fetchUser();

      router.go(Routes.Messenger);
    } catch (e: any) {
      console.error(e);
    }
  }

  async fetchUser() {
    try {
      const user = await this.api.read();
      store.set("user", user);
    } catch (e: any) {
      console.error(e);
    }
  }

  async logout() {
    try {
      MessagesController.closeAll();
      await this.api.logout();

      router.go(Routes.Index);
    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export default new AuthController();
