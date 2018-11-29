import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Icon, Image, Card, Container, Grid, Button, Header, Loader } from 'semantic-ui-react';
import Slider from 'react-slick';
import { Items, ItemSchema } from '/imports/api/item/item';
import { withTracker } from 'meteor/react-meteor-data';
import { AutoForm, ErrorsField, SubmitField, TextField, LongTextField } from 'uniforms-semantic'
import PropTypes from 'prop-types';
import NavBar from '/imports/ui/components/NavBar';
import ConditionBar from '/imports/ui/components/ConditionBar';
import ContactUser from '/imports/ui/components/ContactUser';
import PriceTag from '/imports/ui/components/PriceTag';
import { NavLink } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class ItemView extends React.Component {

  state = {edit:false}

  currentImage = 0

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

  edit = () => {
    this.setState({edit:true})
  }

  updatePost = (data) => {
    if(JSON.stringify(data) !== JSON.stringify(this.props.item))
      Items.update(data._id, {$set: data}, (error) => {
        if(error)
          Bert.alert({type:'danger', message: `Update failed: ${error.message}`})
        else
          Bert.alert({type:'success',message:'Update successful'})
      });
    this.setState({edit:false})
  }

  description() {
    let desc = "test";
    if(this.state.edit)
      return (
        <LongTextField name="description"/>
      )
    else
      return (
        <p>{this.props.item.description}</p>
      )
  }

  name() {
    if(this.state.edit)
      return (
        <TextField name="name" />
      )
    else
      return (
        <Header as='h2' textAlign='center'>{this.props.item.name}</Header>
      )
  }

  deleteImage = (e) => {
    //TODO: delete image file from server
    console.log({ images: this.props.item.images.splice(this.currentImage, 1) })
    Items.update(this.props.item._id, {$set: { images: this.props.item.images.splice(this.currentImage, 1) } }, (error) => {
      if(error)
        Bert.alert({type:'danger', message: `Error deleting image: ${error.message}`})
      else
        Bert.alert({type:'success',message:'Successfully deleted image'})

      if(this.currentImage >= this.props.item.images.length)
        this.currentImage = this.props.item.images.length;
    });
    e.preventDefault()
  }

  addImage(e) {
    e.stopPropagation()
  }

  cancelEdit = (e) => {
    e.stopPropagation()
    this.setState({edit:false})
  }

  showImage(image) {
    if(this.state.edit)
      return (
        <>
          <Image src={image} />
          <Button onClick={this.deleteImage}>Delete Image</Button>
          <Button onClick={this.addImage}>Add Image</Button>
        </>
      )
    else
      return <Image src={image} />
  }

  price() {
    if(this.state.edit)
      return (
        <TextField name="price" />
      )
    else
      return (
        <PriceTag price={this.props.item.price.toFixed(2)} />
      )
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
      afterChange: function(i){
        this.currentImage = i
      }.bind(this)
      //prevArrow: (<Button className="slick-arrow slick-prev">prev</Button>),
      //nextArrow: 'next',
    };
    const star = <Icon name='star' />;
		const rating = [star, star, star, star, star];

    this.item = this.props.item;
    return (
      <AutoForm schema={ItemSchema} model={this.props.item} onSubmit={this.updatePost}>
        <Grid columns='equal' container style={{background:'#e0fbff'}}>
          <style>{'body { background: #e0fbff; }'}</style>
          <Grid.Row>
            <Grid.Column>
              <Button as={NavLink} exact to="/userhome">{'<'} Browse Items</Button>
            </Grid.Column>
            <Grid.Column>
              {this.name()}
            </Grid.Column>
            <Grid.Column>
              <NavButtons />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Card centered>
              <div>
                <Slider {...settings}>
                  {this.props.item.images.map(image => this.showImage(image) )}
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
              {this.description()}
            </Grid.Column>
            <Grid.Column>
              { this.props.owner._id == Meteor.userId() || true ?
                  ( !this.state.edit ? (
                    <Button onClick={this.edit}>Edit</Button>
                  ):(
                    <>
                    <ErrorsField />
                    <SubmitField value="Save" />
                    <Button onClick={this.cancelEdit}>Cancel</Button>
                    </>
                  ))
              :""}
              <br/><br/>
              {this.price()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </AutoForm>
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
    item: match.params._id ? Items.findOne(match.params._id) : Items.findOne(),
    owner: Meteor.users.findOne(),
    ready: itemsub.ready() && ownersub.ready(),
  };
})(ItemView);
