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

