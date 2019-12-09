import { RouteComponentProps } from "@reach/router";
import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { Spinner } from "react-bootstrap";

import Advertisement from "../../components/advertisement";
import {
  AdvertisementStore,
  STORE_TOKEN as ADVERTISEMENT_STORE_TOKEN
} from "../../stores/advertisement";
import "./index.css";

interface Props {
  [ADVERTISEMENT_STORE_TOKEN]: AdvertisementStore;
}

@inject(ADVERTISEMENT_STORE_TOKEN)
@observer
class DashboardPage extends Component<RouteComponentProps<Props>> {
  componentDidMount() {
    const adStore = this.props[ADVERTISEMENT_STORE_TOKEN];
    adStore!.loadItems();
  }

  render() {
    const adStore = this.props[ADVERTISEMENT_STORE_TOKEN];
    const isLoading = adStore!.isLoading;
    const ads = adStore!.ads;

    if (isLoading) {
      return (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
          <Spinner animation="border" className="dashboard-spinner" />
        </div>
      );
    }

    return (
      <div className="d-flex flex-wrap justify-content-around">
        {[...ads, ...ads, ...ads, ...ads, ...ads].map((a, i) => (
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
    );
  }
}

export default DashboardPage;
