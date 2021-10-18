import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
   static defaultProps = {
       country: 'in',
       pageSize: 8,
       category: 'general'
   }
   static propTypes = {
       country: PropTypes.string,
       pageSize: PropTypes.number,
       category: PropTypes.string
   }
   capitalizeFirstLetter = (string) =>{
       return string.charAt(0).toUpperCase() + string.slice(1);
   }
    constructor(props){
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }

    async updateNews(){
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=d59304423c5d48b79ed58ef5b84354f1&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json()
        this.props.setProgress(70);
        this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false,
        })
        this.props.setProgress(100);
    }

        

    async componentDidMount(){
        this.updateNews();
    }  
    
    // handlePrevClick =  async ()=>{
    //     this.setState({page: this.state.page - 1});
    //     this.updateNews();
    // }

        
    // handleNextClick = async ()=>{
    //     this.setState({page: this.state.page + 1});
    //     this.updateNews();
    // }
    fetchMoreData = async () =>{
        this.setState({page: this.state.page + 1})
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=dbe57b028aeb41e285a226a94865f7a7&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false,
        })
    };
        
        

    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center">NewsMonkey Top Headlines</h1>
                {/* {this.state.loading && <Spinner/>} */}
                {this.state.loading && <h4>Loading...</h4>}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<h4>Loading...</h4>}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element)=>{
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageurl={element.urlToImage} newsUrl = {element.url} author = {element.author} date = {element.publishedAt} source={element.source.name}/>
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-info" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/20)} type="button" className="btn btn-info" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
            </div>
        )
    }
}

export default News
