import Block from "../../utils/Block";
import { Button } from "../button";
import template from "./dropdown.pug";
import * as styles from "./dropdown.scss";
import { DropdownItem } from "../dropdownItem";
import store from "../../utils/Store";
import { MODALS } from "../modals/constants";

interface IDropDownProps {
  buttonIcon: string;
  firstLabelIcon: string;
  secondLabelIcon: string;
  firstLabel: string;
  secondLabel: string;
  variant: "top" | "bottom";
}

export class Dropdown extends Block <IDropDownProps> {
  constructor(props: IDropDownProps) {
    super("div", props);
    this.element!.classList.add("dropdown");
  }

  init() {
    this.children.dropdownButton = new Button({
      variant: "icon",
      icon: this.props.buttonIcon
    });

    this.children.buttonList = [
      this.children.DropdownItem1 = new DropdownItem({
        events: {
          click: () => store.set(`modal`, { modalId: MODALS.ADD_USER })
        },
        label: this.props.firstLabel,
        icon: this.props.firstLabelIcon
      }),

      this.children.DropdownItem2 = new DropdownItem({
        events: {
          click: () => store.set(`modal`, { modalId: MODALS.REMOVE_USER })
        },
        label: this.props.secondLabel,
        icon: this.props.secondLabelIcon
      }),

      this.children.DropdownItem3 = new DropdownItem({
        events: {
          click: () => store.set(`modal`, { modalId: MODALS.REMOVE_CHAT })
        },
        label: "Удалить чат",
        icon: this.props.secondLabelIcon
      })
    ];
  }

  render() {
    const { variant } = this.props;
    const classTag = variant === "bottom" ? "dropdown__content__bottom" : "dropdown__content__top";

    return this.compile(template, { styles, classTag });
  }
}
