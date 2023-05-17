import React, { Component } from 'react'
import defaultImg from '../default.png'

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;

        return (
            <div className='my-3'>
                <div className="card">
                    <span
                        className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
                        style={{left: '90%', zIndex: '1'}}>
                        {source}
                    </span>
                    <img src={imageUrl ? imageUrl : defaultImg} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small class="text-muted">By {author ? author : 'Unknown'} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target='_blank' className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewsItem