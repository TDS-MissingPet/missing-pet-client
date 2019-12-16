import { observable, runInAction, action, IObservableValue, computed } from "mobx";

import { Advertisement } from './types';
import { AdvertisementService, AdvertisementServiceType } from "../../services";
import { AdvertisementPayload } from "../../services/advertisement/types";

export enum States {
  INITIAL,
  LOADING,
  FAILED,
  SUCCESS
}

export const STORE_TOKEN = 'AdvertisementStore';

export class AdvertisementStore {
  @observable ads: Advertisement[] = [];
  state: IObservableValue<States> = observable.box(States.INITIAL);

  private readonly advertisementService: AdvertisementServiceType = AdvertisementService;

  @computed
  get isLoading() {
    return this.state.get() === States.LOADING;
  }

  @computed
  get isError() {
    return this.state.get() === States.FAILED;
  }

  @action
  async loadItems() {
    try {
      runInAction(() => this.state.set(States.LOADING));
      const items = await this.advertisementService.getItems();
      runInAction(() => {
        this.ads = items;
        this.state.set(States.SUCCESS);
      });
    } catch (e) {
      runInAction(() => this.state.set(States.FAILED));
    }
  }

  @action
  async createItem(payload: AdvertisementPayload) {
    try {
      runInAction(() => this.state.set(States.LOADING));
      await this.advertisementService.createItem(payload);
      runInAction(() => this.loadItems());
    } catch (e) {
      runInAction(() => this.state.set(States.FAILED));
    }
  }
}