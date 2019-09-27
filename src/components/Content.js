import React, { Component } from 'react'

export default class Content extends Component {

    render() {
        return (
            <div className="content">
                <div className="gif-grid">
                    {this.props.datas.map(data=>{
                        let img = data.images.original;
                        return (
                                <img key={data.id} src={img.webp} alt={data.title}
                                onLoad={(e)=>{e.target.className = "visible"}}/>
                            )
                    })}
                </div>
                {this.props.isSearchActive
                    ? <div className="btn btn-red my-1" onClick={this.props.loadMoreHandle}>Load more...</div>
                    : null
                }
            </div>
        )
    }
}
