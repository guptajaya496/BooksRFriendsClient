
import React, {Component} from 'react';
import Header from './header.jsx';
import Footer from "./footer.jsx";

class ContactUs extends Component{

    render(){
        return(
            <div>

                <Header/>

                <div className="container">
                    <div className="row row-header">
                        <div className="col-sm-12">
                            <Contactus/>
                        </div>
                    </div>
                </div>

                <div className="row row-header ">
                    <div className="col-sm-12">
                        <Footer/>
                    </div>
                </div>

            </div>
        );
    }
}

class Contactus extends Component{

    render(){

        return (
            <div className="container">
                <div className="row-content">
                    <h1> Our Leaders </h1>

                    <div className="list-group-item">

                        <ul className="media-list">
                            <li className="media">
                                <div class="media-left media-middle">
                                    <a>
                                        <img class="media-object img-thumbnail imgContact" src="../images/Nicholas-Stephanie.jpg"
                                             alt="Nicolas Stephanie" ></img>
                                    </a>
                                </div>
                                <div class="media-body">
                                    <h3 class="media-heading">Nicolas Stephanie</h3>
                                    <span>Head Library Incharge</span>
                                    <p></p>
                                </div>
                            </li>

                            <li className="media">
                                <div class="media-left media-middle">
                                    <a>
                                        <img class="media-object img-thumbnail imgContact" src="../images/Sonia_Sodha.png"
                                             alt="Sonia Sodha" ></img>
                                    </a>
                                </div>
                                <div class="media-body">
                                    <h3 class="media-heading">Sonia Sodha</h3>
                                    <span>Asst. Library Incharge</span>
                                    <p></p>
                                </div>
                            </li>
                            <li className="media">
                                <div class="media-left media-middle">
                                    <a>
                                        <img class="media-object img-thumbnail imgContact" src="../images/Stephne.jpg"
                                             alt="Stephne" ></img>
                                    </a>
                                </div>
                                <div class="media-body">
                                    <h3 class="media-heading">Stephne</h3>
                                    <span>Librarian</span>
                                    <p></p>
                                </div>
                            </li>
                            <li className="media">
                                <div class="media-left media-middle">
                                    <a>
                                        <img class="media-object img-thumbnail imgContact" src="../images/Rosy.jpeg"
                                             alt="Rosy" ></img>
                                    </a>
                                </div>
                                <div class="media-body">
                                    <h3 class="media-heading">Rosy</h3>
                                    <span>Founder & CEO </span>
                                    <p></p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default ContactUs;

