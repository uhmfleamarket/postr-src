import React from 'react';
import { Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

class ConditionBar extends React.Component {
  render() {
		return (
      <span className="pricetag"><Header as="h1">${this.props.price}</Header></span>
		)
	}
}

/** Require a document to be passed to this component. */
ConditionBar.propTypes = {
  price: PropTypes.number.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ConditionBar);
