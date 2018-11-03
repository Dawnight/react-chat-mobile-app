import React, {Component} from 'react';
import LogoImage from 'static/icon/job.svg';
import './index.css';

class Logo extends Component {
  render () {
    return (
      <div className="logo-container">
        <img src={LogoImage} alt="logo"/>
      </div>
    )
  }
}

export default Logo;
