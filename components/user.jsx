import React, {Component} from 'react';
import Header from './header.jsx';
import Footer from "./footer.jsx";
import MyFavoriteBooksList from './myfavoritesbooklist.jsx';

class User extends Component{

    constructor(props){
        super(props);

        this.state = {
            LoggedIn : 'LoggedIn'
        }
    }

    render(){
        return(
            <div >

                <Header callfrom = {this.state.LoggedIn}/>

                <div className="container">
                    <div className="row row-header">
                        <MyFavoriteBooksList/>
                    </div>
                </div>

                <div className="row row-header navbar-fixed">
                    <Footer/>
                </div>

            </div>
        );
    }
}

export default User;
