import Block from "../../utils/Block";
import template from "../page404/page404.pug";
import * as styles from "./page404.scss";
import { ButtonLink } from "../../components/buttonLink";

interface IPage404Props {
  errorCode: string;
  errorMassage: string;
}

export class Page404 extends Block <IPage404Props> {
  constructor(props: IPage404Props) {
    super("div", props);
  }

  init() {
    this.children.buttonBackToChat = new ButtonLink({
      label: "Назад к чатам",
      events: {
        click: () => console.log("buttonBackToChat")
      }
    });
  }

  render() {
    return this.compile(template, {
      errorCode: this.props.errorCode,
      errorMassage: this.props.errorMassage,
      styles
    });
  }
}
