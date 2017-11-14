import React from 'react'
import axios from 'axios'
import _ from 'lodash'


class SearchBar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      term: '',
      res: [],
      display : false,
      isFahrenheit : true,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  onInputChange(term) {
    this.setState({term : term})
  }

  handleSubmit(event) {
    event.preventDefault()

    const ApiKey = '0520c5fe69eb9f2e812603b29ed84820'
    const URL = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.term}&appid=${ApiKey}`



    axios.get(URL)
      .then((response) => {
        console.log(response)
        this.setState({res : response.data})
        this.setState({display : true})
      })

      .catch((error) => {
        console.log(error);
      });

  }

  handleFahrenheit = () => {
    this.setState({isFahrenheit : true})
  }

  handleCelsius = () => {
    this.setState({isFahrenheit : false})
  }

  render() {
    let celsius = null
    let fahrenheit = null
    let myButton = null

    if (this.state.display && !this.state.isFahrenheit) {
      celsius = <p>{Math.floor(_.get(this.state.res, 'main.temp') - 273.15)+'\u00B0C'}</p>
      myButton = <button onClick={this.handleFahrenheit}>Change to Fahrenheit</button>
    }
    else if (this.state.display && this.state.isFahrenheit){
      fahrenheit = <p>{celsius *9/5 + 32 +'\u00B0F'}</p>
      myButton = <button onClick={this.handleCelsius}>Change to Celsius</button>
    }
    return(
      <div>
        <form onSubmit={this.handleSubmit}>Type in city name<br/>
          <input type='text' value={this.state.term} onInput={(e)=>this.onInputChange(e.target.value)}/>
          <input type='submit'/>
          <p>{_.get(this.state.res, 'name')}</p>
          {celsius}
          {fahrenheit}
          {myButton}
        </form>

      </div>

    )
  }
}

export default SearchBar