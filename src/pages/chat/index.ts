import { Button } from "../../components/button";
import { ButtonLink } from "../../components/buttonLink";
import { Input } from "../../components/input";
import { Search } from "../../components/search";
import { User } from "../../components/user";
import user from "../../../public/icons/user.png";
import Block from "../../utils/Block";
import template from "../chat/chat.pug";
import * as styles from "./chat.scss";
import account from "../../../public/icons/account.png";
import plusIcon from "../../../public/icons/plus-circle.png";
import minusIcon from "../../../public/icons/minus-circle.png";
import dotsIcon from "../../../public/icons/dots-three-circle-vertical.png";
import paperclip from "../../../public/icons/paperclip.png";
import image from "../../../public/icons/image.png";
import filePlus from "../../../public/icons/file-plus.png";
import { Dropdown } from "../../components/dropdown";

interface IChatProps {
  logo?: string;
  first_name?: string;
}

export class ChatPage extends Block <IChatProps> {
  constructor(props: IChatProps) {
    super("div", props);

  }

  init() {
    this.children.buttonProfile = new ButtonLink({
      label: "Профиль",
      events: {
        click: () => console.log("Профиль")
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
        click: () => console.log("Профиль")
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

    this.children.userList = [
      this.children.user1 = new User({
        name: "Ник",
        message: "Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной \"рыбой\" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.",
        logo: null,
        numberOfMessages: null,
        date: "1 мая",
        events: {
          click: () => console.log("Профиль")
        },
        active: false
      }),

      this.children.user = new User({
        name: "Ник",
        message: "Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной \"рыбой\" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.",
        logo: null,
        numberOfMessages: 100,
        date: "1 мая",
        events: {
          click: () => console.log("Профиль")
        },
        active: true
      })
    ];
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

  render() {
    const { logo, first_name = "Никита" } = this.props;
    return this.compile(template, { account: account, styles, logo: logo || user, first_name });
  }
}
