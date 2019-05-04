import React, { Component } from 'react'
import '../index.css'
import CoinModal from './CoinModal';

class Main extends Component {
    constructor(props) {
        super(props)
        this.getDataFromApi = this.getDataFromApi.bind(this)
        // this.showModal = this.showModal.bind(this)
        this.hideModal = this.hideModal.bind(this)

        this.state = {
            data: [],
            currentCoin: 'bitcoin',
            rows: [],
            show: false
        }
    }

    showModal(symbol) {
        this.setState({ show: true, currentCoin: symbol })
    }
    hideModal() {
        this.setState({ show: false })
    }
    formatPrice(number) {
        return number.toLocaleString("en-US", { style: 'currency', currency: 'USD', maximumSignificantDigits: 6 })

    }
    formatMarketcap(number) {
        return number.toLocaleString("en-US", { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })
    }
    formatCirc(supply, symbol) {
        const number = parseInt(supply)
        const str = `${number.toLocaleString()} ${symbol.toUpperCase()}`
        return str
    }
    percChange(percent) {
        if (Math.sign(percent) === 1 || Math.sign(percent) === 0) {
            return <td className='positiveValue'>{percent.toFixed(2)} &#37;</td>
        } else {
            return <td className='negativeValue'>{percent.toFixed(2)} &#37;</td>
        }
    }
    createTable(coins) {
        this.setState({
            data: coins,
            rows: coins.map(coin => {
                return <tr key={coin.symbol} className='tRows coinClick' onClick={() => this.showModal(coin.id)}><td>{coin.market_cap_rank}</td><td className='text-left'><img src={coin.image} alt={coin.name} height="32" width="32"></img> {coin.name}</td><td>{this.formatMarketcap(coin.market_cap)}</td><td>{this.formatPrice(coin.current_price)}</td><td>{this.formatCirc(coin.circulating_supply, coin.symbol)}</td>{this.percChange(coin.price_change_percentage_24h)}</tr>
            }, setTimeout(this.getDataFromApi, 40000))
        })
    }

    getDataFromApi() {
        const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
        fetch(url)
            .then(response => response.json())
            .then(data => this.createTable(data))
    }

    componentDidMount() {
        this.getDataFromApi()
    }

    render() {
        return (
            <div>
                <table className='table text-center'>
                    <thead><tr><th>#</th><th>Coin</th><th>Market Cap</th><th>Price</th><th>Circulating Supply</th><th>Change (24h)</th></tr></thead>
                    <tbody>{this.state.rows}</tbody>
                </table>
                <CoinModal show={this.state.show} hideModal={this.hideModal} currentCoin={this.state.currentCoin} data={this.state.data} />
            </div>
        )
    }
}

export default Main
