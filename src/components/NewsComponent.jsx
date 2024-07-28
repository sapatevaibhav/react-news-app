import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class NewsComponent extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      page: 1,
      loading: false,
      totalResults: 0,
    };
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${
      import.meta.env.VITE_API_KEY
    }&page=1&pageSize=21`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
  }

  handleNextClick = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 21)) {
      // No more pages
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${
        import.meta.env.VITE_API_KEY
      }&page=${this.state.page + 1}&pageSize=21`;
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
      });
    }
  };

  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${
      import.meta.env.VITE_API_KEY
    }&page=${this.state.page - 1}&pageSize=21`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ page: this.state.page - 1, articles: parsedData.articles });
  };

  render() {
    return (
      <div className="container my-3">
        <h2>Top Headlines on NewsDonkey</h2>
        <div className="row">
          {this.state.articles && this.state.articles.length > 0 ? (
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title.slice(0, 100) + "..."}
                    // description={element.description}
                    imageUrl={
                      element.urlToImage === null
                        ? "/android-chrome-512x512.png"
                        : element.urlToImage
                    }
                    newsUrl={element.url}
                  />
                </div>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-outline-secondary"
            disabled={this.state.page <= 1}
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default NewsComponent;
