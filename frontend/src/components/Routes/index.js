import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Home from '../../pages/firstpage';
import Profil from '../../pages/profil';

const index = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/profil" exact component={Profil} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default index;