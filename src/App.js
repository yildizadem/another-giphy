import React, { Component } from 'react';
import axios from "axios";
import Header from './components/Header';
import Content from './components/Content';
import './App.css';

const conf = {
  baseURL: "https://api.giphy.com/v1/gifs",
  apiKey: "ElpNAo8ZcngrLCo9XDgR5uGFnA08ltln"
} 

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      datas: [],
      isSearchActive: false,
      isContactActive: true
    }
    this.searchText = null;
    this.offset = 0
    this.onSearchHandle = this.onSearchHandle.bind(this);
    this.listenToScroll = this.listenToScroll.bind(this);
    this.loadMoreHandle = this.loadMoreHandle.bind(this);
  }
  componentDidMount(){
    window.addEventListener('scroll', this.listenToScroll)
    this.getTrendingGifs()
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.listenToScroll)
  }
  listenToScroll(){
    if(!this.searchText && window.pageYOffset + window.innerHeight === document.documentElement.scrollHeight) {
      this.getTrendingGifs()
    }
  }
  onSearchHandle(_searchText){
    this.searchText = _searchText;
    this.offset = 0;
    this.searchText
      ? this.getGifsForSearch(false)
      : this.getTrendingGifs();
  }
  getTrendingGifs(){
    axios.get(`${conf.baseURL}/trending?api_key=${conf.apiKey}&`+
    `limit=20&offset=${this.offset}&rating=G`)
    .then((response)=>{
      console.log(response);
      this.offset += 20;
      this.setState({
        datas:this.state.datas.concat(response.data.data),
        isSearchActive: false
      });
    })
  }
  getGifsForSearch(more){
    axios.get(`${conf.baseURL}/search?api_key=${conf.apiKey}&limit=20&rating=G`+
    `&offset=${this.offset}&q=${this.searchText}&lang=en`)
    .then((response)=>{
      console.log(response);
      let datas = more
        ? this.state.datas.concat(response.data.data)
        : response.data.data;
      this.offset += 20;
      this.setState({
        datas: datas,
        isSearchActive: true
      });
    })
  }
  loadMoreHandle(){
    this.getGifsForSearch(true);
  }
  render() {
    return (
      <div>
        <Header onSearchHandle={this.onSearchHandle}/>
        <Content datas={this.state.datas} isSearchActive={this.state.isSearchActive}
        loadMoreHandle={this.loadMoreHandle}/>
      </div>
    )
  }
}
