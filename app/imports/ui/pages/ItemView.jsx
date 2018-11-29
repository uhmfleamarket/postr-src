import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Image, Card, Grid, Button, Header, Loader } from 'semantic-ui-react';
import Slider from 'react-slick';
import { Stuffs } from '/imports/api/stuff/stuff';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import NavBar from '/imports/ui/components/NavBar';
import ConditionBar from '/imports/ui/components/ConditionBar';
import { NavLink } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class ItemView extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
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
    return (
        <>
        <style>{'body { background: #e0fbff; }'}</style>
        <NavBar title={(<Header as='h2' textAlign='center'>{'{ITEM NAME}'}</Header>)}>
          <Button as={NavLink} exact to="/userhome">{'<'} Browse Items</Button>
        </NavBar>
        <Grid columns='equal' container>
          <Grid.Row>
            <Card centered>
              <div>
                <Slider {...settings}>
                    <Image src='/images/textbooks.jpg'/>
                    <Image src='/images/textbooks.jpg'/>
                    <Image src='/images/textbooks.jpg'/>
                    <Image src='/images/textbooks.jpg'/>
                </Slider>
              </div>
							<ConditionBar health='20' />
            </Card>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Card textAlign="center" style={{width:'50%'}}>
                <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png'/>
                <Card.Content textAlign="center">
                  {'{SELLER NAME}'}
<br />
                  * * * *
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
                <p>Facilis libero rerum quaerat itaque laudantium voluptate. Dicta hic blanditiis odit recusandae autem eum molestiae. Deserunt dolore explicabo aperiam eius sunt ab. Qui mollitia ut molestiae. Dolorem cupiditate qui alias consequuntur perferendis tempora adipisci natus. Dolore quam qui velit.…</p>
            </Grid.Column>
            <Grid.Column>
  <span className="pricetag"><Header as="h1">$1,000.00</Header></span>
            </Grid.Column>
          </Grid.Row>
        </Grid>
          </>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ItemView.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Stuff');
  return {
    stuffs: Stuffs.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ItemView);
