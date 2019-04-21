import React from 'react'

function SelectOption({ coinValue, fiatValue, handleChange, handleFiatChange }) {
    return (
        <div className='my-3 d-flex justify-content-sm-center'>
            <form className='form-inline'>

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

                <input className='form-control' id='coinPrice' type='text'></input>
                <input className='form-control' id='coinVolume' type='text'></input>

                <select value={fiatValue} onChange={handleFiatChange} className='form-control'>
                    <option value='usd'>USD</option>
                    <option value='eur'>EUR</option>
                    {/* <option value='rsd'>RSD</option> */}
                </select>

            </form>
        </div>
    )
}

export default SelectOption
