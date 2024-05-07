import { Card, CardBody, CardTitle, CardText, CardImg } from "reactstrap";

function MyCard({ item }) {
  return (
    <Card className={`product-card`}>
      <CardImg
        top
        className="card-img-top"
        src={item.image}
        alt="Card image cap"
        // onClick={() => {
        //   const secretCode = getFromLS();
        //   console.log(secretCode);
        //   if (secretCode !== null) {
        //     setShowCode(secretCode);
        //   } else {
        //   }
        // }}
      />
      <CardBody>
        <CardTitle tag="h5">{item.name}</CardTitle>
        <CardText>{item.description}</CardText>
      </CardBody>
    </Card>
  );
}

export default MyCard;
