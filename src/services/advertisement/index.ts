import { AxiosInstance } from "axios";
import { httpClient } from "../http";

import { RawAdvertisement, AdvertisementPayload } from "./types";
import { Advertisement } from "../../stores/advertisement/types";
import userService, { UserService } from "../user";

export class AdvertisementService {
  private readonly _http: AxiosInstance = httpClient;
  private readonly _userService: UserService = userService;

  async getItems(): Promise<Advertisement[]> {
    const res = await this._http.get<RawAdvertisement[]>('/api/adverts?IsDesc=true&ByCreationDate=true');
    return (res.data || []).map((a: RawAdvertisement) => ({
      title: a.Title,
      text: a.Text,
      reward: a.Reward,
      tags: a.Tags,
      creationDate: a.CreationDate,
      imageUrl: a.ImageUrl,
      accountId: a.AccountId,
      account: a.Account
    }));
  }

  async createItem(payload: AdvertisementPayload): Promise<void> {
    const { image, ...adInfo } = payload;
    const itemCreationRes = await this._http.post<number>('/api/adverts', {
      Title: adInfo.title,
      Text: adInfo.text,
      Reward: adInfo.reward,
      AccountId: this._userService.user!.id!,
      Tags: adInfo.tags
    });
    const adId = itemCreationRes.data;
    if (image) {
      // TODO: implement image upload
    }
  }
}

export default new AdvertisementService();