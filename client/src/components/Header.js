import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Payments from './Payments';

class Header extends Component {

  renderHeaderItem(){
    switch(this.props.auth){
      case null:
        return;
      case false:
        return <li><a href="/auth/google">Sign in with Google</a></li>
      default:
        return [
          <li key="payment-form"><Payments /></li>,
          <li key="credits"><a>Credits: {this.props.auth.credits}</a></li>,
          <li key="logout-button"><a href="/api/logout">Log out</a></li>
        ]
    }
  }

  render(){
    return (
      <nav>
        <div className="nav-wrapper">
            <Link to={this.props.auth ? "/surveys" : "/"} className="brand-logo" style={{marginLeft: 10}}>Survey Panda</Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              {this.renderHeaderItem()}
            </ul>
          </div>
      </nav>
    );
  }
}

function mapStateToProps(state){
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Header);
