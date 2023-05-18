import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
    capitalize = (word) => {
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

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

    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            loading: false,
            page: 1
        };

        document.title = `${this.capitalize(this.props.category)} - NewsGhar`;
    }

    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cc396ef416804526a864b5199fa8cfeb&page=${this.state.page}&pageSize=${this.props.pageSize}`;

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

    async componentDidMount() {
        this.updateNews();
    }

    handlePreviousClick = async () => {
        // callback is required in order for state to set correct page number
        this.setState({
            page: this.state.page - 1
        }, () => this.updateNews());
    }

    handleNextClick = async () => {
        // callback is required in order for state to set correct page number
        // else same page will be oaded on first time Next click
        this.setState({
            page: this.state.page + 1
        }, () => this.updateNews());
    }

    render() {
        return (
            <div className='container my-3'>
                <h2 className='text-center' style={{ margin: '30px 0px' }}>
                    NewsGhar - Top {this.capitalize(this.props.category)} Headlines
                </h2>
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