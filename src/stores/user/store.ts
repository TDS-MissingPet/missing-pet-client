import { observable, action, runInAction, computed, IObservableValue } from "mobx";
import omit from "lodash/omit";

import { User } from "./types";
import { UserService, UserServiceType } from "../../services";
import { Account } from "../../services/user/types";

export const STORE_TOKEN = "UserStore";

export enum States {
  INITIAL,
  LOADING,
  FAILED,
  SUCCESS
}

export class UserStore {
  @observable user?: User;
  state: IObservableValue<States> = observable.box(States.INITIAL);
  errorReason: IObservableValue<string> = observable.box("");

  private readonly userService: UserServiceType = UserService;

  constructor() {
    this.user = this.userService.user || undefined;
  }

  @computed
  get isLoading() {
    return this.state.get() === States.LOADING;
  }

  @computed
  get isSignedUp() {
    if (!this.user) {
      return false;
    }

    return (
      !this.user.accessToken &&
      Object.values(omit(this.user, "accessToken")).every(Boolean)
    );
  }

  @computed
  get isAuthorized() {
    return Boolean(this.user) && Object.values(this.user!).every(Boolean);
  }

  @action
  async createAccount(payload: Account) {
    try {
      runInAction(() => {
        this.state.set(States.LOADING);
        this.errorReason.set("");
      });
      const user = await this.userService.createAccount(payload);
      runInAction(() => {
        this.user = user;
        this.state.set(States.SUCCESS);
      });
    } catch (e) {
      runInAction(() => {
        this.state.set(States.FAILED);
        this.errorReason.set(e.message);
      });
    }
  }

  @action
  async login(payload: Pick<Account, "userName" | "password">) {
    try {
      runInAction(() => {
        this.state.set(States.LOADING);
        this.errorReason.set("");
      });
      const accessToken = await this.userService.authorize(payload);
      runInAction(() => {
        this.user!.accessToken = accessToken;
        this.state.set(States.SUCCESS);
      });
    } catch (e) {
      runInAction(() => {
        this.state.set(States.FAILED);
        this.errorReason.set(e.message);
      });
    }
  }

  @action
  resetUser() {
    this.user = undefined;
  }
}
