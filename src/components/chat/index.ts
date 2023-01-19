import user from "../../../public/icons/user.png";
import Block from "../../utils/Block";
import template from "./chat.pug";
import * as styles from "./chat.scss";
import { withStore } from "../../utils/Store";
import HTTPTransport from "../../utils/HTTPTransport";
import userLogo from "../../../public/icons/user.png";

interface IChatProps {
  chatTitle: string,
  message?: string,
  avatar: string | null,
  unread_count: number | null,
  active: boolean
  date: string | null,
  events: {
    click: () => void,
  }
  chatId: number
  selectedChat: number
}

class ChatBase extends Block <IChatProps> {
  constructor(props: IChatProps) {
    super("div", props);
  }

  render() {
    const { chatTitle, message, avatar, unread_count, date, chatId, selectedChat } = this.props;

    this.element!.setAttribute("id", this.id);
    this.element!.classList.add("user");
    const active = chatId === selectedChat

    if (active) {
      this.element!.classList.add("active");
    }

    return this.compile(template, {
      label: "Text",
      styles,
      avatar: avatar ? `${HTTPTransport.API_URL}/resources${avatar}` : userLogo,
      chatTitle,
      message,
      unread_count,
      date
    });
  }
}

export const withSelectedChat = withStore(state => ({selectedChat: state.selectedChat}));

export const Chat = withSelectedChat(ChatBase);
