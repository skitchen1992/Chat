import Block from "../../utils/Block";
import template from "./message.pug";
import * as styles from "./message.scss";

interface IMessageProps {
  content: string;
  isMine: boolean;
}

export class Message extends Block <IMessageProps> {
  constructor(props: IMessageProps) {
    super("div", props);
  }

  render() {
    const { isMine } = this.props;
    this.element!.setAttribute("id", this.id);
    this.element!.classList.add("message");

    if (isMine) {
      this.element!.classList.add("message--mine");
    }

    return this.compile(template, { content: this.props.content, styles });
  }
}
