import { ErrorMessage } from "../../components/errorMessage";
import Block from "../../utils/Block";
import { validationPatterns } from "../../utils/validationPatterns";
import template from "../registration/registration.pug";
import * as styles from "./registration.scss";
import { Button } from "../../components/button";
import { ButtonLink } from "../../components/buttonLink";
import { Input } from "../../components/input";

interface IRegistrationProps {
  title: string;
}

export class RegistrationPage extends Block <IRegistrationProps> {
  constructor(props: IRegistrationProps) {
    super("div", props);

  }

  init() {
    this.children.buttonRegistration = new Button({
      variant: "contained",
      label: "Зарегестрироваться",
      events: {
        click: () => this.onSubmit()
      }
    });

    this.children.buttonEnter = new ButtonLink({
      label: "Войти",
      events: {
        click: () => console.log("ButtonLink")
      }
    });

    this.children.inputPost = new Input({
      type: "text",
      label: "Почта",
      name: "email",
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
      label: "Логин",
      name: "login",
      events: {
        blur: (e: Event) => this.validate(e, (this.children.inputLogin as Block).setProps, this.children.errorMessageLogin as Block),
        focus: (e: Event) => this.validate(e, (this.children.inputLogin as Block).setProps, this.children.errorMessageLogin as Block)
      }
    });

    this.children.errorMessageLogin = new ErrorMessage({
      label: "Не корректный логин"
    });

    this.children.inputFirstName = new Input({
      type: "text",
      label: "Имя",
      name: "first_name",
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
      label: "Фамилия",
      name: "second_name",
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
      label: "Телефон",
      name: "phone",
      events: {
        blur: (e: Event) => this.validate(e, (this.children.inputPhone as Block).setProps, this.children.errorMessagePhone as Block),
        focus: (e: Event) => this.validate(e, (this.children.inputPhone as Block).setProps, this.children.errorMessagePhone as Block)
      }
    });

    this.children.errorMessagePhone = new ErrorMessage({
      label: "Не корректный номер"
    });

    this.children.inputPassword = new Input({
      label: "Пароль",
      type: "password",
      name: "password",
      events: {
        blur: (e: Event) => this.validate(e, (this.children.inputPassword as Block).setProps, this.children.errorMessagePassword as Block),
        focus: (e: Event) => this.validate(e, (this.children.inputPassword as Block).setProps, this.children.errorMessagePassword as Block)
      }
    });

    this.children.errorMessagePassword = new ErrorMessage({
      label: "Oт 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра."
    });

    this.children.inputPasswordElse = new Input({
      label: "Пароль (еще раз)",
      type: "password",
      name: "passwordElse",
      events: {
        blur: (e: Event) => this.validate(e, (this.children.inputPasswordElse as Block).setProps, this.children.errorMessagePasswordElse as Block),
        focus: (e: Event) => this.validate(e, (this.children.inputPasswordElse as Block).setProps, this.children.errorMessagePasswordElse as Block)
      }
    });

    this.children.errorMessagePasswordElse = new ErrorMessage({
      label: "Oт 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра."
    });
  }

  onSubmit() {
    const form = this.getForm();

    const isEmailValid = this.isValid(form.email as string, "email");
    const isLoginValid = this.isValid(form.login as string, "login");
    const isFirstNameValid = this.isValid(form.firstName as string, "first_name");
    const isSecondNameValid = this.isValid(form.second_name as string, "second_name");
    const isPhoneValid = this.isValid(form.phone as string, "phone");
    const isPasswordValid = this.isValid(form.password as string, "password");
    const isPasswordElse = this.isValid(form.passwordElse as string, "passwordElse");

    if (isLoginValid && isPasswordValid && isEmailValid && isFirstNameValid && isSecondNameValid && isPhoneValid && isPasswordElse && form.password === form.passwordElse) {
      console.log("formData", form);
    }

    if (!isEmailValid) {
      (this.children.inputPost as Block).setProps({ error: true });
      (this.children.errorMessagePost as Block).show();
    }
    if (isEmailValid) {
      (this.children.inputPost as Block).setProps({ error: false });
      (this.children.errorMessagePost as Block).hide();
    }

    if (!isLoginValid) {
      (this.children.inputLogin as Block).setProps({ error: true });
      (this.children.errorMessageLogin as Block).show();
    }
    if (isLoginValid) {
      (this.children.inputLogin as Block).setProps({ error: false });
      (this.children.errorMessageLogin as Block).hide();
    }

    if (!isFirstNameValid) {
      (this.children.inputFirstName as Block).setProps({ error: true });
      (this.children.errorMessageFirstName as Block).show();
    }
    if (isFirstNameValid) {
      (this.children.inputFirstName as Block).setProps({ error: false });
      (this.children.errorMessageFirstName as Block).hide();
    }

    if (!isSecondNameValid) {
      (this.children.inputSecondName as Block).setProps({ error: true });
      (this.children.errorMessageSecondName as Block).show();
    }
    if (isFirstNameValid) {
      (this.children.inputSecondName as Block).setProps({ error: false });
      (this.children.errorMessageSecondName as Block).hide();
    }

    if (!isPhoneValid) {
      (this.children.inputPhone as Block).setProps({ error: true });
      (this.children.errorMessagePhone as Block).show();
    }
    if (isPhoneValid) {
      (this.children.inputPhone as Block).setProps({ error: false });
      (this.children.errorMessagePhone as Block).hide();
    }

    if (!isPasswordValid) {
      (this.children.inputPassword as Block).setProps({ error: true });
      (this.children.errorMessagePassword as Block).show();
    }
    if (isPasswordValid) {
      (this.children.inputPassword as Block).setProps({ error: false });
      (this.children.errorMessagePassword as Block).hide();
    }

    if (!isPasswordElse) {
      (this.children.inputPasswordElse as Block).setProps({ error: true });
      (this.children.errorMessagePasswordElse as Block).show();
    }
    if (isPasswordElse) {
      (this.children.inputPasswordElse as Block).setProps({ error: false });
      (this.children.errorMessagePasswordElse as Block).hide();
    }

    if (form.password !== form.passwordElse) {
      (this.children.inputPassword as Block).setProps({ error: true });
      (this.children.inputPasswordElse as Block).setProps({ error: true });
      (this.children.errorMessagePassword as Block).setProps({ label: "Пароли должны совпадать" });
      (this.children.errorMessagePasswordElse as Block).setProps({ label: "Пароли должны совпадать" });
    }
    if (form.password && form.passwordElse && form.password === form.passwordElse) {
      (this.children.inputPassword as Block).setProps({ error: false });
      (this.children.inputPasswordElse as Block).setProps({ error: false });
      (this.children.errorMessagePassword as Block).hide();
      (this.children.errorMessagePasswordElse as Block).hide();
    }

  }

  getForm() {
    const form = document.getElementById("registration__form") as HTMLFormElement;

    const formData = new FormData(form);

    const email = formData.get("email");
    const login = formData.get("login");
    const firstName = formData.get("first_name");
    const secondName = formData.get("second_name");
    const phone = formData.get("phone");
    const password = formData.get("password");
    const passwordElse = formData.get("passwordElse");

    return { email, login, firstName, second_name: secondName, phone, password, passwordElse };
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
    (this.children.buttonRegistration as Block).setProps({ disabled: isDisable });
  }

  isValid(value: string, field: string) {
    switch (field) {
      case "login":
        return validationPatterns.login.test(value);
      case "password":
      case "passwordElse":
        return validationPatterns.password.test(value);
      case "email":
        return validationPatterns.email.test(value);
      case "first_name":
      case "second_name":
        return validationPatterns.username.test(value);
      case "phone":
        return validationPatterns.phone.test(value);
    }
  }

  render() {
    return this.compile(template, { title: this.props.title, styles });
  }
}
