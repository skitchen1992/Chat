import Router from '../utils/Router';
import { ComponentConstructable } from "../types/types";

export function withRouter(Component: ComponentConstructable<any>) {
  type Props = typeof Component extends ComponentConstructable<infer P> ? P : any;

  return class WithRouter extends Component {
    constructor(props: Props & PropsWithRouter) {
      super({ ...props, router: Router });
    }
  }
}

export interface PropsWithRouter {
  router: typeof Router;
}
