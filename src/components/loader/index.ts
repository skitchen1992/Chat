import Block from "../../utils/Block";
import template from "./loader.pug";
import * as styles from "./loader.scss";

interface ILoaderProps {}

export class Loader extends Block <ILoaderProps> {
  constructor(props: ILoaderProps) {
    super("div", props);
  }

  render() {
    this.element!.setAttribute("id", this.id);
    this.element!.classList.add("loading");

    return this.compile(template, { label: "Loading...", styles });
  }
}
