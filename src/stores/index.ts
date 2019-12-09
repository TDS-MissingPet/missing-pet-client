import userStore, { STORE_TOKEN as USER_STORE_TOKEN } from './user';
import notificationStore, { STORE_TOKEN as NOTIFICATION_STORE_TOKEN } from './notification';
import advertisementService, { STORE_TOKEN as ADVERTISEMENT_STORE_TOKEN } from './advertisement';

const stores = {
  [USER_STORE_TOKEN]: userStore,
  [NOTIFICATION_STORE_TOKEN]: notificationStore,
  [ADVERTISEMENT_STORE_TOKEN]: advertisementService
};

export default stores;