import React, {Component} from 'react';
import Book from './Book.jsx';
import Header from './header.jsx';
import Footer from './footer.jsx';
import Config from '../config';

class Library extends Component {

    constructor(props) {
        super(props);

        this.state ={

            SearchList : [],
            EmptySearchList : '',
            selectedFilterText:'',
            selectedFilterValue:'',
            MyFavoriteList: []
        };

        this.onChangeFilterTextHandler = this.onChangeFilterTextHandler.bind(this);
        this.onChangeFilterValueHandler = this.onChangeFilterValueHandler.bind(this);
        this.onSearchClickHandler = this.onSearchClickHandler.bind(this);
        this.AddFavoriteBookHandler = this.AddFavoriteBookHandler.bind(this);
    }

    onChangeFilterTextHandler(e){
        this.setState({selectedFilterText:e.target.value});
    }

    onChangeFilterValueHandler(e){
        this.setState({selectedFilterValue:e.target.value});
    }

    AddFavoriteBookHandler(bookObj){

        let token = localStorage.getItem(Config.ACCESS_TOKEN);

        console.log(token);

        if(token != ''){

            const newMyListState = this.state.MyFavoriteList;

            const bookId = bookObj._id;

            if(newMyListState.length === 0){

                fetch(Config.URLFAVORITESAPI , {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Methods': ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'],
                        //'Access-Control-Allow-Origin': Config.ORIGINURLLOCAL,
                        'Access-Control-Allow-Origin': Config.ORIGINURLAPP,
                        'Access-Control-Allow-Headers': 'Content-Type'
                    },
                    body:JSON.stringify({
                        "title": bookObj.title,
                        "author": bookObj.author,
                        "publication": bookObj.publication,
                        "image": bookObj.image,
                        "path": bookObj.path,
                        "featured" : ' '
                    })
                })
                    .then(results => {
                        this.setState({Results:results});
                    })
                    .then((favlist)=>{fetch(Config.URLFAVORITESAPI)
                        .then(results =>results.json())
                        .then(json => {
                            this.setState({MyFavoriteList:json});
                        });
                    });
            }
            else{
                if((newMyListState.filter(book => book._id === bookId)).length > 0){

                    alert("Item is already in the list");

                    this.setState({MyList:newMyListState});
                }
                else{

                    fetch(Config.URLFAVORITESAPI , {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Methods': ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'],
                            //'Access-Control-Allow-Origin': Config.ORIGINURLLOCAL,
                            'Access-Control-Allow-Origin': Config.ORIGINURLAPP,
                            'Access-Control-Allow-Headers': 'Content-Type'
                        },
                        body:JSON.stringify({
                            "title": bookObj.title,
                            "author": bookObj.author,
                            "publication": bookObj.publication,
                            "image": bookObj.image,
                            "path": bookObj.path
                        })
                    })
                    .then(results => {
                        this.setState({Results:results});
                    })
                    .then((favlist)=>{fetch(Config.URLFAVORITESAPI)
                        .then(results =>results.json())
                        .then(json => {
                            this.setState({MyFavoriteList:json});
                        });
                    });
                }
            }
        }
        else{
            alert("Please login to add to the favorites!!!");
        }
    }

    onSearchClickHandler(){

        var searchText = 'filterText';
        var searchValue = 'filterValue';

        var filterText=this.state.selectedFilterText;
        var filterValue=this.state.selectedFilterValue;

        let url = Config.URLBOOKSAPI + '/' + '?'+ searchText + '=' + filterText+'&'+ searchValue + '='+ escape(filterValue);

        fetch(url ,{
            method:'GET',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'],
                //'Access-Control-Allow-Origin': Config.ORIGINURLLOCAL,
                'Access-Control-Allow-Origin': Config.ORIGINURLAPP,
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        })
        .then(results =>{
            return results.json();
        })
        .then(json => {
            this.setState({SearchList:json});
        })
        .then(json => {
            if(this.state.SearchList.length === 0){
                this.setState({EmptySearchList:'No Results Found'});
            }
        });
    }

    render(){

        const searchbookList = this.state.SearchList.map((book) => {
            return (
                <div key={book.id} className="col-sm-2">
                    <Book key={book.id} book={book} callFrom={Config.CALLFROMLIBRARY} triggerParentUpdate={this.AddFavoriteBookHandler}/>
                </div>
            );
        });

        return(
            <div>

                <Header/>

                <div className="container">
                    <div className="row row-header">
                        <div className="col-sm-12">
                            <div>
                                <h1>Search Catalog</h1>
                                <div className="input-group">
                                       <select id="searchby" name="searchby" className="input-group form-control col-sm-4" value={this.state.selectedFilterText} onChange={this.onChangeFilterTextHandler}>
                                            <option value="publication" defaultValue="publication">Publication</option>
                                            <option value="author">Author</option>
                                            <option value="title">Title</option>
                                        </select>
                                    <div className="input-group col-sm-1"></div>
                                    <input type="text" className="form-control input-group col-sm-4" value={this.state.selectedFilterValue} onChange={this.onChangeFilterValueHandler} placeholder="Search"></input>
                                    <div className="input-group-btn col-sm-2">
                                        <button className="btn btn-default btn-block-sm" type="submit" onClick={this.onSearchClickHandler}>
                                            <i className="glyphicon glyphicon-search"></i>
                                        </button>
                                    </div>

                                </div>
                                <div className="containerPadding"></div>
                                <div>
                                    <div className="container ">
                                        <h1>Search Results</h1>
                                        <div className="row ">
                                            <div className="col-sm-12">
                                                {
                                                    (this.state.SearchList.length > 0) ?
                                                        searchbookList :
                                                        this.state.EmptySearchList
                                                }
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row row-header">
                    <Footer/>
                </div>

            </div>
        );
    }
}

export default Library;