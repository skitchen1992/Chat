import Block from "../../utils/Block";
import template from "../profile/profile.pug";
import * as styles from "./profile.scss";
import { ButtonLink } from "../../components/buttonLink";
import arrow from "../../../public/icons/arrow.png";
import account from "../../../public/icons/account.png";
import { Button } from "../../components/button";
import { Routes } from "../../index";
import Router from "../../utils/Router";
import AuthController from "../../controllers/AuthController";

const profileList = [
  { label: "Почта", value: "pochta@yandex.ru" },
  { label: "Логин", value: "nik" },
  { label: "Имя", value: "Никита" },
  { label: "Фамилия", value: "Лав" },
  { label: "Телефон", value: "+79999999999" }
];

const profileName = "Никита";

interface IProfileList {
  label: string,
  value: string
}

interface IProfileProps {
  profileName?: string;
  profileList?: IProfileList[];
}

export class ProfilePage extends Block <IProfileProps> {
  constructor(props: IProfileProps) {
    super("div", props);

  }

  init() {
    this.children.buttonBack = new Button({
      icon: arrow,
      variant: "round",
      events: {
        click: () => Router.go(Routes.Messenger)
      }
    });

    this.children.buttonSettings = new ButtonLink({
      label: "Изменить данные",
      events: {
        click: () => Router.go(Routes.Settings)
      }
    });

    this.children.buttonPass = new ButtonLink({
      label: "Изменить пароль",
      events: {
        click: () => Router.go(Routes.Password)
      }
    });
    this.children.buttonExit = new ButtonLink({
      label: "Выйти",
      variant: "alert",
      events: {
        click: () => AuthController.logout()
      }
    });
  }

  render() {
    return this.compile(template, {
      profileName,
      account: account,
      styles,
      profileList
    });
  }
}
