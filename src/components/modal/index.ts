import Block from "../../utils/Block";
import { Button } from "../button";
import { IconClose } from "../iconClose";
import template from "./modal.pug";
import * as styles from "./modal.scss";

interface IModalProps {
}

export class Modal extends Block <IModalProps> {
  constructor(props: IModalProps) {
    super("div", props);
    this.element!.setAttribute("id", this.id);
    this.element!.classList.add("modal");

  }

  init() {
    this.children.button = new Button({
      variant: "contained",
      label: "Click me",
      events: {
        click: () => console.log("Click me")
      }
    });

    this.children.buttonClose = new IconClose({
      events: {
        click: () => this.hide()
      }
    });
  }

  render() {
    return this.compile(template, { label: "Text", styles });
  }
}
