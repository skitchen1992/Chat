import { Button } from "../../components/button";
import { ButtonLink } from "../../components/buttonLink";
import { Input } from "../../components/input";
import { Search } from "../../components/search";
import userLogo from "../../../public/icons/user.png";
import Block from "../../utils/Block";
import store, { withStore } from "../../utils/Store";
import template from "../messenger/messenger.pug";
import * as styles from "./messenger.scss";
import account from "../../../public/icons/account.png";
import plusIcon from "../../../public/icons/plus-circle.png";
import minusIcon from "../../../public/icons/minus-circle.png";
import dotsIcon from "../../../public/icons/dots-three-circle-vertical.png";
import paperclip from "../../../public/icons/paperclip.png";
import image from "../../../public/icons/image.png";
import filePlus from "../../../public/icons/file-plus.png";
import { Dropdown } from "../../components/dropdown";
import { Routes } from "../../index";
import Router from "../../utils/Router";
import { getDateTime } from "../../utils/date";
import ChatController from "../../controllers/ChatController";
import { IChat } from "../../api/ChatAPI";
import { IUser } from "../../api/AuthAPI";
import { Chat } from "../../components/chat";
import MessagesController, { IMessage } from "../../controllers/MessagesController";
import { Message } from "../../components/message";
import { AddUserModal } from "../../components/modals/AddUserModal";
import { MODALS } from "../../components/modals/constants";
import { RemoveUserModal } from "../../components/modals/RemoveUserModal";
import { RemoveChatModal } from "../../components/modals/RemoveChatModal";
import { AddChatModal } from "../../components/modals/AddChatModal";
import { Loader } from "../../components/loader";
import HTTPTransport from "../../utils/HTTPTransport";

interface IMessenger {
  chatList: IChat[],
  user: IUser
  loading: boolean,
  selectedChat?: number
  messages: IMessage[];
  modalId: MODALS
}

class MessengerBase extends Block <IMessenger> {
  constructor(props: IMessenger) {
    super("div", props);
  }

  init() {
    ChatController.getChatList();

    this.children.buttonProfile = new ButtonLink({
      label: "Профиль",
      events: {
        click: () => Router.go(Routes.Profile)
      }
    });

    this.children.buttonAddChat = new ButtonLink({
      label: "Добавить чат",
      events: {
        click: () => store.set("modal", { modalId: MODALS.ADD_CHAT })
      }
    });

    this.children.search = new Search({
      label: "Поиск",
      type: "text",
      name: "search",
      size: "small",
      events: {
        keypress: () => console.log("Профиль")
      }
    });

    this.children.messageInput = new Input({
      label: "Сообщение",
      type: "text",
      name: "message",
      size: "small",
      width: "100%",
      events: {
        input: (e: Event) => this.validate(e, (this.children.messageButton as Block).setProps)
      }
    });

    this.children.messageButton = new Button({
      label: "Отправить",
      variant: "contained",
      disabled: true,
      events: {
        click: () => this.sendMassage()
      }
    });

    this.children.topDropdownButton = new Dropdown({
      firstLabel: "Добавить пользователя",
      secondLabel: "Удалить пользователя",
      buttonIcon: dotsIcon,
      firstLabelIcon: plusIcon,
      secondLabelIcon: minusIcon,
      variant: "bottom"
    });

    this.children.bottonDropdownButton = new Dropdown({
      firstLabel: "Фото или видео ",
      secondLabel: "Файл",
      buttonIcon: paperclip,
      firstLabelIcon: image,
      secondLabelIcon: filePlus,
      variant: "top"
    });

    this.children.addUserModal = new AddUserModal({});
    this.children.removeUserModal = new RemoveUserModal({});
    this.children.removeChatModal = new RemoveChatModal({});
    this.children.addChatModal = new AddChatModal({});

    this.children.messages = this.createMessages(this.props);

    this.children.chatList = this.createChatList(this.props);

    this.children.loader = new Loader({});

  }

  protected componentDidUpdate(oldProps: IMessenger, newProps: IMessenger): boolean {
    this.children.chatList = this.createChatList(newProps);
    this.children.messages = this.createMessages(newProps);
    this.children.addUserModal = new AddUserModal({ modalId: newProps.modalId });
    this.children.removeUserModal = new RemoveUserModal({ modalId: newProps.modalId });
    this.children.addChatModal = new AddChatModal({ modalId: newProps.modalId });
    this.children.removeChatModal = new RemoveChatModal({ modalId: newProps.modalId });

    return true;
  }


  validate(event: Event, setProps: (nextProps: any) => void) {

    const target = event.target as HTMLInputElement;

    if (event.type === "input") {
      if (target.value.length === 0) {
        setProps({ disabled: true });
      }
      if (target.value.length > 0) {
        setProps({ disabled: false });
      }
    }
  }

  private createMessages(props: IMessenger) {
    return props.messages.map(data => {
      return this.children.message = new Message({ ...data, isMine: props.user.id === data.user_id });
    });
  }

  private createChatList(props: IMessenger) {
    return props.chatList?.map((chat) => {
      return this.children.chat = new Chat({
        chatTitle: chat.title,
        message: chat.last_message?.content,
        avatar: chat.avatar,
        unread_count: chat.unread_count,
        date: getDateTime(chat.last_message?.time),
        events: {
          click: () => ChatController.selectChat(chat.id)
        },
        chatId: chat.id
      });
    });
  }

  sendMassage() {
    const input = this.children.messageInput as Input;
    const message = input.getValue();

    input.setValue("");

    MessagesController.sendMessage(this.props.selectedChat!, message);
  }

  render() {
    const { user, loading, selectedChat } = this.props;
    console.log(user.avatar);
    return this.compile(template, {
      account,
      styles,
      logo: user?.avatar ? `${HTTPTransport.API_URL}/resources${user?.avatar}` : userLogo,
      first_name: user?.first_name,
      loading,
      selectedChat
    });
  }
}

const withMessenger = withStore((state) => {
  const selectedChatId = state.selectedChat;

  if (!selectedChatId) {
    return {
      chatList: [...(state.chatList.items || [])],
      user: state.user,
      loading: state.chatList.loading,
      messages: [],
      selectedChat: undefined,
      userId: state.user?.id,
      modalId: state.modal?.modalId
    };
  }

  return {
    chatList: [...(state.chatList.items || [])],
    user: state.user,
    loading: state.chatList.loading,
    selectedChat: state.selectedChat,
    messages: (state.messages || {})[selectedChatId] || [],
    modalId: state.modal?.modalId
  };
});

export const MessengerPage = withMessenger(MessengerBase);
