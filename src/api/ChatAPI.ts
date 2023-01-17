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

export interface IChat {
  id: number,
  title: string,
  avatar: string | null,
  unread_count: number,
  last_message: LastMessage | null
}

export class ChatAPI extends BaseAPI {
  constructor() {
    super("/chats");
  }

  read(): Promise<IChat[]> {
    return this.http.get();
  }

  create(title: string) {
    return this.http.post("/", { title });
  }

  delete(id: number): Promise<unknown> {
    return this.http.delete("/", { chatId: id });
  }

  addUsers(id: number, user: string): Promise<unknown> {
    return this.http.put("/users", { users: [user], chatId: id });
  }

  deleteUsers(id: number, user: string): Promise<unknown> {
    return this.http.delete("/users", { users: [user], chatId: id });
  }

  addChat(title: string): Promise<unknown> {
    return this.http.post("", { title });
  }

  async getToken(id: number): Promise<string> {
    const response = await this.http.post<{ token: string }>(`/token/${id}`);

    return response.token;
  }

  update = undefined;
}

export default new ChatAPI();
