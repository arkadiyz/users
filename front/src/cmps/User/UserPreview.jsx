import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardMeta,
} from 'semantic-ui-react';
import './User.css';

const UserPreview = ({ user }) => {
  return (
    <div className='user-card--container'>
      <Card.Group>
        <Card className='user-card--card'>
          <CardContent>
            <CardHeader
              className='user-card--card__header'
              content={user.firstname}
            />
            <CardMeta
              className='user-card--card__body'
              content={user.lastname}
            />
            <CardDescription
              className='user-card--card__footer'
              content={user.email}
            />
          </CardContent>
        </Card>
      </Card.Group>
    </div>
  );
};

export default UserPreview;
