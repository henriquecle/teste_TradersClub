import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import Navbar from './components/Navbar/Navbar';
import CarList from './components/CarList/CarList';
import Register from './containers/Register/Register';
import logoTC from './assets/img/logo-tc.png';
import carWireframe from './assets/img/car-wireframe-alpha.png';

class App extends Component {
  state = {
    screen: 'home',
    searchBox: '',
    cars: null,
    selectedCar: null,
    error: false
  };

  getCarsData = (searchBoxValue) => {
    axios.get(`http://private-anon-78be39c465-tradersclubapi.apiary-proxy.com/api/cars?search=${searchBoxValue}`)
      .then( response => {
        const newScreen = searchBoxValue ? 'carList' : 'home';  
        this.setState({ screen: newScreen, cars: response.data.cars, error: false });
      })
      .catch( () => {
        this.setState({ error: true });
      });
  } 

  onSearchBoxChanged = (event) => {
    const searchBoxValue = event.target.value;
    this.setState({ searchBox: searchBoxValue });
    this.getCarsData(searchBoxValue);
  }
  
  onRegisterButtonClicked = () => {
    this.setState({ screen: 'register' });
  }

  onCarClicked = (carID) => {
    this.setState({ screen: 'register', selectedCar: carID })
  }

  onCancelButtonClicked = () => {
    this.setState({ screen: 'home', selectedCar: null })
  }

  onOkButtonClicked = () => {
    this.setState({ screen: 'home', selectedCar: null })
  }

  onLogoClicked = () => {
    this.setState({ screen: 'home', selectedCar: null })
  }

  render() {
    let content;

    const contentStyle = {
      backgroundImage: 'url(' + carWireframe + ')',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    };

    switch (this.state.screen) {
      case 'home':
        content = <div className="Home">Pesquisa de veículos<p>do<span>TradersClub</span></p></div>;
        break;
      case 'carList':
        content = !this.state.error ? 
          <CarList cars={this.state.cars} clickedCar={this.onCarClicked} /> :
          <div className="SearchError">Erro ao fazer a busca.</div>
        break;
      case 'register':
        const selectedCarIndex = this.state.selectedCar ? 
          this.state.cars.findIndex(car => car.id === this.state.selectedCar) :
          null;
        content = <Register 
          brands={this.state.brands} 
          selectedCar={selectedCarIndex ? this.state.cars[selectedCarIndex] : null}
          cancelButtonClicked={this.onCancelButtonClicked} 
          okButtonClicked={this.onOkButtonClicked} />;
        break;
      default:
        break;
    }

    return (
      <div className="App">
        <aside>
          <img src={logoTC} alt={"TC"} onClick={this.onLogoClicked} />
        </aside>
        <div className="Main">
          <Navbar 
            value={this.state.searchBox} 
            changed={this.onSearchBoxChanged} 
            registerButtonClicked={this.onRegisterButtonClicked} />
          <div className="Content" style={contentStyle}>
            {content}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
