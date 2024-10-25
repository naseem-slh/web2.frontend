import Card from 'react-bootstrap/Card';
import { ShopItemResource, ShopListResource } from '../../Resources';
import { Link } from 'react-router-dom';

type Props = {
  shopItem: ShopItemResource;
  linkDisplayed?: boolean;
};

export default function ItemCardComp({ shopItem, linkDisplayed }: Props) {
  return (
    <Card style={{ width: '18rem' }} className="bg-light mb-2">
      <Card.Header>{shopItem.name}</Card.Header>
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">
          <p>{shopItem.creatorName}</p>
        </Card.Subtitle>
        <div>Store: {shopItem.shopListStore}</div>
        <div>Quantity: {shopItem.quantity}</div>
        <div>Remarks: {shopItem.remarks}</div>
        {linkDisplayed && <Link to={`/shopitem/${shopItem.id}`}>View</Link>}
      </Card.Body>
      <Card.Text className="text-muted text-center">{shopItem.createdAt}</Card.Text>
    </Card>
  );
}
