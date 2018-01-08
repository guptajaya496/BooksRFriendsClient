
import React, {Component} from 'react';

class Footer extends Component{

    render(){
        return(
            <footer className="row-footer navbar-static-bottom" >
                <div className="row">
                    <div className="col-xs-5 col-xs-offset-1 col-sm-2 col-sm-offset-1">
                        <h5>Links</h5>
                        <ul className="list-unstyled">
                            <li><a id="linkcolor" href="/">Home</a></li>
                            <li><a id="linkcolor" href="/aboutus">About</a></li>
                            <li><a id="linkcolor" href="/contactus">Contact</a></li>
                        </ul>
                    </div>
                    <div className="col-xs-6 col-sm-5">
                        <h5>Our Address</h5>
                        <address>
                            100, State Beach, South Bay Road<br/>
                            Clear Water Bay, Ockland<br/>
                            United States<br/>
                            <i className="fa fa-phone"></i>: +852 1234 5678<br/>
                            <i className="fa fa-fax"></i>: +852 8765 4321<br/>
                            <i className="fa fa-envelope"></i>:
                            <a id="linkcolor" href="mailto:booksrfriends@edu.net">
                                booksrfriends@edu.net</a><br/>
                        </address>
                    </div>
                    <div className="col-xs-12 col-sm-4">
                        <div className="nav navbar-nav " style={{padding: 10+'px'}}>
                            <div className="row row-header">
                            <a className="btn btn-social-icon btn-google-plus" href="http://google.com/+"><i id="linkcolor" className="fa fa-google-plus"></i></a>
                            <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i id="linkcolor" className="fa fa-facebook"></i></a>
                            <a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/"><i id="linkcolor" className="fa fa-linkedin"></i></a>
                            <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i id="linkcolor" className="fa fa-twitter"></i></a>
                            <a className="btn btn-social-icon btn-youtube" href="http://youtube.com/"><i id="linkcolor" className="fa fa-youtube"></i></a>
                            <a className="btn btn-social-icon" href="mailto:"><i id="linkcolor" className="fa fa-envelope-o"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12">
                        <p style={{padding:10+'px'}}></p>
                        <p className="trademark">© Copyright 2015 Books R Friends</p>
                    </div>
                </div>
            </footer>
        );
    }
}


export default Footer;