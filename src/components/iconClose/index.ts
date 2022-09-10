import Block from "../../utils/Block";
import template from "./iconClose.pug";
import * as styles from "./iconClose.scss";

interface IIconCloseProps {

}

export class IconClose extends Block <IIconCloseProps> {
  constructor(props: IIconCloseProps) {
    super("div", props);

    this.element!.classList.add("close");
  }

  render() {
    return this.compile(template, { styles });
  }
}
