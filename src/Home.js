import React, { Component } from 'react';
import MyNavbar from './Navbar';
import MyCarousel from './carousel_aeroclube';
import './carousel.css';

class Home extends Component {
  render() {
    return (
      <div>
        <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossorigin="anonymous"
        />
        <MyNavbar/>
        <div className="title">
          <h1>Bem-vindo(a) ao Aeroclube Stop Down!</h1>
        </div>
        <MyCarousel/>
      </div>
    )
  }
}

export default Home;