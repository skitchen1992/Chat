import Block from "../../utils/Block";
import template from "./errorMessage.pug";
import * as styles from "./errorMessage.scss";

interface IErrorMessageProps {
  label: string | null;
}

export class ErrorMessage extends Block <IErrorMessageProps> {
  constructor(props: IErrorMessageProps) {
    super("div", props);
    this.element!.setAttribute("id", this.id);
    this.element!.classList.add("error");
  }

  render() {
    return this.compile(template, { label: this.props.label, styles });
  }
}
