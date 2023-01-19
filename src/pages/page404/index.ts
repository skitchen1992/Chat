import Block from "../../utils/Block";
import template from "../page404/page404.pug";
import * as styles from "./page404.scss";
import { ButtonLink } from "../../components/buttonLink";
import router from "../../utils/Router";

interface IPage404Props {}

export class Page404 extends Block <IPage404Props> {
  constructor(props: IPage404Props) {
    super("div", props);
  }

  init() {
    this.children.buttonBackToChat = new ButtonLink({
      label: "Назад к чатам",
      events: {
        click: () => router.go("/messenger")
      }
    });
  }

  render() {
    return this.compile(template, {
      errorCode: "Ошибка",
      errorMassage: "Такой страницы нет",
      styles
    });
  }
}
