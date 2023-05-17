import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

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
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=cc396ef416804526a864b5199fa8cfeb&page=1&pageSize=${this.props.pageSize}`;

        this.setState({
            loading: true
        });

        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
    }

    handlePreviousClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=cc396ef416804526a864b5199fa8cfeb&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;

        this.setState({
            loading: true
        });

        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
            articles: parsedData.articles,
            page: this.state.page - 1,
            loading: false
        });
    }

    handleNextClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=cc396ef416804526a864b5199fa8cfeb&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;

        this.setState({
            loading: true
        });

        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
            articles: parsedData.articles,
            page: this.state.page + 1,
            loading: false
        });
    }

    render() {
        return (
            <div className='container my-3'>
                <h2 className='text-center'>NewsGhar - Top Headlines</h2>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {
                        !this.state.loading &&
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
                <div className="container d-flex justify-content-between">
                    <button
                        type="button"
                        className="btn btn-light"
                        onClick={this.handlePreviousClick}
                        disabled={this.state.page <= 1}>
                        &larr; Previous
                    </button>
                    <button
                        type="button"
                        className="btn btn-light"
                        onClick={this.handleNextClick}
                        disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}>
                        Next &rarr;
                    </button>
                </div>
            </div>
        );
    }
}

export default News