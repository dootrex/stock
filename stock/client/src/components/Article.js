import React from "react";
import { Card, Button } from "react-bootstrap";

export default ({ url, img, headline, stockName }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{stockName}</Card.Title>
        <Card.Text>{headline}</Card.Text>
        <a className="btn btn-primary" href={url}>
          Go to Article
        </a>
      </Card.Body>
    </Card>
  );
};
