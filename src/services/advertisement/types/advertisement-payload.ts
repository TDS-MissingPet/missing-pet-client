import { Advertisement } from "../../../stores/advertisement";

export type AdvertisementPayload = Pick<Advertisement, 'title' | 'text' | 'reward' | 'tags'> & { image?: File };
