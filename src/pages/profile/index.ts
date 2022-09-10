import Block from "../../utils/Block";
import template from "../profile/profile.pug";
import * as styles from "./profile.scss";
import { ButtonLink } from "../../components/buttonLink";
import arrow from "../../icons/arrow.png";
import account from "../../icons/account.png";
import { Button } from "../../components/button";

interface IProfileList {
  label: string,
  value: string
}

interface IProfileProps {
  profileName: string;
  profileList: IProfileList[];
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
        click: () => console.log("buttonBack")
      }
    });
    this.children.buttonDate = new ButtonLink({
      label: "Изменить данные",
      events: {
        click: () => console.log("Изменить данные")
      }
    });
    this.children.buttonPass = new ButtonLink({
      label: "Изменить пароль",
      events: {
        click: () => console.log("Изменить пароль")
      }
    });
    this.children.buttonExit = new ButtonLink({
      label: "Выйти",
      variant: "alert",
      events: {
        click: () => console.log("Выйти")
      }
    });

  }

  render() {
    return this.compile(template, {
      profileName: this.props.profileName,
      account: account,
      styles,
      profileList: this.props.profileList
    });
  }
}
