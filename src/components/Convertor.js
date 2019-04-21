import React, { Component } from 'react'
import SelectOption from './SelectOption';

class Convertor extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleFiatChange = this.handleFiatChange.bind(this)

    this.state = {
      coinValue: 'bitcoin',
      fiatValue: 'usd'
    }
  }
  updateInput(data) {
    const displayPrice = document.getElementById('coinPrice')
    if (this.state.fiatValue === 'usd') {
      const price = data.market_data.current_price.usd.toLocaleString("en-US", { style: 'currency', currency: 'USD' })
      displayPrice.value = price
    } else if(this.state.fiatValue === 'eur'){
      const price = data.market_data.current_price.eur.toLocaleString("en-US", { style: 'currency', currency: 'EUR' })
      displayPrice.value = price
    }
  }

  handleFiatChange(event) {
    this.setState({ fiatValue: event.target.value }, () => this.getApiData())
  }
  handleChange(event) {
    this.setState({ coinValue: event.target.value }, () => this.getApiData())
  }
  getApiData() {
    const url = `https://api.coingecko.com/api/v3/coins/${this.state.coinValue}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    fetch(url).then(response => response.json()).then(data => this.updateInput(data))
  }
  componentDidMount() {
    this.getApiData()
  }
  render() {
    return (
      <div>
        <SelectOption coinValue={this.state.coinValue} fiatValue={this.state.fiatValue} handleChange={this.handleChange} handleFiatChange={this.handleFiatChange}></SelectOption>
      </div>
    )
  }
}

export default Convertor
