import { observable, runInAction, action, IObservableValue, computed } from "mobx";

import { Advertisement } from './types';
import { AdvertisementService, AdvertisementServiceType } from "../../services";

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

  @action
  async loadItems() {
    runInAction(() => this.state.set(States.LOADING));
    const items = await this.advertisementService.getItems();
    runInAction(() => {
      this.ads = items;
      this.state.set(States.SUCCESS);
    });
  }
}