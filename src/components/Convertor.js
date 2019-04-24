import React, { Component } from 'react'
import SelectOption from './SelectOption';

class Convertor extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleFiatChange = this.handleFiatChange.bind(this)
    this.ChangePrice = this.ChangePrice.bind(this)
    this.ChangeVolume = this.ChangeVolume.bind(this)

    this.state = {
      coinValue: 'bitcoin',
      fiatValue: 'usd',
      data: []
    }
  }
  updateInput(data) {
    const displayPrice = document.getElementById('coinPrice')
    this.setState({ data: data })
    if (this.state.fiatValue === 'usd') {
      const price = data.market_data.current_price.usd.toLocaleString()
      displayPrice.value = price
    } else if (this.state.fiatValue === 'eur') {
      const price = data.market_data.current_price.eur.toLocaleString()
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
  ChangePrice() {
    const displayPrice = document.getElementById('coinPrice')
    const coinVolume = document.getElementById('coinVolume')

    if (this.state.fiatValue === 'usd') {

      if (coinVolume.value === '') {
        displayPrice.value = this.state.data.market_data.current_price.usd.toLocaleString()
      } else {

        const price = parseInt(this.state.data.market_data.current_price.usd) * coinVolume.value
        // .toLocaleString("en-US", { style: 'currency', currency: 'USD' })
        displayPrice.value = price.toLocaleString()
      }
    } else if (this.state.fiatValue === 'eur') {

      if (coinVolume.value === '') {

        displayPrice.value = this.state.data.market_data.current_price.eur.toLocaleString()
      } else {

        const price = parseInt(this.state.data.market_data.current_price.eur) * coinVolume.value
        // .toLocaleString("en-US", { style: 'currency', currency: 'EUR' })
        displayPrice.value = price.toLocaleString()
      }
    }
  }

  ChangeVolume() {
    const displayPrice = document.getElementById('coinPrice')
    const coinVolume = document.getElementById('coinVolume')

    if (this.state.fiatValue === 'usd') {
      const num = displayPrice.value.replace(/\D/g, '')
      const volume = parseInt(num) / this.state.data.market_data.current_price.usd

      coinVolume.value = volume.toPrecision(6)
    } else if (this.state.fiatValue === 'eur') {
      const num = displayPrice.value.replace(/\D/g, '')
      const volume = parseInt(num) / this.state.data.market_data.current_price.eur

      coinVolume.value = volume.toPrecision(6)
    }
  }
  render() {
    return (
      <div>
        <SelectOption
          coinValue={this.state.coinValue}
          fiatValue={this.state.fiatValue}
          handleChange={this.handleChange}
          handleFiatChange={this.handleFiatChange}
          ChangePrice={this.ChangePrice}
          ChangeVolume={this.ChangeVolume}>
        </SelectOption>
      </div>
    )
  }
}

export default Convertor
