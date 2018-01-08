import React,{Component} from 'react';
import Config from '../config';

class Book extends Component{

    constructor(props){
        super(props);

        this.state = {
            showFavoriteButton: true,
            hideFavoriteButton:false,
        };

        this.favBtnClickHandler = this.favBtnClickHandler.bind(this);
        this.openEbookHandler = this.openEbookHandler.bind(this);
    }

    ShowFavoriteButton(){
        this.setState({
            showFavoriteButton:true
        });
    }

    componentWillMount(){
        if(this.props.callFrom === Config.CALLFROMHOME){
            this.setState({showFavoriteButton:false});
        }

        if(this.props.callFrom === Config.CALLFROMLIBRARY || this.props.callFrom === Config.CALLFROMUSER){
            this.setState({showFavoriteButton:true});
        }
    }

    HideFavoriteButton(){
        this.setState({
            showFavoriteButton:false
        });
    }

    favBtnClickHandler(){

        let bookObj ={
            _id :this.props.book._id,
            title:this.props.book.title,
            publication:this.props.book.publication,
            author:this.props.book.author,
            image:this.props.book.image,
            path: this.props.book.path,
            featured:this.props.book.featured
        };

        if(this.props.callFrom === Config.CALLFROMLIBRARY){
            this.props.triggerParentUpdate(bookObj);
        }

        if(this.props.callFrom === Config.CALLFROMUSER){
            this.props.triggerParentUpdate(bookObj);
        }
    }

    openEbookHandler(){
        if(this.props.callFrom === Config.CALLFROMUSER){
            window.open("localhost:8080/" + encodeURI(this.props.book.path));
            //window.open(Config.ORIGINURLAPP + '/' + encodeURI(this.props.book.path));
        }
        else{
            alert("Please Add Book to Favorites to Read!!!");
        }

    }

    render(){

        const style = {
            width:'100%'
        };

        return(
            <div>
                <div key={this.props.book.id}  className="thumbnail">
                    <a href={this.props.book.image}></a>
                    <img src={this.props.book.image} onClick={this.openEbookHandler} alt="Lights" style={style}></img>
                    <div className="caption">
                        <span>
                            <strong>{this.props.book.title}</strong>
                            {
                                (this.state.showFavoriteButton)?
                                    <h5>
                                        <button key={this.props.book.id}  name='fav' onClick={this.favBtnClickHandler} >
                                            <i className='fa fa-star'/>
                                        </button>
                                    </h5>
                                    : null
                            }
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Book;