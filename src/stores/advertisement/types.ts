export interface Advertisement {
  title: string;
  text: string;
  reward: number;
  tags: string[];
  creationDate: string;
  imageUrl?: string;
  accountId: number;
  account: {
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
  }
}