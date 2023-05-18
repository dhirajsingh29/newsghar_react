import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

// component with infinite loading
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
            page: 1,
            totalResults: 0
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

    fetchMoreData = async () => {
        this.setState({
            page: this.state.page + 1
        });

        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cc396ef416804526a864b5199fa8cfeb&page=${this.state.page}&pageSize=${this.props.pageSize}`;

        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        })
    };

    render() {
        return (
            <>
                <h2 className='text-center' style={{ margin: '30px 0px' }}>
                    NewsGhar - Top {this.capitalize(this.props.category)} Headlines
                </h2>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {
                                !this.state.loading &&
                                this.state.articles.map((element, index) => {
                                    return (
                                        <div className="col-md-4" key={index}>
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
                    </div>
                </InfiniteScroll>
            </>
        );
    }
}

export default News