import React, { Component } from 'react'

class Convertor extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      value: 'bitcoin'
    }
  }
  updateInput(data) {
    const displayPrice = document.getElementById('displayPrice')
    const price = data.market_data.current_price.usd.toLocaleString()
    displayPrice.value = price
  }
  handleChange(event) {
    this.setState({ value: event.target.value }, () => this.getApiData());
  }
  getApiData() {
    const url = `https://api.coingecko.com/api/v3/coins/${this.state.value}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    fetch(url).then(response => response.json()).then(data => this.updateInput(data))
  }
  componentDidMount() {
    this.getApiData()
  }
  render() {
    return (
      <div>
        <select value={this.state.value} onChange={this.handleChange}>
          <option value='bitcoin'>BTC</option>
          <option value='ethereum'>ETH</option>
        </select>
        <input id='displayPrice' type='text'></input>
      </div>
    )
  }
}

export default Convertor
