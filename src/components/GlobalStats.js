import React, { Component } from 'react'

export class GlobalStats extends Component {
    constructor(props) {
        super(props)

        this.state = {
            globalStats: {
                data: {
                    total_market_cap:{},
                    total_volume:{},
                    market_cap_percentage:{}
                }
            }
        }
    }
    updateStats(global) {
        this.setState({globalStats: global})
    }
    getGlobalData() {
        const url = 'https://api.coingecko.com/api/v3/global'
        fetch(url)
            .then(response => response.json()).then(data => this.updateStats(data))
    }
    componentDidMount() {
        this.getGlobalData()
    }
    formatCap(volume){
        const value = parseInt(volume)
        return value.toLocaleString("en-US", { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })
    }
    formatPerc(perc){
        const value = parseInt(perc)
        return `${value.toFixed(1)} %`
    }
    render() {
        const activeCrypto = this.state.globalStats.data.active_cryptocurrencies
        const totalMarketCap = this.state.globalStats.data.total_market_cap.usd
        const totalVolume = this.state.globalStats.data.total_volume.usd
        const btcDominance = this.state.globalStats.data.market_cap_percentage.btc

        return (
            <div className='row globalCrypto'>
                <span className='globalStats col-12 col-sm-6 col-md-3'>Cryptocurrencies: <strong>{activeCrypto}</strong></span>
                <span className='globalStats col-12 col-sm-6 col-md-3'>Market Cap: <strong>{this.formatCap(totalMarketCap)}</strong></span>
                <span className='globalStats col-12 col-sm-6 col-md-3'>Total Volume: <strong>{this.formatCap(totalVolume)}</strong></span>
                <span className='globalStats col-12 col-sm-6 col-md-3'>Bitcoin Dominance: <strong>{this.formatPerc(btcDominance)}</strong></span>
            </div>
        )
    }
}

export default GlobalStats
