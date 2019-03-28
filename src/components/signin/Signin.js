import React,{ Component } from 'react';

class Signin extends Component {
  constructor(props){
    super(props);
    this.state={
      email:"",
      password:""
    }
  }

  OnEmailChange=(event)=>{
    this.setState({email:event.target.value});
  }

  OnPasswordChange=(event)=>{
    this.setState({password:event.target.value});
  }

  OnSubmit=()=>{    
    if(!this.state.email||!this.state.password) return;
    fetch('https://blooming-hollows-81737.herokuapp.com/signin',{
      method:'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    }).then(res=>res.json()).then(user=>{
      if(user.id) {this.props.loadUser(user);
        this.props.onRouteChange('home')};
    })
  }

  render(){
    const {onRouteChange}=this.props;
    return(
    <article className="br3 ba b--white-20 mv4 w-100 w-50-m w-25-l mw6 shadow5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input className="pa2 input-reset ba bg-transparent hover-white w-200" 
              onChange={this.OnEmailChange}
              type="email" name="email-address"  id="email-address"/>
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input className="b pa2 input-reset ba bg-transparent hover-white w-200" 
              onChange={this.OnPasswordChange}
              type="password" name="password"  id="password"/>
            </div>
          </fieldset>
          <div className="">
            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
            onClick={()=>this.OnSubmit()}
            type="submit" value="Sign in"/>
          </div>
          <div className="lh-copy mt3">
            <p onClick={()=>onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
          </div>
        </div>
      </main>
    </article>
    );}
  }

export default Signin;