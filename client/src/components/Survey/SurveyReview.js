import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import FIELDS from './surveyFields';
import * as actions from '../../actions';


class SurveyReview extends Component{

  renderContent(){
    return FIELDS.map(({name, label}) => {
      return (
        <div key={label}>
          <h5>{label}:</h5>
          <p>{this.props.values[name]}</p>
          <hr />
        </div>
      );
    });
  }

  render(){
    return (
      <div>
        <h3 className="center-align" style={{margin: '50px 0'}}>Please review before submitting</h3>
        {this.renderContent()}
        <button
          className="btn yellow btn-large left darken-3 white-text btn-flat"
          onClick={this.props.onBack}
          >Back</button>
        <button
          className="btn btn-flat green btn-large right white-text"
          onClick={() => this.props.submitSurvey(this.props.values, this.props.history)}
          >
          Send Survey
          <i className="material-icons right">email</i>
        </button>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    values: state.form.surveyForm.values
  }
}

export default connect(mapStateToProps, actions)(withRouter(SurveyReview));
