import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 9,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor() {
        super();

        this.state = {
            articles: [],
            loading: false,
            page: 1
        };
    }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cc396ef416804526a864b5199fa8cfeb&page=1&pageSize=${this.props.pageSize}`;

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
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cc396ef416804526a864b5199fa8cfeb&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;

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
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cc396ef416804526a864b5199fa8cfeb&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;

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
                <h2 className='text-center' style={{margin: '30px 0px'}}>NewsGhar - Top Headlines</h2>
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
                                        newsUrl={element.url} 
                                        author={element.author}
                                        date={element.publishedAt}
                                        source={element.source.name} />
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