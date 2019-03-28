import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation.js';
import Logo from './components/logo/Logo.js';
import Rank from './components/rank/Rank.js';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm.js';
import 'tachyons';
import Particles from 'react-particles-js';
import Signin from './components/signin/Signin.js';
import Register from './components/register/Register.js';
import FaceRec from './components/faceRec/FaceRec.js';

const particleOptions={
  particles:{
    number:{
      value:70,density:{
        enable:true,value_area:800
      }
    }
  }
}

const initialState={
  input:"",
  imageUrl:"",
  box:{},
  celebrity:"",
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor(){
    super();
    this.state=initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  OnInputChange=(event)=>{
    this.setState({input:event.target.value});
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const res = data.outputs[0].data.regions[0].data.face.identity.concepts[0].name;
    //console.log(res.name,res.value);
    this.setState({celebrity:res});
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  draw=(box)=>{
    this.setState({box: box});
  }

  OnSubmit=()=>{
    this.setState({imageUrl:this.state.input});
    fetch('https://blooming-hollows-81737.herokuapp.com/api',{
      method:'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input:this.state.input
      })
    }).then(res=>res.json())
    .then(response=>{
      if(response){
        fetch('https://blooming-hollows-81737.herokuapp.com/image',{
          method:'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id:this.state.user.id
          })
        }).then(res=>res.json()).then(count=>{
          this.setState(Object.assign(this.state.user,{entries:count}))
        }).catch(console.log)
      }
      this.draw(this.calculateFaceLocation(response))
    })
    .catch(err=>console.log(err));
  }

  render() {
    const { isSignedIn, imageUrl, route, box, celebrity } = this.state;
    return (
      <div className="App">
        <Particles className='particle' params={particleOptions}/>
        <div className='nav'>
          <Logo />
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>          
        </div>
        {route === 'home'
          ?<div>
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm onInputChange={this.OnInputChange} 
            onSubmit={this.OnSubmit}/>
            <FaceRec box={box} url={imageUrl} celebrity={celebrity}/>
          </div>
          :(route==='signin'
          ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}

export default App;
 