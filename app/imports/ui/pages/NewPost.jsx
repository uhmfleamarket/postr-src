import React from 'react';
import { Items, ItemSchema } from '/imports/api/item/item';
import { Grid, Segment, Header } from 'semantic-ui-react';
import {AutoForm, TextField, NumField, SelectField, SubmitField, HiddenField, LongTextField, ErrorsField } from 'uniforms-semantic';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import ImagesUploader from 'react-images-uploader';
import NavBar from '/imports/ui/components/NavBar'
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

class PostrUploader extends ImagesUploader {
  constructor(props){
    super(props)

    this.handleImageChange = this.handleImageChange.bind(this)
  }

  loadImages(files, url, onLoadEnd) {
    console.log("LOAD IMAGES CALLED")
  }

  handleImageChange(e) {
    console.log(e)
    e.preventDefault();
    this.setState({
                  loadState: 'loading',
    });


    console.log(this.state)
    let imagePreviewUrls = this.state.imagePreviewUrls.concat(["http://localhost:3000/images/textbooks.jpg"])
    this.setState({
                  imagePreviewUrls,
                  optimisticPreviews: [],
                  loadState: 'success',
    });
    console.log(this.state)
  }
}

/** Renders the Page for adding a document. */
class AddItem extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add succeeded' });
      this.formRef.reset();
    }
  }

  /** On submit, insert the data. */
  submit(data) {
    //data.owner = Meteor.userId()
    Items.insert(data, this.insertCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    console.log(this.state)
    return (
      <div>
        <NavBar />
        <Grid container centered>
          <AutoForm ref={(ref) => { this.formRef = ref; }} schema={ItemSchema} onSubmit={this.submit}>
            <Grid.Row>
              <Grid.Column>
              <Header as="h2" textAlign="center">Add Item</Header>
              <TextField name='name'/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <PostrUploader
                      url="http://localhost:300/file-upload"
                      onLoadEnd={(err) => { if(err) { console.error(err)} }}
                      max={5}
                      />
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <NumField name='price' decimal={true}/>
              </Grid.Column>
              <Grid.Column>
                <NumField name='quality'/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <LongTextField name='description'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='owner' value='foo@bar.com'/>
                <HiddenField name='active' value='true'/>
                <HiddenField name='images' value={[]}/>
              </Grid.Column>
            </Grid.Row>
          </AutoForm>
        </Grid>
      </div>
    );
  }
}

export default AddItem;
