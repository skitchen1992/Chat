import { Button } from "../../components/button";
import { ErrorMessage } from "../../components/errorMessage";
import { Input } from "../../components/input";
import SettingController from "../../controllers/SettingController";
import Block from "../../utils/Block";
import { validationPatterns } from "../../utils/validationPatterns";
import template from "../changePassword/changePassword.pug";
import account from "../../../public/icons/account.png";
import arrow from "../../../public/icons/arrow.png";
import * as styles from "./changePassword.scss";
import { Routes } from "../../index";
import Router from "../../utils/Router";

interface IChangePasswordProps {

}

export class ChangePasswordPage extends Block <IChangePasswordProps> {
  constructor(props: IChangePasswordProps) {
    super("div", props);

  }

  init() {
    this.children.errorMessage = new ErrorMessage({
      label: null
    });

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

    this.children.inputPassword = new Input({
      type: "password",
      name: "password",
      size: "small",
      events: {
        blur: (e: Event) => this.validate(e, (this.children.inputPassword as Block).setProps, this.children.errorMessagePassword as Block),
        focus: (e: Event) => this.validate(e, (this.children.inputPassword as Block).setProps, this.children.errorMessagePassword as Block)
      }
    });

    this.children.errorMessagePassword = new ErrorMessage({
      label: "Oт 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра."
    });

    this.children.inputNewPassword = new Input({
      type: "password",
      name: "newPassword",
      size: "small",
      events: {
        blur: (e: Event) => this.validate(e, (this.children.inputNewPassword as Block).setProps, this.children.errorMessageNewPassword as Block ),
        focus: (e: Event) => this.validate(e, (this.children.inputNewPassword as Block).setProps, this.children.errorMessageNewPassword as Block )
      }
    });

    this.children.errorMessageNewPassword = new ErrorMessage({
      label: "Oт 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра."
    });

    this.children.inputNewPasswordElse = new Input({
      type: "password",
      name: "newPasswordElse",
      size: "small",
      events: {
        blur: (e: Event) => this.validate(e, (this.children.inputNewPasswordElse as Block).setProps, this.children.errorMessageNewPasswordElse as Block),
        focus: (e: Event) => this.validate(e, (this.children.inputNewPasswordElse as Block).setProps, this.children.errorMessageNewPasswordElse as Block)
      }
    });

    this.children.errorMessageNewPasswordElse = new ErrorMessage({
      label: "Oт 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра."
    });
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
      case "password":
      case "newPassword":
      case "newPasswordElse":
        return validationPatterns.password.test(value);
    }
  }

  onSubmit() {
    const form = this.getForm();

    const isPasswordValid = this.isValid(form.password, "password");
    const isNewPasswordValid = this.isValid(form.newPassword, "newPassword");
    const isPasswordElseValid = this.isValid(form.newPassword, "newPasswordElse");

    if (isPasswordValid && form.newPassword === form.newPasswordElse) {
      SettingController.changePassword({ oldPassword: form.password, newPassword: form.newPassword })
    }

    (this.children.inputPassword as Block).setProps({ error: !isPasswordValid });

    (this.children.inputNewPassword as Block).setProps({ error: !isNewPasswordValid });

    (this.children.inputNewPasswordElse as Block).setProps({ error: !isPasswordElseValid });

    if (form.newPassword !== form.newPasswordElse) {
      (this.children.inputNewPassword as Block).setProps({ error: true });
      (this.children.inputNewPasswordElse as Block).setProps({ error: true });
      (this.children.errorMessage as Block).setProps({ label: "Пароли не совпадают" });
      (this.children.errorMessage as Block).show();
    }

    if (form.password && form.newPassword && form.newPasswordElse && form.newPassword === form.newPasswordElse) {
      (this.children.inputPassword as Block).setProps({ error: false });
      (this.children.inputNewPassword as Block).setProps({ error: false });
      (this.children.inputNewPasswordElse as Block).setProps({ error: false });
    }
  }

  getForm() {
    const form = document.getElementById("changePassword__form") as HTMLFormElement;

    const formData = new FormData(form);

    const password = formData.get("password") as string;
    const newPassword = formData.get("newPassword") as string;
    const newPasswordElse = formData.get("newPasswordElse") as string;

    return { password, newPassword, newPasswordElse };
  }

  render() {
    return this.compile(template, { account: account, styles });
  }
}
