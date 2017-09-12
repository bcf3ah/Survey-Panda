import React, {Component} from 'react';
import {reduxForm} from 'redux-form';

import SurveyForm from './SurveyForm';
import SurveyReview from './SurveyReview';

class SurveyNew extends Component{
  state = {showFormReview: false};

  render(){
    return (
      <div>
        {this.state.showFormReview ? <SurveyReview onBack={() => this.setState({showFormReview: false})}/> : <SurveyForm onSurveySubmit={() => this.setState({showFormReview: true})}/>}
      </div>
    );
  }
}

export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);
