import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';

import Landing from './Landing';
import Header from './Header';
import Dashboard from './Dashboard';
import SurveyNew from './Survey/SurveyNew';




class App extends Component{

  componentDidMount(){
    this.props.fetchUser();
  }

  render(){
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <div className="container">
              <Route path="/" component={Landing} exact/>
              <Route path="/surveys" component={Dashboard} exact />
              <Route path="/surveys/new" component={SurveyNew} exact />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, actions)(App);
