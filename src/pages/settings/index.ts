import { IUser } from "../../api/AuthAPI";
import SettingController from "../../controllers/SettingController";
import Block from "../../utils/Block";
import { withStore } from "../../utils/Store";
import { validationPatterns } from "../../utils/validationPatterns";
import template from "./settings.pug";
import * as styles from "./settings.scss";
import { Button } from "../../components/button";
import account from "../../../public/icons/account.png";
import { Input } from "../../components/input";
import arrow from "../../../public/icons/arrow.png";
import { Routes } from "../../index";
import Router from "../../utils/Router";
import { ErrorMessage } from "../../components/errorMessage";

class SettingsPageBase extends Block <IUser> {
  constructor(props: IUser) {
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

    this.children.buttonSave = new Button({
      variant: "contained",
      label: "Сохранить",
      events: {
        click: () => this.onSubmit()
      }
    });

    this.children.inputFile = new Input({
      type: "file",
      name: "file",
      size: "default",
      width: "135px",
      events: {
        change: () => {
          this.sendFile();
        }
      }
    });

    this.children.inputPost = new Input({
      type: "text",
      value: this.props.email,
      name: "email",
      size: "small",
      events: {
        blur: (e: Event) => this.validate(e, (this.children.inputPost as Block).setProps, this.children.errorMessagePost as Block),
        focus: (e: Event) => this.validate(e, (this.children.inputPost as Block).setProps, this.children.errorMessagePost as Block)
      }
    });

    this.children.errorMessagePost = new ErrorMessage({
      label: "Не корректная почта"
    });

    this.children.inputLogin = new Input({
      type: "text",
      name: "login",
      size: "small",
      value: this.props.login,
      events: {
        blur: (e: Event) => this.validate(e, (this.children.inputLogin as Block).setProps, this.children.errorMessageLogin as Block),
        focus: (e: Event) => this.validate(e, (this.children.inputLogin as Block).setProps, this.children.errorMessageLogin as Block)
      }
    });

    this.children.errorMessageLogin = new ErrorMessage({
      label: "От 3 до 20 символов, латиница"
    });

    this.children.inputFirstName = new Input({
      type: "text",
      name: "first_name",
      size: "small",
      value: this.props.first_name,
      events: {
        blur: (e: Event) => this.validate(e, (this.children.inputFirstName as Block).setProps, this.children.errorMessageFirstName as Block),
        focus: (e: Event) => this.validate(e, (this.children.inputFirstName as Block).setProps, this.children.errorMessageFirstName as Block)
      }
    });

    this.children.errorMessageFirstName = new ErrorMessage({
      label: "Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр"
    });

    this.children.inputSecondName = new Input({
      type: "text",
      name: "second_name",
      size: "small",
      value: this.props.second_name,
      events: {
        blur: (e: Event) => this.validate(e, (this.children.inputSecondName as Block).setProps, this.children.errorMessageSecondName as Block),
        focus: (e: Event) => this.validate(e, (this.children.inputSecondName as Block).setProps, this.children.errorMessageSecondName as Block)
      }
    });

    this.children.errorMessageSecondName = new ErrorMessage({
      label: "Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр"
    });

    this.children.inputPhone = new Input({
      type: "text",
      name: "phone",
      size: "small",
      value: this.props.phone,
      events: {
        blur: (e: Event) => this.validate(e, (this.children.inputPhone as Block).setProps, this.children.errorMessagePhone as Block),
        focus: (e: Event) => this.validate(e, (this.children.inputPhone as Block).setProps, this.children.errorMessagePhone as Block)
      }
    });

    this.children.errorMessagePhone = new ErrorMessage({
      label: "От 10 до 15 символов, состоит из цифр, может начинается с плюса."
    });
  }

  sendFile() {
    const input = this.children.inputFile as Input;
    const file = input?.getFiles();
    const formData = new FormData();

    if (file) {
      formData.append("avatar", file[0], `${file[0].name}`);
    }

    SettingController.changeAvatar(formData);
  }

  validate(event: Event, setProps: (nextProps: any) => void, block: Block) {

    const target = event.target as HTMLInputElement;
    const field = target.name;

    if (event.type === "blur") {
      if (!this.isValid(target.value, field)) {

        setProps({ error: true });
        block.show();

        this.setDisableButton(true);
      }
    }

    if (event.type === "focus") {
      if (target.classList.contains("invalid")) {

        setProps({ error: false });
        block.hide();

        this.setDisableButton(false);
      }
    }
  }

  setDisableButton(isDisable: boolean) {
    (this.children.buttonSave as Block).setProps({ disabled: isDisable });
  }

  isValid(value: string, field: string) {
    switch (field) {
      case "login":
        return validationPatterns.login.test(value);
      case "email":
        return validationPatterns.email.test(value);
      case "first_name":
      case "second_name":
        return validationPatterns.username.test(value);
      case "phone":
        return validationPatterns.phone.test(value);
    }
  }

  onSubmit() {
    const form = this.getForm();

    const isEmailValid = this.isValid(form.email, "email");
    const isLoginValid = this.isValid(form.login, "login");
    const isFirstNameValid = this.isValid(form.first_name, "first_name");
    const isSecondNameValid = this.isValid(form.second_name, "second_name");
    const isPhoneValid = this.isValid(form.phone, "phone");

    if (isLoginValid && isEmailValid && isFirstNameValid && isSecondNameValid && isPhoneValid) {
      SettingController.changeProfile(form);
    }

    (this.children.inputPost as Block).setProps({ error: !isEmailValid });

    (this.children.inputLogin as Block).setProps({ error: !isLoginValid });

    (this.children.inputFirstName as Block).setProps({ error: !isFirstNameValid });

    (this.children.inputSecondName as Block).setProps({ error: !isSecondNameValid });

    (this.children.inputPhone as Block).setProps({ error: !isPhoneValid });

  }

  getForm() {
    const form = document.getElementById("changeProfile__form") as HTMLFormElement;

    const formData = new FormData(form);

    const email = formData.get("email") as string;
    const login = formData.get("login") as string;
    const first_name = formData.get("first_name") as string;
    const second_name = formData.get("second_name") as string;
    const phone = formData.get("phone") as string;
    const display_name = "";


    return { email, login, first_name, second_name, phone, display_name };
  }

  render() {
    return this.compile(template, { account: account, styles });
  }
}

const withUser = withStore((state) => ({ ...state.user }));

export const SettingsPage = withUser(SettingsPageBase);
