import React, { Component } from 'react';
import { Button } from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';
import FontIcon from 'react-toolbox/lib/font_icon';

class Login extends Component{
  constructor(...args){
		super(...args);
		this.state = {msg: false, name: false, password: false};
	}

  change(name, value){
		this.setState({[name]: value});
	}

	submit(e){
		e.preventDefault();
		this.setState({msg: false});

		this.context.io.run('login', {
			name: this.state.name,
			password: this.state.password
		}, (response) => {
			if(response.response){
				this.context.auth(true);
				this.context.router.push('/');
			}
			else{
				this.setState({msg: response.errors.message})
			}
		});
	}

  render(){
    return (
      <form method="POST" className="card__container bg-blue-light" onSubmit={this.submit.bind(this)}>
        <div  className="card__body">
          <Input name="name" id="name" type="text" required label="Name" onChange={this.change.bind(this, 'name')} /><br/>
          <Input name="password" id="password" required type="password" label="Password"  onChange={this.change.bind(this, 'password')} /><br/>
          <div className="error" style={(this.state.msg) ? {} : {'display': 'none'}} >
            <FontIcon value='error' />
            {this.state.msg}
          </div>
          <Button type="submit" label="Login" raised primary />
        </div>
      </form>
    );
  }
}

Login.contextTypes = {
	router: React.PropTypes.object.isRequired,
	auth: React.PropTypes.func,
	io: React.PropTypes.object
};

export default Login;