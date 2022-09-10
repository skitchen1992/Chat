import { ChatPage } from "./pages/chat";
import { LoginPage } from "./pages/login";
import { ChangePasswordPage } from "./pages/changePassword";
import { ChangeProfilePage } from "./pages/changeProfile";
import { HomePage } from "./pages/home";
import { Page404 } from "./pages/page404";
import { Page500 } from "./pages/page500";
import { ProfilePage } from "./pages/profile";
import { RegistrationPage } from "./pages/registration";

const profileList = [
  { label: "Почта", value: "pochta@yandex.ru" },
  { label: "Логин", value: "nik" },
  { label: "Имя", value: "Никита" },
  { label: "Фамилия", value: "Лав" },
  { label: "Телефон", value: "+79999999999" }
];

window.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("#app")!;
  const path = document.location.pathname;

  switch (path) {
    case "/":
      const homePage = new HomePage({ title: "Home page" });
      root.append(homePage.getContent()!);
      homePage.dispatchComponentDidMount();
      break;
    case "/src/pages/login/login.pug":
      const authorizationPage = new LoginPage({ title: "Вход" });
      root.append(authorizationPage.getContent()!);
      authorizationPage.dispatchComponentDidMount();
      break;
    case "/src/pages/registration/registration.pug":
      const registrationPage = new RegistrationPage({ title: "Регистрация" });
      root.append(registrationPage.getContent()!);
      registrationPage.dispatchComponentDidMount();
      break;
    case "/src/pages/page500/page500.pug":
      const page500 = new Page500({ errorCode: "500", errorMassage: "Мы уже чиним" });
      root.append(page500.getContent()!);
      page500.dispatchComponentDidMount();
      break;
    case "/src/pages/page404/page404.pug":
      const page404 = new Page404({ errorCode: "404", errorMassage: "Такой страницы нет" });
      root.append(page404.getContent()!);
      page404.dispatchComponentDidMount();
      break;
    case "/src/pages/profile/profile.pug":
      const profile = new ProfilePage({ profileName: "Никита", profileList });
      root.append(profile.getContent()!);
      profile.dispatchComponentDidMount();
      break;
    case "/src/pages/changeProfile/changeProfile.pug":
      const changeProfile = new ChangeProfilePage({
        login: "Nikita",
        email: "pochta@yandex.ru",
        phone: "+79999999999",
        firstName: "Nikita",
        secondName: "Lav"
      });
      root.append(changeProfile.getContent()!);
      changeProfile.dispatchComponentDidMount();
      break;
    case "/src/pages/changePassword/changePassword.pug":
      const changePassword = new ChangePasswordPage({});
      root.append(changePassword.getContent()!);
      changePassword.dispatchComponentDidMount();
      break;
    case "/src/pages/chat/chat.pug":
      const chat = new ChatPage({});
      root.append(chat.getContent()!);
      chat.dispatchComponentDidMount();
      break;
  }
});
