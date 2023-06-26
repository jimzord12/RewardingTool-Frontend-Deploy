import React from "react";
import { Card, CardBody, CardTitle, CardText, CardImg } from "reactstrap";

function PendingCard({ item }) {
  // console.log(item.img);
  return (
    <Card className="product-card">
      <CardImg
        top
        className="card-img-top"
        src={item.image}
        alt="Card image cap"
      />
      <CardBody>
        <CardTitle tag="h5">{item.title}</CardTitle>
        {/* <CardText>{item.description}</CardText> */}
        <div className="info-row">
          <div className="info-title">ID:</div>
          <div className="info-data text-success">
            <b>{item.id}</b>
          </div>
        </div>
        <div className="info-row">
          <div className="info-title">Price:</div>
          <div className="info-data text-success">
            <b>{item.price}</b>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default PendingCard;
