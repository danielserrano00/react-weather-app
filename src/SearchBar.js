import React from 'react'
import axios from 'axios'


class SearchBar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      term: '',
      res: []
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
        console.log(response.data.main.temp)

      })
      .catch((error) => {
        console.log(error);
      });

  }

  render() {
    return(
      <div>
        <form onSubmit={this.handleSubmit}>Type in city name<br/>
          <input type='text' value={this.state.term} onInput={(e)=>this.onInputChange(e.target.value)}/>
          <input type='submit'/>
        </form>




      </div>

    )
  }
}

export default SearchBar