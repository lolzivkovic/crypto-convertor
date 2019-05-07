import React, { Component } from 'react'
import ReactHtmlParser from 'react-html-parser'

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
    formatWebsite(website) {
        const re = /^(?:https?:\/\/)?(?:www\.)?/i;
        const websites = website.filter(e => e !== '').map((e, i) => {
            return <p key={i}><a href={e} target='_blank' rel="noopener noreferrer">{e.replace(re, '').split('/')[0]}</a></p>
        })
        return websites
    }
    formatDate(date) {
        const d = new Date(date)
        return d.toDateString()
    }
    formatStats(stats) {
        return stats.toLocaleString("en-US", { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })
    }
    formatCirc(supply, symbol) {
        return `${supply.toLocaleString()} ${symbol.toUpperCase()}`
    }
    render() {

        const data = this.props.data
        const showHideClass = this.props.show ? 'modal d-flex align-items-center justify-content-center' : 'modal d-none';
        document.addEventListener('mousedown', this.handleOutsideClick)

        if (data.description !== undefined) {
            const perc1h = data.market_data.price_change_percentage_1h_in_currency.usd
            const perc24h = data.market_data.price_change_percentage_24h
            const perc7d = data.market_data.price_change_percentage_7d
            const perc1m = data.market_data.price_change_percentage_30d
            const perc1y = data.market_data.price_change_percentage_1y
            const currentPrice = data.market_data.current_price.usd

            return (
                <div className={showHideClass}>
                    <section className='modal-main container'>
                        <button className='closeButton close' onClick={this.props.hideModal}><span aria-hidden="true">&times;</span></button>
                        <div className='row modalInfo'>
                            <div className="col-12 d-flex">
                                <img className='logoCoin' src={data.image.large} alt={data.name} width='64' height='64'></img>
                                <div>
                                    <h2>{data.name}</h2>
                                    <span className='modalCoinSymbol'><h5>{data.symbol.toUpperCase()}</h5></span>
                                </div>

                            </div>
                        </div>

                        <div className='row priceChange'>
                            <div className='col-12 col-md-2 modalCurrentPrice'>
                                <h5>Current Price</h5>
                                <p>{currentPrice} ({this.formatPerc(perc24h)})</p>
                            </div>
                            <div className="col-12 col-md-10 sparkline d-inline-flex justify-content-around">
                                <div className='percs'>
                                    <h5>1h</h5>
                                    <p>{this.formatPerc(perc1h)}</p>
                                </div>
                                <div className='percs'>
                                    <h5>24h</h5>
                                    <p>{this.formatPerc(perc24h)}</p>
                                </div>
                                <div className='percs'>
                                    <h5>Week</h5>
                                    <p>{this.formatPerc(perc7d)}</p>
                                </div>
                                <div className='percs'>
                                    <h5>Month</h5>
                                    <p>{this.formatPerc(perc1m)}</p>
                                </div>
                                <div className='percs'>
                                    <h5>Year</h5>
                                    <p>{this.formatPerc(perc1y)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="row modalCoinStats">
                            <div className='col-12 col-sm-6 col-md-3'>
                                <h5>Market Cap</h5>
                                <p>{this.formatStats(data.market_data.market_cap.usd)}</p>
                            </div>
                            <div className='col-12 col-sm-6 col-md-3'>
                                <h5>All Time High</h5>
                                <p>{this.formatStats(data.market_data.ath.usd)} ({this.formatPerc(data.market_data.ath_change_percentage.usd)})</p>
                                <p>{this.formatDate(data.market_data.ath_date.usd)}</p>
                            </div>
                            <div className='col-12 col-sm-6 col-md-3'>
                                <h5>Total Volume </h5>
                                <p>{this.formatStats(data.market_data.total_volume.usd)}</p>
                            </div>
                            <div className='col-12 col-sm-6 col-md-3'>
                                <h5>Circulating Supply</h5>
                                <p>{this.formatCirc(data.market_data.circulating_supply, data.symbol)}</p>
                            </div>
                        </div>

                        <div className="row modalDetails">
                            <div className="col-12 col-md-3">
                                <div className="row modalWebsite">
                                    <div className='col-5 col-md-12'>
                                        <h4>Website</h4>
                                        {this.formatWebsite(data.links.homepage)}
                                    </div>
                                    <div className='col-6 col-md-12'>
                                        <h4>Explorer</h4>
                                        {this.formatWebsite(data.links.blockchain_site)}
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-9 modalDesc">
                                <p>{ReactHtmlParser(data.description.en)}</p>
                            </div>
                        </div>
                    </section>
                </div >
            )
        } else {
            return null
        }
    }
}

export default CoinModal
