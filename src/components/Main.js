import React, { Component } from 'react'

class Main extends Component {
    constructor(props) {
        super(props)
        this.getDataFromApi = this.getDataFromApi.bind(this)
        this.state = {
            rows: []
        }
    }
    formatPrice(number) {
        return number.toLocaleString("en-US", { style: 'currency', currency: 'USD', maximumSignificantDigits: 6 })

    }
    formatMarketcap(number) {
        return number.toLocaleString("en-US", { style: 'currency', currency: 'USD' })
    }
    createTable(coins) {
        this.setState({
            rows: coins.map(coin => {
                return <tr key={coin.symbol}><td>{coin.market_cap_rank}</td><td><img src={coin.image} alt={coin.name} height="32" width="32"></img> {coin.name}</td><td>{this.formatMarketcap(coin.market_cap)}</td><td>{this.formatPrice(coin.current_price)}</td></tr>;
            }, setTimeout(this.getDataFromApi, 45000))
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
                <table>
                    <thead><tr><th>#</th><th>Coin</th><th>Market Cap</th><th>Price</th></tr></thead>
                    <tbody>{this.state.rows}</tbody>
                </table>
            </div>
        )
    }
}

export default Main
