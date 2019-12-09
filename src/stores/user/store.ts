import { observable, action } from 'mobx';
import { User } from './types';

export const STORE_TOKEN = 'UserStore';

export class UserStore {
  @observable user?: User;
  @observable loadingUser: boolean = false;

  @action pullUser() {
    // todo add logic here
  }
}