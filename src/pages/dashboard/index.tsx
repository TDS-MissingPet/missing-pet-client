
import { RouteComponentProps } from "@reach/router";
import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { Spinner, Button } from "react-bootstrap";
import * as mobx from "mobx";

import Advertisement from "../../components/advertisement";
import {
  AdvertisementStore,
  STORE_TOKEN as ADVERTISEMENT_STORE_TOKEN
} from "../../stores/advertisement";
import {
  NotificationStore,
  STORE_TOKEN as NOTIFICATION_STORE_TOKEN
} from "../../stores/notification";
import { CreateAdModal } from "../../components";
import { AdvertisementPayload } from "../../services/advertisement/types";
import "./index.css";

interface Props {
  [ADVERTISEMENT_STORE_TOKEN]: AdvertisementStore;
  [NOTIFICATION_STORE_TOKEN]: NotificationStore;
}

interface State {
  showAddItemModal: boolean;
}

const reactions: mobx.IReactionDisposer[] = [];

@inject(ADVERTISEMENT_STORE_TOKEN, NOTIFICATION_STORE_TOKEN)
@observer
class DashboardPage extends Component<RouteComponentProps<Props>, State> {
  state = {
    showAddItemModal: false
  };

  componentDidMount() {
    const adStore = this.props[ADVERTISEMENT_STORE_TOKEN];
    const notificationStore = this.props[NOTIFICATION_STORE_TOKEN];
    adStore!.loadItems();

    const disposer = mobx.reaction(
      () => adStore!.isError,
      () => {
        notificationStore!.addNotification({
          message: "Failed to load advertisements, please try again later",
          type: "danger"
        });
      }
    );
    reactions.push(disposer);
  }

  componentWillUnmount() {
    reactions.forEach(dispose => dispose());
  }

  toggleAddItemModal = () => {
    this.setState({
      showAddItemModal: !this.state.showAddItemModal
    });
  };

  createItem = (values: AdvertisementPayload) => {
    this.props[ADVERTISEMENT_STORE_TOKEN]!.createItem(values);
  };

  render() {
    const adStore = this.props[ADVERTISEMENT_STORE_TOKEN];
    const isLoading = adStore!.isLoading;
    const isError = adStore!.isError;
    const ads = adStore!.ads;
    const { showAddItemModal } = this.state;

    if (isLoading) {
      return (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
          <Spinner animation="border" className="dashboard-spinner" />
        </div>
      );
    }

    if (isError) {
      return <h1>Oh-oh :(</h1>;
    }

    return (
      <>
        <div className="dashboard__add-item pb-0 p-md-2">
          <Button
            variant="dark"
            size="lg"
            block
            onClick={this.toggleAddItemModal}
          >
            + Create new advertisement
          </Button>
        </div>
        <div className="d-flex flex-wrap justify-content-around">
          {ads.map((a, i) => (
            <Advertisement
              key={i}
              title={a.title}
              text={a.text}
              reward={a.reward}
              tags={a.tags}
              imageUrl={a.imageUrl}
              creationDate={a.creationDate}
            />
          ))}
        </div>
        <CreateAdModal
          show={showAddItemModal}
          onHide={this.toggleAddItemModal}
          onSubmit={this.createItem}
        />
      </>
    );
  }
}

export default DashboardPage;
