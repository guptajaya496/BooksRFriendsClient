import React,{Component} from 'react';
import Book from './Book.jsx';
import Config from '../config';

class MainBooksList extends Component{

    constructor(props){
        super(props);

        this.state = {
            BookList:[]
        }
    }

    componentWillMount(){
        console.log(Config.URLBOOKSAPI);
        fetch(Config.URLBOOKSAPI,{
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
            console.log(results.json());
            return results.json();
        })
        .then(json => {
            this.setState({BookList:json})
        });
    }

    AddFavoriteBookHandler(bookObj){

        const newMyListState = this.state.MyList;

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
                    "path": bookObj.path
                })
            })
            .then(results => {
                this.setState({Results:results});
            })
            .then((favlist)=>{fetch(this.state.urlFavorites)
                    .then(results => results.json())
                    .then(json => {
                            this.setState({MyList:json});
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
                        this.setState({MyList:json});
                    });
                });
            }
        }
    }

    RemoveFavoriteBookHandler(bookObj){

        const newMyListState = this.state.MyList;

        console.log("I am in remove favs");

        if((newMyListState.filter(book => book._id === bookObj._id)).length > 0){

            for(let i=0; i<newMyListState.length;i++){
                if(newMyListState[i]._id === bookObj._id){
                    newMyListState.splice(i,1);
                    break;
                }
            }

            this.setState({MyList:newMyListState});
        }

        fetch(Config.URLFAVORITESAPI , {
            method: 'DELETE',
            mode:'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods' : ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'],
                //'Access-Control-Allow-Origin': Config.ORIGINURLLOCAL,
                'Access-Control-Allow-Origin': Config.ORIGINURLAPP,
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        })
        .then((favlist)=>{
            this.state.MyList.map((list)=> {
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
                        "title": list.title,
                        "author": list.author,
                        "publication": list.publication,
                        "image": list.image,
                        "path": list.path
                    })
                })
                .then(results => {
                    this.setState({Results:results});
                });
            })
        })
        .then((favlist)=>{
            fetch(Config.URLFAVORITESAPI,{
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
            .then(results =>{return results.json()})
            .then(json => {
                    this.setState({MyList:json});
            });
        });
    }

    openEbookHandler(bookObj){

        this.setState({EbookPath:bookObj.path});
    }

    render(){

        const bookList = this.state.BookList.map((book) => {

            return (
                <div key={book.id} className="col-sm-2">
                    <Book key={book.id} book={book} callFrom={Config.CALLFROMHOME}/>
                </div>
            );
        });

        return(
            <div className="container">
                <h1>New Arrivals</h1>
                <div className="row ">
                        {bookList}
                </div>
            </div>
        );
    }
}

export default MainBooksList;

