import React from 'react';
import {Link} from 'react-router-dom';

import SurveyList from './SurveyList';

const Dashboard = () => {
  return (
    <div>
      <h1 className="center-align">Surveys</h1>
      <SurveyList />
      <div className="fixed-action-btn">
         <Link to="/surveys/new" className="btn-floating btn-large red waves-effect waves-light">
           <i className="large material-icons">add</i>
         </Link>
       </div>
    </div>
  );
}

export default Dashboard;
