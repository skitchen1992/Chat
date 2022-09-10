import Block from "../../utils/Block";
import template from "../page500/page500.pug";
import * as styles from "./page500.scss";
import { ButtonLink } from "../../components/buttonLink";

interface IPage500Props {
  errorCode: string;
  errorMassage: string;
}

export class Page500 extends Block <IPage500Props> {
  constructor(props: IPage500Props) {
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
