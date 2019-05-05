import React, { Component } from 'react'


class CoinTable extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
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
    render() {
        return (
            <tr key={this.props.coin.symbol} className='tRows coinClick' onClick={() => this.props.showModal(this.props.coin.id)}>
                <td>{this.props.coin.market_cap_rank}</td>
                <td><img src={this.props.coin.image} alt={this.props.coin.name} height="32" width="32"></img> {this.props.coin.name}</td>
                <td>{this.formatMarketcap(this.props.coin.market_cap)}</td>
                <td>{this.formatPrice(this.props.coin.current_price)}</td>
                <td>{this.formatCirc(this.props.coin.circulating_supply, this.props.coin.symbol)}</td>
                {this.percChange(this.props.coin.price_change_percentage_24h)}
            </tr>
        )
    }
}

export default CoinTable
