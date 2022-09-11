import { Button } from "../../components/button";
import { ErrorMessage } from "../../components/errorMessage";
import { Input } from "../../components/input";
import Block from "../../utils/Block";
import { validationPatterns } from "../../utils/validationPatterns";
import template from "../changePassword/changePassword.pug";
import account from "../../../public/icons/account.png";
import arrow from "../../../public/icons/arrow.png";
import * as styles from "./changePassword.scss";

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
      variant: "round",
      icon: arrow,
      events: {
        click: () => console.log("buttonBack")
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
        blur: (e: Event) => this.validate(e, (this.children.inputPassword as Block).setProps),
        focus: (e: Event) => this.validate(e, (this.children.inputPassword as Block).setProps)
      }
    });

    this.children.inputNewPassword = new Input({
      type: "password",
      name: "newPassword",
      size: "small",
      events: {
        blur: (e: Event) => this.validate(e, (this.children.inputNewPassword as Block).setProps),
        focus: (e: Event) => this.validate(e, (this.children.inputNewPassword as Block).setProps)
      }
    });

    this.children.inputNewPasswordElse = new Input({
      type: "password",
      name: "newPasswordElse",
      size: "small",
      events: {
        blur: (e: Event) => this.validate(e, (this.children.inputNewPasswordElse as Block).setProps),
        focus: (e: Event) => this.validate(e, (this.children.inputNewPasswordElse as Block).setProps)
      }
    });
  }


  validate(event: Event, setProps: (nextProps: any) => void) {

    const target = event.target as HTMLInputElement;
    const field = target.name;

    if (event.type === "blur") {
      if (!this.isValid(target.value, field)) {

        setProps({ error: true });

        this.setDisableButton(true);
      }
    }

    if (event.type === "focus") {
      if (target.classList.contains("invalid")) {

        setProps({ error: false });

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

    const isPasswordValid = this.isValid(form.password as string, "password");
    const isNewPasswordValid = this.isValid(form.newPassword as string, "newPassword");
    const isPasswordElseValid = this.isValid(form.newPassword as string, "newPasswordElse");

    if (isPasswordValid && form.newPassword === form.newPasswordElse) {
      console.log("formData", form);
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

    const password = formData.get("password");
    const newPassword = formData.get("newPassword");
    const newPasswordElse = formData.get("newPasswordElse");

    return { password, newPassword, newPasswordElse };
  }

  render() {
    return this.compile(template, { account: account, styles });
  }
}
