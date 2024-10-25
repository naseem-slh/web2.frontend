import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { ShopListResource } from '../../Resources';
import { Link } from 'react-router-dom';

type Props = {
  shopList: ShopListResource,
  linkDisplayed?: boolean
}
export default function ListCardComp({ shopList, linkDisplayed }: Props) {
  return (
    <Card style={{ width: '18rem' }} className="bg-secondary mb-3">
      <Card.Body>
        <Card.Title>{shopList.store}</Card.Title>
        <Card.Text>
          {shopList.creatorName}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Public: {shopList.public ? 'Yes' : 'No'}</ListGroup.Item>
        <ListGroup.Item>Done: {shopList.done ? 'Yes' : 'No'}</ListGroup.Item>
        <ListGroup.Item>ShopItemCount: {shopList.shopItemCount}</ListGroup.Item>
      </ListGroup>
      {
        linkDisplayed && (
          <Card.Body>
            <Link to={`/shoplist/${shopList.id}`}>View</Link>
          </Card.Body>)
      }
      <Card.Footer className="text-muted">{shopList.createdAt}</Card.Footer>
    </Card>
  );
}

