import React,{Component} from 'react';
import Book from './Book.jsx'
import Config from '../config';

class MyFavoriteBooksList extends Component{

    constructor(props){
        super(props);

        this.state = {
            MainBookList :[],
            FavoriteBookList:[],
            MyFavoriteList : [],
            Results:[],
            EbookPath : '',
            ACCESS_TOKEN : '',
            SearchList : [],
            EmptySearchList : '',
            selectedFilterText:'',
            selectedFilterValue:''
        };

        this.AddFavoriteBookHandler = this.AddFavoriteBookHandler.bind(this);
        this.RemoveFavoriteBookHandler = this.RemoveFavoriteBookHandler.bind(this);
        this.openEbookHandler = this.openEbookHandler.bind(this);
        this.onChangeFilterTextHandler = this.onChangeFilterTextHandler.bind(this);
        this.onChangeFilterValueHandler = this.onChangeFilterValueHandler.bind(this);
        this.onSearchClickHandler = this.onSearchClickHandler.bind(this);
        this.AddFavoriteBookHandler = this.AddFavoriteBookHandler.bind(this);
    }

    componentWillMount(){

        let token = localStorage.getItem(Config.ACCESS_TOKEN_KEY);

        console.log("componentWillMount");

        fetch(Config.URLBOOKSAPI,{
            method:'GET',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'],
                'Access-Control-Allow-Origin': Config.ORIGINURLAPP,
                'Access-Control-Allow-Headers': 'Content-Type',
                'x-access-token': token
            }
        })
        .then(results =>{
            return results.json()})
        .then(json => {
            if(json){
                this.setState({MainBookList:json});
                console.log(this.state.MainBookList);
            }
        })
        .then(fetch(Config.URLFAVORITESAPI,{
                method:'GET',
                mode: 'cors',
                headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Methods': ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'],
                        'Access-Control-Allow-Origin': Config.ORIGINURLAPP,
                        'Access-Control-Allow-Headers': 'Content-Type',
                        'x-access-token': token
                    }
            })
            .then(results =>{
                if(results !== null)
                    return results.json();
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
            })
        );
    }

    onChangeFilterTextHandler(e){
        this.setState({selectedFilterText:e.target.value});
    }

    onChangeFilterValueHandler(e){
        this.setState({selectedFilterValue:e.target.value});
    }

    AddFavoriteBookHandler(bookObj){

        let token = localStorage.getItem(Config.ACCESS_TOKEN_KEY);

        console.log("AddFavoriteBookHandler");

        if(token != ''){

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

    RemoveFavoriteBookHandler(bookObj){

        console.log("I am in remove favorites");

        let token = localStorage.getItem(Config.ACCESS_TOKEN_KEY);

        const bookId = bookObj._id;

        if(token !== ''){
            fetch(Config.URLFAVORITESAPI , {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Methods' : ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'],
                    'Access-Control-Allow-Origin': Config.ORIGINURLAPP,
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'x-access-token': token
                },
                body:JSON.stringify({
                    bookId
                })
            })
            .then(results =>{return results.json()})
            .then(json => {
                console.log(json.books);
                this.setState({FavoriteBookList:json.books});
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
                    else{
                        this.setState({MyFavoriteList:[]});
                    }
                }
            })
        }
        else{
            alert("Please login again !!!");
            history.push('/logout');
        }


    }

    openEbookHandler(bookObj){
        this.setState({EbookPath:bookObj.path});
    }

    render(){

        console.log(this.state.MyFavoriteList);

        const favBookList = this.state.MyFavoriteList.map((book) => {
            return (
                <div key={book.id} className="col-sm-2">
                    <Book key={book.id} book={book} callFrom={Config.CALLFROMUSER}
                          triggerParentUpdate={this.RemoveFavoriteBookHandler}
                          openEBook={this.openEbookHandler}/>
                </div>
            );
        });

        const searchbookList = this.state.SearchList.map((book) => {
            return (
                <div key={book.id} className="col-sm-2">
                    <Book key={book.id} book={book} callFrom={Config.CALLFROMLIBRARY} triggerParentUpdate={this.AddFavoriteBookHandler}/>
                </div>
            );
        });

        return(

            <div className="container">

                <div className="container">
                    <div className="row row-header">
                        <div className="col-sm-12">
                            <div>
                                <h1>Search Catalog</h1>
                                <div className="input-group col-sm-1"></div>
                                <div className="input-group">
                                    <select id="searchby" name="searchby" className="input-group col-sm-4" value={this.state.selectedFilterText} onChange={this.onChangeFilterTextHandler}>
                                        <option value="select" defaultValue="title">Please Select Value</option>
                                        <option value="publication">Publication</option>
                                        <option value="author">Author</option>
                                        <option value="title">Title</option>
                                    </select>
                                    <div className="input-group col-sm-1"></div>
                                    <input type="text" className=" input-group col-sm-4" value={this.state.selectedFilterValue} onChange={this.onChangeFilterValueHandler} placeholder="Search"></input>
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

                <div className="row row-header"></div>
                <div className="container row-header">
                    <h1>My Favorites</h1>
                </div>
                <div className="row ">
                    {favBookList}
                </div>

            </div>
        );
    }
}

export default MyFavoriteBooksList;

