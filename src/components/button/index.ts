import Block from "../../utils/Block";
import template from "./button.pug";
import * as styles from "./button.scss";

interface IButtonProps {
  label?: string
  events?: {
    click?: (e: Event) => void,
    blur?: (e: Event) => void,
  }
  disabled?: boolean
  type?: "submit" | "reset",
  variant: "round" | "contained" | "icon"
  icon?: string
}

export class Button extends Block <IButtonProps> {
  constructor(props: IButtonProps) {
    super("button", props);
    const { variant, icon } = this.props;

    this.setButtonVariant(variant, icon);
  }

  setButtonVariant(variant: "round" | "contained" | "icon", icon?: string) {
    if (variant === "round") {
      this.element!.classList.add("buttonRound");
      icon && this.element!.appendChild(this.getImg(icon));
    }

    if (variant === "contained") {
      this.element!.classList.add("button");
    }

    if (variant === "icon") {
      this.element!.classList.add("buttonIcon");
      icon && this.element!.appendChild(this.getImg(icon));
    }
  }

  getImg(icon: string) {
    const img = document.createElement("img");
    img.setAttribute("src", icon);
    return img;
  }

  render() {
    const { type = "button", disabled = false } = this.props;

    this.element!.setAttribute("id", this.id);
    this.element!.setAttribute("type", type);

    if (disabled) {
      this.element!.setAttribute("disabled", "disabled");
    }
    if (!disabled) {
      this.element!.removeAttribute("disabled");
    }

    return this.compile(template, { label: this.props.label, styles });
  }
}
