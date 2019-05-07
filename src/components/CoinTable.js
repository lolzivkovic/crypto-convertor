import React, { Component } from 'react'


class CoinTable extends Component {

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
            return <td className='positiveValue col-auto text-center'>{percent.toFixed(2)} &#37;</td>
        } else {
            return <td className='negativeValue col-auto text-center'>{percent.toFixed(2)} &#37;</td>
        }
    }
    render() {
        return (
            <tr className='tRows' onClick={() => this.props.showModal(this.props.coin.id)}>
                <td className='col-auto'>{this.props.coin.market_cap_rank}</td>
                <td className='col-auto'><img src={this.props.coin.image} alt={this.props.coin.name} height="32" width="32"></img> {this.props.coin.name}</td>
                <td className='col-auto'>{this.formatMarketcap(this.props.coin.market_cap)}</td>
                <td className='col-auto'>{this.formatPrice(this.props.coin.current_price)}</td>
                <td className='col-auto'>{this.formatCirc(this.props.coin.circulating_supply, this.props.coin.symbol)}</td>
                {this.percChange(this.props.coin.price_change_percentage_24h)}
            </tr>
        )
    }
}

export default CoinTable
