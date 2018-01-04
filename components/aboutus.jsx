
import React, {Component} from 'react';
import Header from './header.jsx';
import Footer from "./footer.jsx";

class AboutUs extends Component{

    render(){
        return(
            <div >

                <Header/>

                <div className="container">
                    <div className="row row-header">
                        <div className="col-sm-12">
                            <Aboutus />
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

class Aboutus extends Component{

    render(){

        return (
            <div className="container">
                <div className="row-content">
                    <div className="row-header">
                        <h1> About Us</h1>

                        <div className="well well-lg ">
                            <strong><h4>Books R Friends Online Library gives Great Opportunities to the learners to gain knowledge and improve their Wisdom and suceeded in the Life!!!</h4></strong>
                        </div>

                        <div>
                            <h3>
                                Library Hours
                            </h3>
                            <div> Library is accessible 24*7 hours for all the students.</div>
                        </div>

                        <div>
                            Simply login or register to access you favorite books and enjoy reading.
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default AboutUs;

