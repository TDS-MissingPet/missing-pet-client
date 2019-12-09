export interface RawAdvertisement {
  Title: string;
  Text: string;
  Reward: number;
  AccountId: number;
  CreationDate: string;
  Tags: string[];
  Account: {
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
  };
  ImageUrl: string;
}