import { Button } from "../../button";
import { IconClose } from "../../iconClose";
import template from "./removeChatModal.pug";
import * as styles from "../styleModal.scss";
import store, { IModal, withStore } from "../../../utils/Store";
import Block from "../../../utils/Block";
import { MODALS } from "../constants";
import ChatController from "../../../controllers/ChatController";

interface IRemoveChatModalProps {
  modal: IModal;
  chatId: number
}

class RemoveChatModalBase extends Block <IRemoveChatModalProps> {
  constructor(props: IRemoveChatModalProps) {
    super("div", props);
    this.element!.setAttribute("id", this.id);
    this.element!.classList.add("modal");
  }

  init() {
    this.children.button = new Button({
      variant: "contained",
      label: "Удалить",
      events: {
        click: () => {
          ChatController.delete(this.props.chatId)
        }
      }
    });

    this.children.buttonClose = new IconClose({
      events: {
        click: () => store.set(`modal`, null)
      }
    });
  }

  render() {
    const { modal } = this.props;

    if (modal?.modalId === MODALS.REMOVE_CHAT) {
      this.show();
    }

    return this.compile(template, { label: "Удалить чат", styles });
  }
}

const withModal = withStore((state) => {
  return {
    modal: state.modal,
    chatId: state.selectedChat
  };
});

export const RemoveChatModal = withModal(RemoveChatModalBase);
