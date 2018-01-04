
import React,{Component} from 'react';

class Header extends Component{

    render(){

        return(
            <div>
                <nav className=" navbar-expand-lg bg-color navbar-fixed-top nav " role="navigation">
                    <a className="navbar-brand" href='/'>
                        <img src="../images/BooksRFriendsLogo.jpg" alt="logo" style={{width:200+'px'}}></img>
                    </a>
                    <div id="navbar" className="navbar navbar-collapse collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href='/'>
                                    <span className="glyphicon glyphicon-home" aria-hidden="true"></span> Home
                                </a>
                            </li>
                            <li className="nav-item ">
                                <a className="nav-link" href='/aboutus'>
                                    <span className="glyphicon glyphicon-info-sign" aria-hidden="true"></span> About Us
                                </a>
                            </li>
                            <li className="nav-item ">
                                <a className="nav-link" href='/library'>
                                    <span className="glyphicon glyphicon-info-sign" aria-hidden="true"></span> Library
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href='/contactus'>
                                    <i className="glyphicon glyphicon-envelope white"></i> Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="navbar navbar-collapse collapse">
                        {
                            (this.props.callfrom === "LoggedIn") ?
                                <ul className="navbar-nav ">

                                    <li className="nav-item">
                                        <span className="nav-link"> Welcome, User </span>
                                    </li>

                                    <li className="nav-item">
                                        <a className="nav-link" href='/logout'>
                                            <span className="glyphicon glyphicon-log-in" aria-hidden="true"></span> Logout
                                        </a>
                                    </li>
                                </ul>
                                :
                                <ul className="navbar-nav ">
                                    <li className="nav-item">
                                        <a className="nav-link " href='/login'>
                                            <span className="glyphicon glyphicon-log-in" aria-hidden="true"></span> Login
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link ">
                                        /
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link " href='/register'>
                                            <span className="glyphicon glyphicon-log-in" aria-hidden="true"></span> Register
                                        </a>
                                    </li>
                                </ul>
                        }
                    </div>
                </nav>
                <header className="jumbotron ">
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-xs-12 col-sm-8 headingLogo">
                                <h1>Books R Friends</h1>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}

export default Header;