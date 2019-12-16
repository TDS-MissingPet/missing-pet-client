import sample from "lodash/sample";
import { inject, observer } from "mobx-react";
import React, { useEffect, useMemo } from "react";
import { Badge, Card, Col, Row, Button } from "react-bootstrap";

import { badges } from "../../components/advertisement";
import {
  AdvertisementStore,
  STORE_TOKEN as ADVERTISEMENT_STORE_TOKEN
} from "../../stores/advertisement";
import "./index.css";

export interface Props {
  idx?: string;
  [ADVERTISEMENT_STORE_TOKEN]?: AdvertisementStore;
}

const AdDetailsPage: React.SFC<Props> = ({
  idx,
  [ADVERTISEMENT_STORE_TOKEN]: adStore
}) => {
  useEffect(() => {
    if (!adStore!.itemsWereFetched) {
      adStore!.loadItems();
    }
  }, [adStore]);

  const item = useMemo(() => adStore!.getItem(Number(idx)), [
    idx,
    adStore!.ads,
    adStore
  ]);
  const isLoading = adStore!.isLoading;
  const tagsComponents = useMemo(
    () =>
      ((item && item.tags) || []).map((tag, i) => (
        <Badge variant={sample(badges) as any} key={i} className="mr-1 mb-1">
          {tag}
        </Badge>
      )),
    [item]
  );

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!item) {
    return <h1>404 | Item not found</h1>;
  }

  return (
    <div>
      <Button variant="link" className="p-0" onClick={() => window.history.back()}>Go Back</Button>
      <h1 className="border-bottom my-4">{item.title}</h1>
      <Row
        as={Card}
        className="ad-details__content flex-row p-2 mx-auto mx-md-0"
      >
        <Col md="8" xs="12" className="border-bottom">
          <Card className="mb-2" bg="light">
            <Card.Header className="px-2">
              <strong>Description</strong>
            </Card.Header>
            <Card.Body className="p-2">
              <p>{item.text}</p>
              <small className="text-muted">Created on: {new Date(item.creationDate).toLocaleDateString()}</small>
            </Card.Body>
          </Card>
          Tags: {tagsComponents}
        </Col>
        <Col md="4" xs="12">
          <strong className="d-block mb-1 mt-3 mt-md-0">Details:</strong>
          <ul className="list-unstyled mt-1 mt-md-0">
            <li className="d-flex align-items-center justify-content-between">
              <span>Reward</span>
              <span className="font-weight-bold">{item.reward}</span>
            </li>
            <li className="d-flex align-items-center justify-content-between">
              <span>Author</span>
              <span className="font-weight-bold">{`${item.account.FirstName.slice(0, 1)}. ${item.account.LastName}`}</span>
            </li>
            <li className="d-flex align-items-center justify-content-between">
              <span>Phone</span>
              <span className="font-weight-bold">
                <a href={`tel:${item.account.PhoneNumber}`}>{item.account.PhoneNumber}</a>
              </span>
            </li>
          </ul>
        </Col>
      </Row>
    </div>
  );
};

export default inject(ADVERTISEMENT_STORE_TOKEN)(observer(AdDetailsPage));
