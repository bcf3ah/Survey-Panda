import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {Link} from 'react-router-dom';

import SurveyField from './SurveyField';
import emailValidator from '../../utils/emailValidator';
import FIELDS from './surveyFields';


class SurveyForm extends Component {

  renderSurveyFields(){
    return FIELDS.map(field => {
      return <Field type="text" component={SurveyField} label={field.label} name={field.name} key={field.name}/>
    });
  }

  render(){
    return (
      <div style={{margin: '50px 0'}}>
        <h3 className="center-align">Create a new survey</h3>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderSurveyFields()}
          <Link to="/surveys" className="btn btn-large red">Cancel</Link>
          <button type="submit" className="btn btn-large teal right white-text"><i className="material-icons right">done</i>Continue</button>
        </form>
      </div>
    );
  }
}

function validate(values){
  const errors = {};

  errors.recipients = emailValidator(values.recipients);

  FIELDS.forEach(({name}) => {
    if(!values[name]){
      errors[name] = `This field is required`
    };
  });

  return errors;
}

export default reduxForm({
  form: 'surveyForm',
  validate,
  destroyOnUnmount: false
})(SurveyForm);
