import { observable, action } from "mobx";
import nanoid from "nanoid";

type Notification = {
  message: string;
  type?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "dark"
    | "light";
};

export const STORE_TOKEN = "NotificationStore";

export class NotificationStore {
  @observable notifications: Array<Notification & { id: string }> = [];

  @action
  addNotification(payload: Notification) {
    this.notifications.push({ type: 'primary' ,...payload, id: nanoid() });
  }

  @action
  dismiss(id: string) {
    this.notifications = this.notifications.filter(n => n.id !== id);
  }
}
