import userStore, { STORE_TOKEN as USER_STORE_TOKEN } from './user';
import notificationStore, { STORE_TOKEN as NOTIFICATION_STORE_TOKEN } from './notification';

const stores = {
  [USER_STORE_TOKEN]: userStore,
  [NOTIFICATION_STORE_TOKEN]: notificationStore
};

export default stores;