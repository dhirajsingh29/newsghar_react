import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

    constructor() {
        super();

        this.state = {
            articles: [],
            loading: false,
            page: 1
        };
    }

    async componentDidMount() {
        let url = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=cc396ef416804526a864b5199fa8cfeb';

        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
            articles: parsedData.articles
        })
    }

    render() {
        return (
            <div className='container my-3'>
                <h2>NewsGhar - Top Headlines</h2>
                <div className="row">
                    {
                        this.state.articles.map((element) => {
                            return (
                                <div className="col-md-4" key={element.url}>
                                    <NewsItem
                                        title={element.title}
                                        description={element.description}
                                        imageUrl={element.urlToImage}
                                        newsUrl={element.url} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

export default News