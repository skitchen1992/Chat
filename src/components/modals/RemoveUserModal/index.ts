import { Button } from "../../button";
import { IconClose } from "../../iconClose";
import template from "./removeUserModal.pug";
import * as styles from "../styleModal.scss";
import { Input } from "../../input";
import store, { IModal, withStore } from "../../../utils/Store";
import Block from "../../../utils/Block";
import { MODALS } from "../constants";
import ChatController from "../../../controllers/ChatController";

interface IAddUserModalProps {
  modal: IModal;
  chatId: number
}

class RemoveUserModalBase extends Block <IAddUserModalProps> {
  constructor(props: IAddUserModalProps) {
    super("div", props);
    this.element!.setAttribute("id", this.id);
    this.element!.classList.add("modal");
  }

  init() {
    this.children.button = new Button({
      variant: "contained",
      label: "Удалить",
      events: {
        click: () => this.deleteUser()
      }
    });

    this.children.buttonClose = new IconClose({
      events: {
        click: () => store.set(`modal`, null)
      }
    });

    this.children.input = new Input({
      label: "Имя пользователя",
      events: {},
      type: "text",
      name: "add_user",
      size: "small",
      width: "100%"
    });
  }

  deleteUser() {
    const input = this.children.input as Input;
    const userId = input.getValue();
    ChatController.deleteUserToChat(this.props.chatId, userId);
  }

  render() {
    const { modal } = this.props;

    if (modal?.modalId === MODALS.REMOVE_USER) {
      this.show();
    }

    return this.compile(template, { label: "Удалить пользователя", styles });
  }
}

const withModal = withStore((state) => {
  return {
    modal: state.modal,
    chatId: state.selectedChat
  };
});

export const RemoveUserModal = withModal(RemoveUserModalBase);
