import { inject, observer } from "mobx-react";
import React from "react";
import Alert from "react-bootstrap/Alert";

import {
  NotificationStore,
  STORE_TOKEN as NOTIFICATION_STORE_TOKEN
} from "../../stores/notification";
import "./index.css";

export interface Props {
  [NOTIFICATION_STORE_TOKEN]?: NotificationStore;
}

const NotificationManager: React.SFC<Props> = ({
  [NOTIFICATION_STORE_TOKEN]: notificationStore
}) => {
  const notifications = notificationStore!.notifications.map(n => (
    <Alert
      key={n.id}
      variant={n.type}
      className="mp-notification"
      onClose={() => notificationStore!.dismiss(n.id)}
      dismissible
    >
      {n.message}
    </Alert>
  ));

  return <>{notifications}</>;
};

export default inject(NOTIFICATION_STORE_TOKEN)(observer(NotificationManager));
