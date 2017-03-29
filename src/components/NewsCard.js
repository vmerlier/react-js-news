import React, { Component } from 'react'

import './NewsCard.css'

class NewsCard extends Component {

    render() {

        const { title, text, picture, url } = this.props

        return (


            <div className="col s12 m6">
                <div className="card">
                    <div className="card-pannel hoverable">

                        <div className="card-image">
                            <img src={ picture } />
                            <span className="card-title"> { title }</span>
                            <a href={ url } target="_blank" className="btn-floating halfway-fab waves-effect waves-light #222 "><i className="material-icons">add</i></a>
                        </div>
                        <div className="card-content">
                            <p> { text }</p> </div>
                    </div>
                </div>
            </div>

        )
    }

}

export default NewsCard