import React, { Component } from 'react'
import loading from './loading.gif';

export class Spinner extends Component {
    render() {
        return (
            <div>
                <img scr={loading} alt="loading"/>
            </div>
        )
    }
}

export default Spinner
