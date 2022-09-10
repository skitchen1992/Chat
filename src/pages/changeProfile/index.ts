import Block from "../../utils/Block";
import { validationPatterns } from "../../utils/validationPatterns";
import template from "../changeProfile/changeProfile.pug";
import * as styles from "./changeProfile.scss";
import { Button } from "../../components/button";
import account from "../../icons/account.png";
import { Input } from "../../components/input";
import arrow from "../../icons/arrow.png";

interface IChangeProfileProps {
  email: string,
  login: string,
  firstName: string,
  secondName: string,
  phone: string
}

export class ChangeProfilePage extends Block <IChangeProfileProps> {
  constructor(props: IChangeProfileProps) {
    super("div", props);

  }

  init() {
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

    this.children.inputPost = new Input({
      type: "text",
      name: "email",
      size: "small",
      value: this.props.email,
      events: {
        blur: (e: Event) => this.validate(e, (this.children.inputPost as Block).setProps),
        focus: (e: Event) => this.validate(e, (this.children.inputPost as Block).setProps)
      }
    });

    this.children.inputLogin = new Input({
      type: "text",
      name: "login",
      size: "small",
      value: this.props.login,
      events: {
        blur: (e: Event) => this.validate(e, (this.children.inputLogin as Block).setProps),
        focus: (e: Event) => this.validate(e, (this.children.inputLogin as Block).setProps)
      }
    });

    this.children.inputFirstName = new Input({
      type: "text",
      name: "first_name",
      size: "small",
      value: this.props.firstName,
      events: {
        blur: (e: Event) => this.validate(e, (this.children.inputFirstName as Block).setProps),
        focus: (e: Event) => this.validate(e, (this.children.inputFirstName as Block).setProps)
      }
    });

    this.children.inputSecondName = new Input({
      type: "text",
      name: "second_name",
      size: "small",
      value: this.props.secondName,
      events: {
        blur: (e: Event) => this.validate(e, (this.children.inputSecondName as Block).setProps),
        focus: (e: Event) => this.validate(e, (this.children.inputSecondName as Block).setProps)
      }
    });

    this.children.inputPhone = new Input({
      type: "text",
      name: "phone",
      size: "small",
      value: this.props.phone,
      events: {
        blur: (e: Event) => this.validate(e, (this.children.inputPhone as Block).setProps),
        focus: (e: Event) => this.validate(e, (this.children.inputPhone as Block).setProps)
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

    const isEmailValid = this.isValid(form.email as string, "email");
    const isLoginValid = this.isValid(form.login as string, "login");
    const isFirstNameValid = this.isValid(form.firstName as string, "first_name");
    const isSecondNameValid = this.isValid(form.secondName as string, "second_name");
    const isPhoneValid = this.isValid(form.phone as string, "phone");

    if (isLoginValid && isEmailValid && isFirstNameValid && isSecondNameValid && isPhoneValid) {
      console.log("formData", form);
    }

    if (!isEmailValid) {
      (this.children.inputPost as Block).setProps({ error: true });
    }
    if (isEmailValid) {
      (this.children.inputPost as Block).setProps({ error: false });
    }

    if (!isLoginValid) {
      (this.children.inputLogin as Block).setProps({ error: true });
    }
    if (isLoginValid) {
      (this.children.inputLogin as Block).setProps({ error: false });
    }

    if (!isFirstNameValid) {
      (this.children.inputFirstName as Block).setProps({ error: true });
    }
    if (isFirstNameValid) {
      (this.children.inputFirstName as Block).setProps({ error: false });
    }

    if (!isSecondNameValid) {
      (this.children.inputSecondName as Block).setProps({ error: true });
    }
    if (isFirstNameValid) {
      (this.children.inputSecondName as Block).setProps({ error: false });
    }
    if (!isPhoneValid) {
      (this.children.inputPhone as Block).setProps({ error: true });
    }
    if (isPhoneValid) {
      (this.children.inputPhone as Block).setProps({ error: false });
    }

  }

  getForm() {
    const form = document.getElementById("changeProfile__form") as HTMLFormElement;

    const formData = new FormData(form);

    const email = formData.get("email");
    const login = formData.get("login");
    const firstName = formData.get("first_name");
    const secondName = formData.get("second_name");
    const phone = formData.get("phone");

    return { email, login, firstName, secondName, phone };
  }

  render() {
    return this.compile(template, { account: account, styles });
  }
}
