import React, {Component} from 'react';
import Book from './Book.jsx';
import Header from './header.jsx';
import Footer from './footer.jsx';
import Config from '../config';

class Library extends Component {

    constructor(props) {
        super(props);

        this.state ={
            BookList: [],
            SearchList : [],
            EmptySearchList : '',
            selectedFilterValue:'',
            MyFavoriteList: []
        };

        this.onChangeFilterValueHandler = this.onChangeFilterValueHandler.bind(this);
        this.onSearchClickHandler = this.onSearchClickHandler.bind(this);
        this.AddFavoriteBookHandler = this.AddFavoriteBookHandler.bind(this);
    }

    componentWillMount(){
        console.log(Config.URLBOOKSAPI);
        fetch(Config.URLBOOKSAPI,{
            method:'GET',
            mode: 'cors',
            headers: {
                'dataType': 'json',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'],
                'Access-Control-Allow-Origin': Config.ORIGINURLAPP,
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        })
        .then(results => {
            return results.json();
        })
        .then(json => {
            console.log(json);
            this.setState({BookList:json})
        });
    }

    onChangeFilterValueHandler(e){
        this.setState({selectedFilterValue:e.target.value});

        let filterValue= this.state.selectedFilterValue;

        let mainBooksList = this.state.BookList;

        let searchList = [];

        searchList = mainBooksList.filter(book => {
            return (
                book["title"].toLowerCase().indexOf(filterValue.toLowerCase()) != -1 ||
                book["author"].toLowerCase().indexOf(filterValue.toLowerCase()) != -1||
                book["publication"].toLowerCase().indexOf(filterValue.toLowerCase()) != -1
            )
        });

        if(searchList && searchList.length > 0){
            this.setState({SearchList:searchList});
            console.log(searchList);
        }
        else
            this.setState({EmptySearchList:"No Results Found!!!"});
    }

    AddFavoriteBookHandler(bookObj){

        let token = localStorage.getItem(Config.ACCESS_TOKEN);

        console.log(token);

        console.log("AddFavoriteBookHandler");

        if(token !== null){

            const bookId = bookObj._id;

            fetch(Config.URLFAVORITESAPI , {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Methods': ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'],
                    'Access-Control-Allow-Origin': Config.ORIGINURLAPP,
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'x-access-token' : token
                },
                body:JSON.stringify({
                    bookId
                })
            })
                .then(results => {
                    if(results !== null){
                        return results.json();
                    }
                })
                .then(json => {
                    if(json !== null){
                        console.log(json.books);
                        this.setState({FavoriteBookList:json.books});
                        console.log(this.state.FavoriteBookList);
                    }
                })
                .then(res =>{
                    let temp = [];

                    if(this.state.FavoriteBookList){
                        console.log(this.state.FavoriteBookList.length);
                        if(this.state.FavoriteBookList.length > 0){
                            for(let i=0; i <this.state.MainBookList.length; i++){
                                for(let j=0; j<this.state.FavoriteBookList.length; j++){
                                    if(this.state.MainBookList[i]._id === this.state.FavoriteBookList[j]){
                                        temp.push(this.state.MainBookList[i]);
                                    }
                                }
                            }

                            this.setState({MyFavoriteList:temp});
                            console.log("temp : " ,temp);
                        }
                    }
                });
        }
        else{
            alert("Please login to add to the favorites!!!");
        }
    }

    onSearchClickHandler(){

        let filterValue=this.state.selectedFilterValue;

        let mainBooksList = this.state.BookList;

        let searchList = [];

         searchList = mainBooksList.filter(book => {
            return (
                book["title"].toLowerCase().indexOf(filterValue.toLowerCase()) != -1 ||
                book["author"].toLowerCase().indexOf(filterValue.toLowerCase()) != -1||
                book["publication"].toLowerCase().indexOf(filterValue.toLowerCase()) != -1
            )
        });

        if(searchList && searchList.length > 0){
            this.setState({SearchList:searchList});
            console.log(searchList);
        }
        else
            this.setState({EmptySearchList:"No Results Found!!!"});

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

                                    <input type="text" className="form-control input-group col-sm-10 " value={this.state.selectedFilterValue} onChange={this.onChangeFilterValueHandler} placeholder="Search"></input>
                                    <div className="input-group-btn">
                                        <button className="btn btn-default btn-block-lg" type="submit" onClick={this.onSearchClickHandler}>
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