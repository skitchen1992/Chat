import Block from "../../utils/Block";
import template from "./search.pug";
import * as styles from "./search.scss";

interface ISearchProps {
  label?: string;
  events: {
    blur?: (e: Event) => void,
    focus?: (e: Event) => void,
    keypress?: (e: Event) => void,
  };
  disabled?: boolean;
  type: "text" | "password";
  name: string;
  size: "small";
  value?: string;
  width?: string;
}

export class Search extends Block<ISearchProps> {
  constructor(props: ISearchProps) {
    super("input", props);

  }

  addAttribute(type: "text" | "password", name: string, disabled: boolean) {

    this.element!.setAttribute("id", this.id);
    this.element!.setAttribute("type", type);
    this.element!.setAttribute("name", name);

    if (disabled) {
      this.element!.setAttribute("disabled", "disabled");
    }

  }

  setInputSize(size: "small" | "medium", width: string, value?: string, label?: string) {
    switch (size) {
      case "small":
        this.element!.classList.add("search");
        this.element!.style.width = width;

        if (value) {
          this.element!.setAttribute("value", value);
        }
        if (label) {
          this.element!.setAttribute("placeholder", label);
        }
        break;
      default:
        return null;
    }
  }

  render() {
    const {
      type,
      disabled = false,
      label,
      name,
      size = "medium",
      value,
      width = "100%"
    } = this.props;

    this.addAttribute(type, name, disabled);

    this.setInputSize(size, width, value, label);

    return this.compile(template, { input: null, styles });
  }
}
