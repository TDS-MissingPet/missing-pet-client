import { AxiosInstance } from "axios";
import { httpClient } from "../http";

import { RawAdvertisement } from "./types";
import { Advertisement } from "../../stores/advertisement/types";

export class AdvertisementService {
  private readonly _http: AxiosInstance = httpClient;

  async getItems(): Promise<Advertisement[]> {
    const res = await this._http.get<RawAdvertisement[]>('/api/adverts?IsDesc=true&ByCreationDate=true');
    return (res.data || []).map((a: RawAdvertisement) => ({
      title: a.Title,
      text: a.Text,
      reward: a.Reward,
      tags: a.Tags,
      creationDate: a.CreationDate,
      imageUrl: a.ImageUrl
    }));
  }
}

export default new AdvertisementService();