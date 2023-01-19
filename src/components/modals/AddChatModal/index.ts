import { Button } from "../../button";
import { IconClose } from "../../iconClose";
import template from "./addChatModal.pug";
import * as styles from "../styleModal.scss";
import { Input } from "../../input";
import store, { IModal, withStore } from "../../../utils/Store";
import Block from "../../../utils/Block";
import { MODALS } from "../constants";
import ChatController from "../../../controllers/ChatController";

interface IAddChatModalProps {
  modal: IModal;
}

class AddChatModalBase extends Block <IAddChatModalProps> {
  constructor(props: IAddChatModalProps) {
    super("div", props);
    this.element!.setAttribute("id", this.id);
    this.element!.classList.add("modal");
  }

  init() {
    this.children.button = new Button({
      variant: "contained",
      label: "Добавить чат",
      events: {
        click: () => this.addChat()
      }
    });

    this.children.buttonClose = new IconClose({
      events: {
        click: () => store.set(`modal`, null)
      }
    });

    this.children.input = new Input({
      label: "Назовите час",
      events: {},
      type: "text",
      name: "add_user",
      size: "small",
      width: "100%"
    });
  }

  addChat() {
    const input = this.children.input as Input;
    const message = input.getValue();
    ChatController.addChat(message);
  }

  render() {
    const { modal } = this.props;

    if (modal?.modalId === MODALS.ADD_CHAT) {
      this.show();
    }

    return this.compile(template, { label: "Добавить чат", styles });
  }
}

const withModal = withStore((state) => {
  return {
    modal: state.modal
  };
});

export const AddChatModal = withModal(AddChatModalBase);
