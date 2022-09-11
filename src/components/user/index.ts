import user from "../../../public/icons/user.png";
import Block from "../../utils/Block";
import template from "./user.pug";
import * as styles from "./user.scss";

interface IUserProps {
  name: string,
  message: string | null,
  logo: string | null,
  numberOfMessages: number | null,
  active: boolean
  date: string | null,
  events: {
    click: () => void,
  }
}

export class User extends Block <IUserProps> {
  constructor(props: IUserProps) {
    super("div", props);
  }

  render() {
    const { name, message, logo, numberOfMessages, date, active } = this.props;

    this.element!.setAttribute("id", this.id);
    this.element!.classList.add("user");

    if (active) {
      this.element!.classList.add("active");
    }

    return this.compile(template, { label: "Text", styles, logo: logo || user, name, message, numberOfMessages, date });
  }
}
