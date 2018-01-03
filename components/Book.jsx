import React,{Component} from 'react';
import {Page} from'react-pdf';
import {Document} from 'react-pdf/build/entry.webpack';
import Config from '../config';

class Book extends Component{

    constructor(props){
        super(props);

        this.state = {
            showFavoriteButton: true,
            hideFavoriteButton:false,
            showComponent: false,
            numPages: 2,
            pageNumber: 1
        };

        this.pdfNextBtnHandler = this.pdfNextBtnHandler.bind(this);
        this.pdfPrevBtnHandler = this.pdfPrevBtnHandler.bind(this);
        this.favBtnClickHandler = this.favBtnClickHandler.bind(this);
        this.onDocumentLoad = this.onDocumentLoad.bind(this);
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

        let bookObj = {
            id :this.props.book.id,
            title:this.props.book.title,
            publication:this.props.book.publication,
            author:this.props.book.author,
            image:this.props.book.image,
            path: this.props.book.path,
            featured:this.props.book.featured
        };

        if(this.props.callFrom === Config.CALLFROMUSER){
            this.setState({showComponent: true});
        }
    }

    onDocumentLoad({numPages }) {
        this.setState({ numPages });
    }

    pdfNextBtnHandler(){
        this.setState({pageNumber:this.state.pageNumber+1});
    }

    pdfPrevBtnHandler(){
        if(this.state.pageNumber > 1){
            this.setState({pageNumber:this.state.pageNumber-1});
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

                <div className="container col-sm-12">
                    {
                        (this.state.showComponent) ?
                            <div>
                                <div className="container containerPDF ">
                                    <Document file={this.props.book.path}  onLoadSuccess={this.onDocumentLoad}>
                                        <Page pageNumber={this.state.pageNumber} />
                                    </Document>
                                </div>
                                <div className="containerButtons">
                                    {
                                        (this.state.pageNumber >= 1) ?
                                            <button type="button" class="btn btn-success" id="pdfPrevbtn"
                                                    onClick={this.pdfPrevBtnHandler}>
                                                <span className="glyphicon glyphicon-arrow-left"></span> Prev
                                            </button> :
                                            <button type="button" class="btn btn-success disabled" id="pdfPrevbtn"
                                                    onClick={this.pdfPrevBtnHandler}>
                                                <span className="glyphicon glyphicon-arrow-left"></span> Prev
                                            </button>
                                    }
                                    <div className="col-sm-2"></div>
                                    {
                                        (this.state.pageNumber <= this.state.numPages)?

                                                <button type="button" class="btn btn-success" id="pdfNextbtn" onClick={this.pdfNextBtnHandler}>
                                                    <span className="glyphicon glyphicon-arrow-right"></span> Next
                                                </button> :

                                                <button type="button" class="btn btn-success" id="pdfNextbtn" disabled onClick={this.pdfNextBtnHandler}>
                                                    <span className="glyphicon glyphicon-arrow-right"></span> Next
                                                </button>
                                    }
                                    <p>Page {this.state.pageNumber} of {this.state.numPages}</p>
                                </div>
                            </div>
                        : null
                    }
                </div>
            </div>
        );
    }
}

export default Book;