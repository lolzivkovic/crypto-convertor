import React, { Component } from 'react'

class CoinModal extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    formatPerc(percent) {
        if (!isNaN(percent)) {
            if (Math.sign(percent) === 1 || Math.sign(percent) === 0) {
                return <td className='positiveValue'>{percent.toFixed(2)} &#37;</td>
            } else {
                return <td className='negativeValue'>{percent.toFixed(2)} &#37;</td>
            }
        } else {
            return <td>N/A</td>
        }
    }

    render() {

        const data = this.props.data
        const showHideClass = this.props.show ? 'modal display-block' : 'modal display-none';

        if (data.description !== undefined) {
            const perc1h = data.market_data.price_change_percentage_1h_in_currency.usd
            const perc24h = data.market_data.price_change_percentage_24h_in_currency.usd
            const perc7d = data.market_data.price_change_percentage_7d_in_currency.usd
            const perc1m = data.market_data.price_change_percentage_30d_in_currency.usd
            const perc1y = data.market_data.price_change_percentage_1y_in_currency.usd

            return (
                <div className={showHideClass}>
                    <section className="modal-main container">
                        <div className='row'>
                            <div className='col-3'>
                                <img className='logoCoin' src={data.image.large} alt={data.name} width='64' height='64'></img>
                                <div>
                                    <h2>{data.name}</h2>
                                    <span className='modalCoinSymbol'><h5>{data.symbol.toUpperCase()}</h5></span>
                                </div>
                            </div>
                            <div className='col-9'>
                                <table className='table'>
                                    <thead>
                                        <tr><td>1h</td><td>24h</td><td>Week</td><td>Month</td><td>Year</td></tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            {this.formatPerc(perc1h)}
                                            {this.formatPerc(perc24h)}
                                            {this.formatPerc(perc7d)}
                                            {this.formatPerc(perc1m)}
                                            {this.formatPerc(perc1y)}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='row'>

                        </div>
                        <button onClick={this.props.hideModal}>close</button>
                    </section>
                </div>
            )
        } else {
            return null
        }
    }
}

export default CoinModal
