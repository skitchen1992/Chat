import { Button } from "../../button";
import { IconClose } from "../../iconClose";
import template from "./addUserModal.pug";
import * as styles from "../styleModal.scss";
import { Input } from "../../input";
import store, { IModal, withStore } from "../../../utils/Store";
import Block from "../../../utils/Block";
import { MODALS } from "../constants";
import ChatController from "../../../controllers/ChatController";

interface IAddUserModalProps {
  modal: IModal;
  chatId: number;
}

class AddUserModalBase extends Block <IAddUserModalProps> {
  constructor(props: IAddUserModalProps) {
    super("div", props);
    this.element!.setAttribute("id", this.id);
    this.element!.classList.add("modal");
  }

  init() {
    this.children.button = new Button({
      variant: "contained",
      label: "Добавить",
      events: {
        click: () => this.addUser()
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

  addUser() {
    const input = this.children.input as Input;
    const userId = input.getValue();
    ChatController.addUserToChat(this.props.chatId, userId);
  }

  render() {
    const { modal } = this.props;

    if (modal?.modalId === MODALS.ADD_USER) {
      this.show();
    }

    return this.compile(template, { label: "Добавить пользователя", styles });
  }
}

const withModal = withStore((state) => {
  return {
    modal: state.modal,
    chatId: state.selectedChat
  };
});

export const AddUserModal = withModal(AddUserModalBase);
