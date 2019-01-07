import React, { Component } from 'react';
import axios from 'axios';
import './Register.css';
import FormFieldSelect from '../../components/FormFieldSelect/FormFieldSelect';
import Spinner from '../../components/Spinner/Spinner';


class Register extends Component {
  state = {
    formFields: [
      {id: 0, name: "Title", placeholder: "Título", type: "text", value: ""},
      {id: 1, name: "Model", placeholder: "Modelo", type: "text", value: ""},
      {id: 2, name: "Year", placeholder: "Ano", type: "number", value: ""},
      {id: 3, name: "Brand", placeholder: "Marca", type: "select", value: null, open: false},
      {id: 4, name: "Color", placeholder: "Cor", type: "text", value: ""},
      {id: 5, name: "Price", placeholder: "Preço", type: "number", value: ""},
      {id: 6, name: "Km", placeholder: "Quilometragem", type: "number", value: ""},
    ],
    loading: false,
    reqMessage: null
  };

  componentDidMount() {
    this.getBrandsData();
    
    if (this.props.selectedCar) {
      this.fillFieldsWithSelectedCar();
    }
  }

  toggleFieldSelect = (id) => {
    let newFormFields = this.state.formFields.map( field => {
      return { ...field }});

    newFormFields[id].open = !newFormFields[id].open;
    this.setState({ formFields: newFormFields });
  };

  fillFieldsWithSelectedCar = () => {
    let newFormFields = this.state.formFields.map( field => {
      return { ...field }});

    newFormFields[0].value = this.props.selectedCar.title;
    newFormFields[1].value = this.props.selectedCar.model;
    newFormFields[2].value = this.props.selectedCar.year;
    newFormFields[3].value = this.props.selectedCar.brand;
    newFormFields[4].value = this.props.selectedCar.color;
    newFormFields[5].value = this.props.selectedCar.price;
    newFormFields[6].value = this.props.selectedCar.km;
    this.setState({ formFields: newFormFields });
  };

  getBrandsData = () => {
    axios.get('https://private-anon-a6a485acf5-tradersclubapi.apiary-proxy.com/api/brands')
      .then( response => {
        let newFormFields = this.state.formFields.map( field => {
          return { ...field }});
    
        newFormFields[3].options = response.data.brands;
        this.setState({ formFields: newFormFields });
      })
      .catch( () => {
        console.log('error');
      });
  };

  createCar = () => {
    axios.post('http://private-anon-78be39c465-tradersclubapi.apiary-proxy.com/api/cars', { 
      car: {
        'title': this.state.formFields[0].value,
        'model': this.state.formFields[1].value,
        'brand': this.state.formFields[3].value,
        'year': this.state.formFields[2].value,
        'color': this.state.formFields[4].value,
        'km': this.state.formFields[6].value,
        'price': this.state.formFields[5].value
      }
     })
      .then( () => {
        this.setState({ loading: false, reqMessage: "Carro cadastrado com sucesso!" });
      })
      .catch( () => {
        this.setState({ loading: false, reqMessage: "Erro ao tentar cadastrar carro." });
      });
  };

  updateCar = (carID) => {
    axios.put(`http://private-anon-78be39c465-tradersclubapi.apiary-proxy.com/api/cars/${carID}`, { 
      car: {
        'id': carID,
        'title': this.state.formFields[0].value,
        'model': this.state.formFields[1].value,
        'brand': this.state.formFields[3].value,
        'year': this.state.formFields[2].value,
        'color': this.state.formFields[4].value,
        'km': this.state.formFields[6].value,
        'price': this.state.formFields[5].value
      }
    })
      .then( () => {
        this.setState({ loading: false, reqMessage: "Carro atualizado com sucesso!" });
      })
      .catch( () => {
        this.setState({ loading: false, reqMessage: "Erro ao tentar atualizar carro." });
      });
  };

  deleteCar = (carID) => {
    axios.delete(`http://private-anon-78be39c465-tradersclubapi.apiary-proxy.com/api/cars/${carID}`)
      .then( () => {
        this.setState({ loading: false, reqMessage: "Carro deletado com sucesso!" });
      })
      .catch( () => {
        this.setState({ loading: false, reqMessage: "Erro ao tentar deletar carro." });
      });
  };

  onSaveButtonClicked = () => {
    this.setState({ loading: true });

    if (this.props.selectedCar) {
      this.updateCar(this.props.selectedCar.id);
    } else {
      this.createCar();
    }
  };

  onDeleteButtonClicked = () => {
    this.setState({ loading: true });

    if (this.props.selectedCar) {
      this.deleteCar(this.props.selectedCar.id);
    }
  };

  onInputChanged = (event, id) => {
    let newFormFields = this.state.formFields.map( field => {
      return { ...field }});

    newFormFields[id].value = event.target.value;
    this.setState({ formFields: newFormFields });
  };

  onOptionSelected = (option) => {
    let newFormFields = this.state.formFields.map( field => {
      return { ...field }});

    newFormFields[3].value = option;
    newFormFields[3].open = false;
    this.setState({ formFields: newFormFields });
  };

  onOkButtonClicked = () => {
    this.setState({ reqMessage: null });
    this.props.okButtonClicked();
  };

  render() {
    let overlay = null;

    const formfields = this.state.formFields.map( field => {
      if (field.type === "select") {
        return <FormFieldSelect 
          key={field.id}
          id={field.id}
          className={field.name}
          placeholder={field.placeholder}
          options={field.options} 
          value={field.value}
          open={field.open} 
          toggledFieldSelect={this.toggleFieldSelect} 
          selected={this.onOptionSelected} />;
      } else {
        return (
          <input 
            key={field.id}
            id={field.id}
            type={field.type}
            className={field.name}
            placeholder={field.placeholder}
            value={field.value} 
            onChange={(event) => this.onInputChanged(event, field.id)} />
        )
      }  
    });

    if (this.state.loading) {
      overlay = <div className="OverlayContainer"><Spinner /></div>;
    } else if(this.state.reqMessage) {
      overlay = (
        <div className="OverlayContainer">
          <div className="Message">{this.state.reqMessage}</div>
          <div className="OkButton" onClick={this.onOkButtonClicked}>OK</div>
        </div>
      );
    } else {
      overlay = null;
    }

    return (
      <div className="Register">
        <div className="Header">
          Problemas ao salvar o formulário
        </div>
        <div className="Form">
          {formfields}
        </div>
        <div className="Buttons">
          <div className="LeftButtons">
            <div className="DeleteButton" onClick={this.onDeleteButtonClicked}>Remover</div>
            <div className="CancelButton" onClick={this.props.cancelButtonClicked}>Cancelar</div>
          </div>
          <div className="SaveButton" onClick={this.onSaveButtonClicked}>Salvar</div>
        </div>
        {overlay}
      </div>
    );
  }
}

export default Register;
