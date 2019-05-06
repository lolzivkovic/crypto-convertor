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
                return <span className='positiveValue'>{percent.toFixed(2)} &#37;</span>
            } else {
                return <span className='negativeValue'>{percent.toFixed(2)} &#37;</span>
            }
        } else {
            return <span>N/A</span>
        }
    }

    render() {

        const data = this.props.data
        const showHideClass = this.props.show ? 'modal d-flex align-items-center' : 'modal d-none';

        if (data.description !== undefined) {
            const perc1h = data.market_data.price_change_percentage_1h_in_currency.usd
            const perc24h = data.market_data.price_change_percentage_24h_in_currency.usd
            const perc7d = data.market_data.price_change_percentage_7d_in_currency.usd
            const perc1m = data.market_data.price_change_percentage_30d_in_currency.usd
            const perc1y = data.market_data.price_change_percentage_1y_in_currency.usd
            const currentPrice = data.market_data.current_price.usd

            return (
                <div className={showHideClass}>
                    <section className='modal-main container'>
                        <div className='m-3'>
                            <div className='row'>
                                <img className='logoCoin' src={data.image.large} alt={data.name} width='64' height='64'></img>
                                <div>
                                    <h2>{data.name}</h2>
                                    <span className='modalCoinSymbol'><h5>{data.symbol.toUpperCase()}</h5></span>
                                </div>
                            </div>

                            <div className='row priceChange'>
                                <div className='modalCurrentPrice col-12 col-md-2 d-flex flex-column justify-content- center pr-0'>
                                    <p>Current Price</p>
                                    <strong>{currentPrice}({this.formatPerc(perc24h)})</strong>
                                </div>
                                <div className="col-md-10 d-flex justify-content-around">
                                    <div className='sparkline'>
                                        <p>1h</p>
                                        <strong>{this.formatPerc(perc1h)}</strong>
                                    </div>
                                    <div className='sparkline'>
                                        <p>24h</p>
                                        <strong>{this.formatPerc(perc24h)}</strong>
                                    </div>
                                    <div className='sparkline'>
                                        <p>Week</p>
                                        <strong>{this.formatPerc(perc7d)}</strong>
                                    </div>
                                    <div className='sparkline'>
                                        <p>Month</p>
                                        <strong>{this.formatPerc(perc1m)}</strong>
                                    </div>
                                    <div className='sparkline'>
                                        <p>Year</p>
                                        <strong>{this.formatPerc(perc1y)}</strong>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4"></div>
                                <div className="col-8"></div>
                            </div>
                        </div>
                        <button onClick={this.props.hideModal}>close</button>
                    </section>
                </div >
            )
        } else {
            return null
        }
    }
}

export default CoinModal
