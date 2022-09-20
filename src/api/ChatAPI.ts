import BaseAPI from "./BaseAPI";

interface User {
  first_name: string,
  second_name: string,
  avatar: string,
  email: string,
  login: string,
  phone: string
}

interface LastMessage {
  user: User
  time: string,
  content: string
}

export interface Chat {
  id: number,
  title: string,
  avatar: string,
  unread_count: number,
  last_message: LastMessage
}

export class ChatAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  read(): Promise<Chat[]> {
    return this.http.get();
  }

  create = undefined;
  update = undefined;
  delete = undefined;
}

export default new ChatAPI();
