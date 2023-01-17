import API, { ChatAPI } from "../api/ChatAPI";
import store from "../utils/Store";
import MessagesController from "./MessagesController";

class ChatController {
  private readonly api: ChatAPI;

  constructor() {
    this.api = API;
  }

  async create(title: string) {
    await this.api.create(title);

    this.getChatList();
  }

  async getChatList() {
    try {
      store.set("chatList.loading", true);

      const chatList = await this.api.read();

      chatList.map(async (chat) => {
        const token = await this.getToken(chat.id);

        await MessagesController.connect(chat.id, token);
      });

      store.set("chatList.items", chatList);
      store.set("chatList.hasData", chatList.length > 0);

    } catch (e: any) {
      console.error(e);
    } finally {
      store.set("chatList.loading", false);
    }
  }

  async addChat(title: string) {
    try {
      await this.api.addChat(title);
      await this.getChatList();
    } catch (e) {
      console.error(e);
    } finally {
      store.set(`modal`, null);
    }
  }

  async addUserToChat(id: number, userId: string) {
    try {
      await this.api.addUsers(id, userId);
    } catch (e) {
      console.error(e);
    } finally {
      store.set(`modal`, null);
    }
  }

  async deleteUserToChat(id: number, userId: string) {
    try {
      await this.api.deleteUsers(id, userId);
    } catch (e) {
      console.error(e);
    } finally {
      store.set(`modal`, null);
    }
  }

  async delete(id: number) {
    try {
      await this.api.delete(id);
      await this.getChatList();
    } catch (e) {
      console.error(e);
    } finally {
      store.set(`modal`, null);
    }
  }

  getToken(id: number) {
    return this.api.getToken(id);
  }

  selectChat(id: number) {
    store.set("selectedChat", id);
  }

}

export default new ChatController();
