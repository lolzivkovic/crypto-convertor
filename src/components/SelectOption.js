import React from 'react'

function SelectOption({ coinValue, fiatValue, handleChange, handleFiatChange, ChangePrice, ChangeVolume }) {

    return (
        <div className='my-3 d-flex flex-wrap justify-content-center'>
            <div className='d-flex align-items-center'>
                <select className='form-control' value={coinValue} onChange={handleChange}>
                    <option value='bitcoin'>BTC</option>
                    <option value='ethereum'>ETH</option>
                    <option value='ripple'>XRP</option>
                    <option value='eos'>EOS</option>
                    <option value='bitcoin-cash'>BCH</option>
                    <option value='litecoin'>LTC</option>
                    <option value='binancecoin'>BNB</option>
                    <option value='cardano'>ADA</option>
                    <option value='stellar'>XLM</option>
                    <option value='tether'>USDT</option>
                </select>

                <input className='form-control' id='coinVolume' type='text' onKeyUp={ChangePrice}></input>
                <span><img src='images/retweet-solid.svg' alt='Exchange Icon' width='20' height='20'></img></span>
                <input className='form-control' id='coinPrice' type='text' onKeyUp={ChangeVolume}></input>

                <select className='form-control' value={fiatValue} onChange={handleFiatChange}>
                    <option value='usd'>USD</option>
                    <option value='eur'>EUR</option>
                    {/* <option value='rsd'>RSD</option> */}
                </select>
            </div>
        </div>
    )
}

export default SelectOption
