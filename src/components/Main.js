import React, { Component } from 'react'
import '../index.css'
import CoinModal from './CoinModal';
import CoinTable from './CoinTable';

class Main extends Component {
    constructor(props) {
        super(props)
        this.getDataFromApi = this.getDataFromApi.bind(this)
        this.showModal = this.showModal.bind(this)
        this.hideModal = this.hideModal.bind(this)

        this.state = {
            data: {},
            currentCoin: 'bitcoin',
            rows: [],
            show: false
        }
    }

    showModal(symbol) {
        const url = `https://api.coingecko.com/api/v3/coins/${symbol}?localization=false&sparkline=true`

        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({ data: data, show: true }))
    }
    hideModal() {
        this.setState({ show: false })
    }
    createTable(coins) {
        this.setState({
            rows: coins.map(coin => {return <CoinTable coin={coin} showModal={this.showModal}/>}, setTimeout(this.getDataFromApi, 40000))
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
                <table className='table text-justify'>
                    <thead><tr><th>#</th><th>Coin</th><th>Market Cap</th><th>Price</th><th>Circulating Supply</th><th>Change (24h)</th></tr></thead>
                    <tbody>{this.state.rows}</tbody>
                </table>
                <CoinModal show={this.state.show} hideModal={this.hideModal} currentCoin={this.state.currentCoin} data={this.state.data} />
            </div>
        )
    }
}

export default Main
