import { LoginPage } from "./pages/login";
import Router from "./utils/Router";
import AuthController from "./controllers/AuthController";
import { RegistrationPage } from "./pages/registration";
import { ProfilePage} from "./pages/profile";
import { SettingsPage } from "./pages/settings";
import { ChangePasswordPage} from "./pages/changePassword";
import { MessengerPage } from "./pages/messenger";
import { Page404 } from "./pages/page404";
import '../public/reset.scss';

export enum Routes {
  Index = "/",
  Register = "/sign-up",
  Profile = "/profile",
  Settings = "/settings",
  Password = "/password",
  Messenger = "/messenger",
  Page404 = "/404"
}

window.addEventListener("DOMContentLoaded", async () => {
  Router
    .use(Routes.Index, LoginPage)
    .use(Routes.Register, RegistrationPage)
    .use(Routes.Profile, ProfilePage)
    .use(Routes.Settings, SettingsPage)
    .use(Routes.Password, ChangePasswordPage)
    .use(Routes.Messenger, MessengerPage)
    .use(Routes.Page404, Page404);

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.Register:
      isProtectedRoute = false;
      break;
  }

  try {
    await AuthController.fetchUser();

    Router.start();

    if (!isProtectedRoute) {
      Router.go(Routes.Messenger);
    }
  } catch (e) {
    Router.start();

    if (isProtectedRoute) {
      Router.go(Routes.Index);
    }
  }

});
