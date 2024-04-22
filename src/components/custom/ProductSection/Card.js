import { Card, CardBody, CardTitle, CardText, CardImg } from "reactstrap";
import testImage from "assets/img/genera/v3/MGS_to_Rarity.webp";
// import { useLS } from "hooks/useLS";

function MyCard({ item }) {
  // const [, getFromLS] = useLS(item.pendindRewardID, null);

  return (
    <Card className={`product-card`}>
      <CardImg
        top
        className="card-img-top"
        src={testImage}
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
        <div className="info-row">
          <div className="info-title">Price:</div>
          <div className="info-data text-success">
            <b>{item.price}</b>
          </div>
        </div>
        <div className="info-row">
          <div className="info-title">Location:</div>
          <div className="info-data text-success">
            <b>{item.location}</b>
          </div>
        </div>
        <div className="info-row">
          <div className="info-title">{`${
            item.hasOwnProperty("amountToRedeem") ? "Total:" : "Amount:"
          }`}</div>
          <div className="info-data text-success">
            <b>{item.isInfinite ? "inf." : item.amount}</b>
          </div>
        </div>
        {item.hasOwnProperty("amountToRedeem") && (
          <>
            <div className="info-row">
              <div className="info-title">Redeemable:</div>
              <div className="info-data text-success">
                <b>{item.isInfinite ? "inf." : item.amountToRedeem}</b>
              </div>
            </div>
            <div className="info-row">
              <div className="info-title">Claimed:</div>
              <div className="info-data text-success">
                <b>{item.isInfinite ? "inf." : item.amountOfRedeemed}</b>
              </div>
            </div>
          </>
        )}
      </CardBody>
    </Card>
  );
}

export default MyCard;
