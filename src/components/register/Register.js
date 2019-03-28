import React,{Component} from 'react';

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      email:"",
      password:"",
      name:""
    }
  }

  OnEmailChange=(event)=>{
    this.setState({email:event.target.value});
  }

  OnPasswordChange=(event)=>{
    this.setState({password:event.target.value});
  }

  OnNameChange=(event)=>{
    this.setState({name:event.target.value});
  }

  OnSubmit=()=>{
    if(!this.state.email||!this.state.password||!this.state.name) return;
    fetch('https://blooming-hollows-81737.herokuapp.com/register',{
      method:'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
    }).then(res=>res.json()).then(user=>{if(user.id){this.props.loadUser(user);
      this.props.onRouteChange('home');
    }})
  }
  
  render(){
    return (
      <article className="br3 ba b--white-20 mv4 w-100 w-50-m w-25-l mw6 shadow5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                <input 
                onChange={this.OnNameChange}
                className="pa2 input-reset ba bg-transparent hover-white w-200" type="text" name="name"  id="name"/>
              </div>             
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input 
                onChange={this.OnEmailChange}
                className="pa2 input-reset ba bg-transparent hover-white w-200" type="email" name="email-address"  id="email-address"/>
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input 
                onChange={this.OnPasswordChange}
                className="b pa2 input-reset ba bg-transparent hover-white w-200" type="password" name="password"  id="password"/>
              </div>
            </fieldset>
            <div className="">
              <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
              onClick={()=>this.OnSubmit()}
              type="submit" value="Register"/>
            </div>
          </div>
        </main>
      </article>
    );}
  }

export default Register;