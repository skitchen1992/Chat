import { IUser } from "../../api/AuthAPI";

export const getUserInfoList = (user: IUser) => {
  return [
    { label: "Почта", value: user.email },
    { label: "Логин", value: user.login },
    { label: "Имя", value: user.first_name },
    { label: "Фамилия", value: user.second_name },
    { label: "Телефон", value: user.phone }
  ];
};
