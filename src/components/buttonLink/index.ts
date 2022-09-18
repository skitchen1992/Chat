import Block from "../../utils/Block";
import template from "./buttonLink.pug";
import { PropsWithRouter, withRouter } from "../../hocs/withRouter";
import * as styles from "./buttonLink.scss";

interface IButtonProps extends PropsWithRouter {
  to: string;
  label: string;
  events: {
    click: () => void
  };
  variant?: "alert";
  href?: string;
}

export class ButtonLink extends Block<IButtonProps> {
  constructor(props: IButtonProps) {
    super("a", { ...props, events: { click: () => this.navigate() } });
    const { variant = "primary" } = this.props;

    this.setButtonVariant(variant);

  }

  setButtonVariant(variant: "primary" | "alert") {
    if (variant === "primary") {
      this.element!.classList.add("buttonLink");
    }

    if (variant === "alert") {
      this.element!.classList.add("buttonLinkWarm");
    }
  }

  setButtonAttribute(href?: string) {
    this.element!.setAttribute("id", this.id);
    if (href) {
      this.element!.setAttribute("href", href);
    }
  }

  navigate() {
    this.props.router.go(this.props.to);
  }

  render() {
    const { href } = this.props;

    this.setButtonAttribute(href);

    return this.compile(template, { label: this.props.label, styles });
  }
}

export const Link = withRouter(ButtonLink);
