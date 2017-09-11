import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {connect} from 'react-redux';

import * as actions from '../actions';

class Payments extends Component{
  render(){
    return (
      <StripeCheckout
        name="Survey Panda"
        description="Pay 5 dollars for 5 credits"
        amount={500}
        token={token => this.props.handleStripe(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
      <button className="waves-effect waves-light btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);
