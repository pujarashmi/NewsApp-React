// import { getByTitle } from '@testing-library/dom'
import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let {title, description, imageurl, newsUrl, author, date, source} = this.props;
        return (
            <div className="my-3">
                <div className="card" style={{width:"18rem"}}>
                    <img src={!imageurl?"https://images.hindustantimes.com/img/2021/10/15/1600x900/a72d937a-2d7f-11ec-be0b-d2c840e92b17_1634287916863.png":imageurl} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>

                        {/* <h5 className="card-title">{title} <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '90%' , zIndex: '1'}}> {source} </span></h5> */}

                        <h5 className="card-title">{title} <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"> {source} </span></h5>

                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {!author?"Unknown": author} on {new Date (date).toGMTString()}</small></p>

                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-info">Read More</a>
                    </div>
                </div> 
            </div>
        )
    }
}

export default NewsItem
