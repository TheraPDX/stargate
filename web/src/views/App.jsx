import React, { Component } from 'react';
import Navigation from './Navigation.jsx';

import { Route, Router, browserHistory } from 'react-router';
import { appCss } from './../style/app.scss';
var Api = require("imports?this=>window!./../utils/Api")

class App extends Component {
	getChildContext() {
		var auth = false;
		if('/user/login' !== window.location.pathname){
			auth = true;
		}
		else if('/user/login' === window.location.pathname){
			auth = false;
		}
    return {
      auth: (val) => {
				if(val){
					auth = val;
				}
				return auth;
			},
			io: Api
    };
  }

  render() {
    return (
			<div>
				<Navigation />
				<div className="wrapper">
					{this.props.children}
				</div>
			</div>
		)
  }
}

App.contextTypes = {
	router: React.PropTypes.object.isRequired,
};

App.childContextTypes = {
	auth: React.PropTypes.func,
	io: React.PropTypes.object
};

export default App;