import { Button } from "../../components/button";
import { ButtonLink } from "../../components/buttonLink";
import { Input } from "../../components/input";
import Block from "../../utils/Block";
import { validationPatterns } from "../../utils/validationPatterns";
import template from "./login.pug";
import * as styles from "./login.scss";
import { ErrorMessage } from "../../components/errorMessage";
import { Routes } from "../../index";
import Router from "../../utils/Router";
import AuthController from "../../controllers/AuthController";
import { SigninData } from "../../api/AuthAPI";

interface ILoginProps {
  title: string;
}

export class LoginPage extends Block <ILoginProps> {
  constructor(props: ILoginProps) {
    super("div", props);

  }

  init() {
    this.children.button = new Button({
      variant: "contained",
      label: "Войти",
      events: {
        click: () => this.onSubmit()
      }
    });

    this.children.register = new ButtonLink({
      label: "Еще не зарегестрированы?",
      events: {
        click: () => Router.go(Routes.Register)
      }
    });

    this.children.inputLogin = new Input({
      label: "Логин",
      type: "text",
      name: "login",
      events: {
        blur: (e: Event) => {
          this.validate(e, (this.children.inputLogin as Block).setProps, this.children.errorMessageLogin as Block);
        },
        focus: (e: Event) => {
          this.validate(e, (this.children.inputLogin as Block).setProps, this.children.errorMessageLogin as Block);
        }
      }
    });

    this.children.errorMessageLogin = new ErrorMessage({
      label: "Не корректный логин"
    });

    this.children.inputPassword = new Input({
      label: "Пароль",
      type: "password",
      name: "password",
      events: {
        blur: (e: Event) => {
          this.validate(e, (this.children.inputPassword as Block).setProps, this.children.errorMessagePassword as Block);
        },
        focus: (e: Event) => {
          this.validate(e, (this.children.inputPassword as Block).setProps, this.children.errorMessagePassword as Block);
        }
      }
    });

    this.children.errorMessagePassword = new ErrorMessage({
      label: "Oт 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра."
    });
  }

  onSubmit() {
    const form = this.getForm();
    const isLoginValid = this.isValid(form.login as string, "login");
    const isPasswordValid = this.isValid(form.password as string, "password");

    if (isLoginValid && isPasswordValid) {
      AuthController.signin(form as SigninData);
    }
    if (!isLoginValid) {
      (this.children.inputLogin as Block).setProps({ error: true });
      (this.children.errorMessageLogin as Block).show();
    }
    if (isLoginValid) {
      (this.children.inputLogin as Block).setProps({ error: false });
      (this.children.errorMessageLogin as Block).hide();
    }
    if (!isPasswordValid) {
      (this.children.inputPassword as Block).setProps({ error: true });
      (this.children.errorMessagePassword as Block).show();
    }
    if (isPasswordValid) {
      (this.children.inputPassword as Block).setProps({ error: false });
      (this.children.errorMessagePassword as Block).hide();
    }
  }

  getForm() {
    const form = document.getElementById("login__form") as HTMLFormElement;

    const formData = new FormData(form);

    const login = formData.get("login");
    const password = formData.get("password");

    return { login, password };
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
    (this.children.button as Block).setProps({ disabled: isDisable });
  }

  isValid(value: string, field: string) {
    switch (field) {
      case "login":
        return validationPatterns.login.test(value);
      case "password":
        return validationPatterns.password.test(value);
    }
  }

  render() {
    return this.compile(template, { title: this.props.title, styles });
  }
}
