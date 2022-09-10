import { Button } from "../../components/button";
import { Modal } from "../../components/modal";
import Block from "../../utils/Block";
import template from "./home.pug";
import * as styles from "./home.scss";

interface HomePageProps {
  title: string;
}

export class HomePage extends Block <HomePageProps> {
  constructor(props: HomePageProps) {
    super("div", props);
  }

  init() {
    this.children.button = new Button({
      variant: "contained",
      label: "Show modal",
      events: {
        click: () => this.showModal()
      }
    });

    this.children.modal = new Modal({});
  }

  showModal() {
    const modal = document.getElementById((this.children.modal as Block).id);
    modal!.style.display = "block";
  }

  render() {
    return this.compile(template, { title: this.props.title, styles });
  }
}
