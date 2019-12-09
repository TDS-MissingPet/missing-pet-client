import userStore, { STORE_TOKEN as USER_STORE_TOKEN } from './user';

const stores = { [USER_STORE_TOKEN]: userStore };

export default stores;