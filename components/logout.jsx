import React, {Component} from 'react';
import Header from './header.jsx';
import Footer from './footer.jsx';
import Config from '../config';

class Logout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            logoutMessage : ''
        };
    }

    componentWillMount(){
        fetch(Config.URLLOGOUTAPI , {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'],
                'Access-Control-Allow-Origin': Config.ORIGINURLAPP,
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        }).then(results => {
            console.log(results.status);
            if(results.status === 200)
            {
                localStorage.setItem(Config.ACCESS_TOKEN_KEY, '');
                this.setState({logoutMessage : "Hope you enjoy Reading, Please visit again !!!"});
            }
            else{
                this.setState({logoutMessage : "There is some problem with logging out !!"});
            }
        });
    }

    render() {
        return (

            <div>

                <Header/>

                <div className="container">
                    <h3>{this.state.logoutMessage}</h3>
                </div>

                <div className="row row-header navbar-fixed-bottom">
                    <Footer/>
                </div>

            </div>
        );
    }
}

export default Logout;