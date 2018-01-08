
import React, {Component} from 'react';
import MainBooksList from './mainbookslist.jsx';
import Header from './header.jsx';
import Footer from "./footer.jsx";

class Home extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div >

                <Header/>

                <div>
                    <MainBooksList/>
                </div>

                <div className="row ">
                    <div className="col-sm-12">
                        <Footer/>
                    </div>
                </div>

            </div>
        );
    }
}

export default Home;

