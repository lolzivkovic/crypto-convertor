import React, { Component } from 'react'

class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rows: []
        }
    }

    createTable(coins) {
        this.setState({
            rows: coins.map(coin => {
                return <tr key={coin.symbol}><td>{coin.symbol}</td><td>{coin.current_price}</td></tr>;
            })
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
                    <tbody>
                        {this.state.rows}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Main
