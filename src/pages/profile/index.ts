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
import { withStore } from "../../utils/Store";
import { IUser } from "../../api/AuthAPI";
import { getUserInfoList } from "./getProfileList";
import HTTPTransport from "../../utils/HTTPTransport";

class ProfilePageBase extends Block <IUser> {
  constructor(props: IUser) {
    super("div", props);
  }

  init() {
    AuthController.fetchUser();

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

  getUserInfoList() {
    return getUserInfoList(this.props);
  }

  render() {
    const user = this.props;
    return this.compile(template, {
      profileName: this.props.first_name,
      styles,
      userInfoList: this.getUserInfoList(),
      logo: user?.avatar ? `${HTTPTransport.API_URL}/resources${user?.avatar}` : account
    });
  }
}

const withUser = withStore((state) => ({ ...state.user }));

export const ProfilePage = withUser(ProfilePageBase);
