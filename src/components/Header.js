import React, { Component } from 'react'
import searchIcon from '../search-icon.svg';

export default class Header extends Component {
    _searchText = ""
    render() {
        return (
            <header>
                <nav>
                    <div className="logo">Another Giphy</div>
                </nav>
                <div className="search">
                <div>
                    <input placeholder="Search GIFs" onChange={(e) => {
                        this._searchText = e.target.value;
                        !this._searchText && this.props.onSearchHandle();
                    }}/>
                </div>
                <div onClick={() => this.props.onSearchHandle(this._searchText)}>
                    <img src={searchIcon} alt="search-icon"></img>
                </div>
                </div>
            </header>
        )
    }
}
