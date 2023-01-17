import { IChat } from "../api/ChatAPI";
import { isEqual, set } from "./helpers";
import { EventBus } from "./EventBus";
import { ComponentConstructable } from "../types/types";
import { IUser } from "../api/AuthAPI";
import { IMessage } from "../controllers/MessagesController";

export interface IModal {
  modalId: string | number;
  data?: any;
}

export interface IStore {
  user?: IUser | null;
  chatList: {
    items: IChat[],
    hasData: boolean,
    loading: boolean
  };
  messages: Record<number, IMessage[]> | null;
  selectedChat: number | null;
  modal: IModal | null;
}

export enum StoreEvents {
  Updated = "updated"
}

class Store extends EventBus {
  private state: IStore = {
    user: null,
    chatList: {
      items: [],
      hasData: false,
      loading: false
    },
    messages: null,
    selectedChat: null,
    modal: null
  };

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data);

    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState() {
    return this.state;
  }
}

const store = new Store();

export function withStore(mapStateToProps: (state: IStore) => any) {

  return function wrap(Component: ComponentConstructable<any>) {

    return class WithStore extends Component {

      constructor(props: any) {
        let previousState = mapStateToProps(store.getState());

        super({ ...props, ...previousState });

        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState());

          if (isEqual(previousState, stateProps)) {
            return;
          }

          previousState = stateProps;

          this.setProps({ ...stateProps });
        });
      }
    };
  };
}

export default store;
