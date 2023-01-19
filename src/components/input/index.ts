import Block from "../../utils/Block";
import template from "./input.pug";
import * as styles from "./input.scss";

interface IInputProps {
  label?: string;
  events: {
    blur?: (e: Event) => void,
    focus?: (e: Event) => void,
    input?: (e: Event) => void,
    change?:(e: Event) => void,

  };
  disabled?: boolean;
  type: "text" | "password" | "file";
  name: string;
  size?: "small" | "medium" | "default";
  value?: string;
  width?: string;
  error?: boolean;
}

export class Input extends Block <IInputProps> {
  constructor(props: IInputProps) {
    super("input", props);

  }

  addAttribute(type: "text" | "password" | "file", name: string, disabled: boolean) {

    this.element!.setAttribute("id", this.id);
    this.element!.setAttribute("type", type);
    this.element!.setAttribute("name", name);

    if (type === "password") {
      this.element!.setAttribute("autocomplete", "on");
    }

    if (disabled) {
      this.element!.setAttribute("disabled", "disabled");
    }

  }

  setError(isError: boolean) {
    if (isError) {
      this.element!.classList.add("invalid");
    }
    if (!isError) {
      this.element!.classList.remove("invalid");
    }
  }

  public setValue(value: string) {
    return (this.element as HTMLInputElement).value = value;
  }

  public getValue() {
    return (this.element as HTMLInputElement).value;
  }

  public getFiles() {
    return (this.element as HTMLInputElement).files;
  }

  setInputSize(size: "small" | "medium" | "default", width: string, value?: string, label?: string) {
    switch (size) {
      case "small":
        this.element!.classList.add("inputSmall");
        this.element!.style.width = width;

        if (value) {
          this.element!.setAttribute("value", value);
        }
        if (label) {
          this.element!.setAttribute("placeholder", label);
        }
        break;
      case "medium":
        this.element!.classList.add("inputMedium");
        this.element!.style.width = width;

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
      width = "176px",
      error = false
    } = this.props;

    this.addAttribute(type, name, disabled);

    this.setInputSize(size, width, value, label);

    this.setError(error);

    return this.compile(template, { styles });
  }
}
