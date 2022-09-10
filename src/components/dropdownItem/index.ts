import Block from "../../utils/Block";
import { Button } from "../button";
import template from "./dropdownItem.pug";
import * as styles from "./dropdownItem.scss";

interface IDropdownItemProps {
  events: {
    click: () => void,
  };
  icon: string;
  label: string;
}

export class DropdownItem extends Block <IDropdownItemProps> {
  constructor(props: IDropdownItemProps) {
    super("div", props);

    this.element!.setAttribute("id", this.id);
    this.element!.classList.add("dropdown__content__wrap");
  }

  init() {
    this.children.button = new Button({
      variant: "icon",
      icon: this.props.icon,
      events: {
        click: () => console.log("button")
      }
    });
  }

  render() {
    const { label } = this.props;

    return this.compile(template, { label, styles });
  }
}
