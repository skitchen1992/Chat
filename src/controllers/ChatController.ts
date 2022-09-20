import API, { ChatAPI } from "../api/ChatAPI";
import store from "../utils/Store";


export class ChatController {
  private readonly api: ChatAPI;

  constructor() {
    this.api = API;
  }

  async getChatList() {
    try {
      store.set("chatList.loading", true)

      const chatList = await this.api.read();

      store.set("chatList.items", chatList)
      store.set("chatList.hasData", chatList.length > 0)

    } catch (e: any) {
      console.error(e);
    } finally {
      store.set("chatList.loading", false)
    }
  }

}

export default new ChatController();
