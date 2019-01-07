import React from 'react';
import './CarList.css';

const carList = (props) => {
  let numberOfCars = 0;
  
  return (
    <div className="CarList">
      {props.cars && props.cars.map( car => {
        if (car.title && car.id) {
          numberOfCars++;
          const carPriceArr = Number(car.price).toFixed(2).split('.');
          const carPrice = Number(carPriceArr[0]).toLocaleString() + ',' + carPriceArr[1];

          return (
            <div key={Math.random()} className="Car" onClick={() => props.clickedCar(car.id)}>
              <div className="Info">
                <div className="FirstLine">
                  <div className="Title">
                    {car.title}
                  </div>
                  <div className="Price">
                    {!isNaN(car.price) ? `R$ ${carPrice}` : null}
                  </div>
                </div>
                <div className="SecondLine">
                  <div className="ModelBrandKm">
                    {car.model} 
                    {car.brand ? ` ${String.fromCharCode(8226)} ${car.brand}` : null} 
                    {!isNaN(car.km) ? ` ${String.fromCharCode(8226)} ${Number(car.km).toLocaleString()} KM` : null} 
                  </div>
                  <div className="Year">
                    {car.year}
                  </div>
                </div>
              </div>
            </div>
          )
        }
        return null;
      })}
      {!numberOfCars ? <div className="NoCar">Nenhum carro encontrado.</div> : null}
    </div>
  )
}

export default carList;