import React, { useMemo } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import sample from "lodash/sample";

import logo from "./placeholder.jpg";
import "./index.css";

export interface Props {
  title: string;
  text: string;
  reward: number;
  tags: string[];
  creationDate: string;
  imageUrl?: string;
  onClick: (...args: any[]) => void;
}

export const badges = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "light",
  "dark"
];

const Advertisement: React.SFC<Props> = ({
  title,
  text,
  reward,
  tags,
  imageUrl,
  creationDate,
  onClick
}) => {
  const tagsComponents = useMemo(
    () =>
      (tags || []).map((tag, i) => (
        <Badge variant={sample(badges) as any} key={i} className="mr-1 mb-1">
          {tag}
        </Badge>
      )),
    [tags]
  );

  return (
    <Card style={{ width: "18rem" }} className="mb-3 mr-3">
      <Card.Img
        variant="top"
        src={imageUrl || logo}
        style={{ height: "18rem" }}
      />
      <div className="p-2">
        <Card.Title className="mb-1 mr-2">{title}</Card.Title>
        <div className="d-flex flex-wrap">{tagsComponents}</div>
        <Card.Text className="mt-2 ad__text">{text}</Card.Text>
        <div className="mb-2">
          <div>
            <strong>Reward:</strong> {reward}
          </div>
          <div>
            <strong>Posted at:</strong> {new Date(creationDate).toDateString()}
          </div>
        </div>
        <Button variant="primary" className="w-100" onClick={onClick}>
          See details
        </Button>
      </div>
    </Card>
  );
};

export default Advertisement;
