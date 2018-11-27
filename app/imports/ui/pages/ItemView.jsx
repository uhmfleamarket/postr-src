import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Icon, Image, Card, Container, Grid, Button, Header, Loader } from 'semantic-ui-react';
import Slider from 'react-slick';
import { Items } from '/imports/api/item/item';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import NavButtons from '/imports/ui/components/NavButtons';
import ConditionBar from '/imports/ui/components/ConditionBar';
import ContactUser from '/imports/ui/components/ContactUser';
import PriceTag from '/imports/ui/components/PriceTag';
import { NavLink } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class ItemView extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    if(this.props.ready) {
      if(!!this.props.item)
        return this.renderPage();
      else
        return <>ERROR: ITEM NOT FOUND</>   //TODO: make page for error message
    }
    else
      return <Loader active>Getting data</Loader>;
  }

	getRating() {
    let rating = ['*', '*', '*', '*', '*'].slice(0, this.props.owner.profile.rating); 
    return rating.map(star => <Icon name='star' color='yellow' />);
	}

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      slide: "Image",
      dots: false,
      //prevArrow: (<Button className="slick-arrow slick-prev">prev</Button>),
      //nextArrow: 'next',
    };
    const star = <Icon name='star' />;
		const rating = [star, star, star, star, star];
    return (
        <Grid columns='equal' container style={{background:'#e0fbff'}}>
          <style>{'body { background: #e0fbff; }'}</style>
          <Grid.Row>
            <Grid.Column>
              <Button as={NavLink} exact to="/userhome">{'<'} Browse Items</Button>
            </Grid.Column>
            <Grid.Column>
              <Header as='h2' textAlign='center'>{this.props.item.name}</Header>
            </Grid.Column>
            <Grid.Column>
              <NavButtons />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Card centered>
              <div>
                <Slider {...settings}>
                  {this.props.item.images.map(image => (
                    <Image src={image} />
                  ))}
                </Slider>
              </div>
              <ConditionBar health={this.props.item.quality} />
            </Card>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Card style={{width:'50%'}}>
                <Image src={this.props.owner.profile.picture} />
                <Card.Content textAlign="center">
                  {this.props.item.owner}
                  <br />
                  {this.getRating()}
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
                <p>Facilis libero rerum quaerat itaque laudantium voluptate. Dicta hic blanditiis odit recusandae autem eum molestiae. Deserunt dolore explicabo aperiam eius sunt ab. Qui mollitia ut molestiae. Dolorem cupiditate qui alias consequuntur perferendis tempora adipisci natus. Dolore quam qui velit.…</p>
            </Grid.Column>
            <Grid.Column textAlign="center">
      <ContactUser item={this.props.item._id} user={this.props.owner._id} image={this.props.item.images[0]} >Contact Seller</ContactUser>
      <br />
      <br />
              <PriceTag price={this.props.item.price.toFixed(2)} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
    );
  }
}

/** Require an array of Item documents in the props. */
ItemView.propTypes = {
  //item: PropTypes.object.isRequired,
  //owner: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  const itemsub = Meteor.subscribe('Item');
  const ownersub = Meteor.subscribe('OwnerRating', itemsub.ready() ? Items.findOne().owner : "john@foo.com");
  return {
    item: Items.findOne(match.params._id),
    owner: Meteor.users.findOne(),
    ready: itemsub.ready() && ownersub.ready(),
  };
})(ItemView);
