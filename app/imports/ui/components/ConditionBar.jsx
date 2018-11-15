import React from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

class ConditionBar extends React.Component {
  render() {
		return (
			<div className="progress-bar">
				<div className="filler" style={{ width: `${this.props.health}%` }} />
			</div>
		)
	}
}

/** Require a document to be passed to this component. */
ConditionBar.propTypes = {
  //stuff: PropTypes.object.isRequired,
  health: PropTypes.string.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ConditionBar);
