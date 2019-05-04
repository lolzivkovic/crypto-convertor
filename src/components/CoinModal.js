import React, { Component } from 'react'

class CoinModal extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }



    render() {
        const result = this.props.data.filter(coin => coin.id === this.props.currentCoin)
        const showHideClass = this.props.show ? 'modal display-block' : 'modal display-none';


        console.log(result)
        return (
            <div className={showHideClass}>
                <section className="modal-main">
                    <p>{result.id}</p>
                    <button onClick={this.props.hideModal}>close</button>
                </section>
            </div>
        )
    }
}

export default CoinModal
