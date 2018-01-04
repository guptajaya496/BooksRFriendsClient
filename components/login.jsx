import React, {Component} from 'react';
import Header from './header.jsx';
import Footer from './footer.jsx';
import Config from '../config';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state={
            counter:0,
            username : null,
            password:null,
            userNameValid:false,
            passwordValid:false,
            validForm:false,
            User_TOKEN :''
        };

        this.handleLoginFormSubmit = this.handleLoginFormSubmit.bind(this);
        this.onChangeUserNameHandler = this.onChangeUserNameHandler.bind(this);
        this.onChangePasswordHandler = this.onChangePasswordHandler.bind(this);
    }

    handleLoginFormSubmit(event){

        event.preventDefault();

        const { history } = this.props;

        this.setState({counter: this.state.counter+1});

        if(this.state.userNameValid && this.state.passwordValid){
            this.setState({validForm: true});

            fetch(Config.URLLOGINAPI, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Methods': ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'],
                    'Access-Control-Allow-Origin': Config.ORIGINURLAPP,
                    'Access-Control-Allow-Headers': 'Content-Type'
                },
                body:JSON.stringify({
                    "username":this.state.username,
                    "password":this.state.password
                })
            }).then(results => {
                    return results.json();
            }).then(user => ({
                     user
            })).then(user=> {
               if(user.user.success === true){
                   localStorage.setItem(Config.ACCESS_TOKEN_KEY,user.user.token);
                   history.push('/user');
               }
               else{
                   alert('Login Failed, Please try again!!!');
               }
            });
        }
        else{

            alert("Please fill all the Fields!!");
            this.setState({validForm: false});
        }
    }

    onChangeUserNameHandler(e){

        this.setState({username:e.target.value});

        if(e.target.value != "" ) {
            this.setState({userNameValid : true});
        }
        else{
            this.setState({userNameValid: false});
        }
    }

    onChangePasswordHandler(e){
        this.setState({password:e.target.value});
        if(e.target.value != "" ) {
            this.setState({passwordValid : true});
        }
        else{
            this.setState({passwordValid: false});
        }
    }

    render(){
        return(

            <div>

                <Header/>

                <div className="container table-bordered ">
                    <div className="row-contentlogin">
                        <div className="heading">
                            <h1>Already A Member</h1>
                        </div>
                        <div className="col-sm-12">
                            <form onSubmit={this.handleLoginFormSubmit}>
                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-addon col-sm-1"><i className="glyphicon glyphicon-user"></i></span>
                                        <input type="text" className="form-control col-sm-11" id="email" placeholder="Email ID"
                                                onChange={this.onChangeUserNameHandler}></input>
                                    </div>
                                    {((!this.state.userNameValid && this.state.counter === 0)|| (this.state.userNameValid) || (this.state.userNameValid && this.state.counter > 0))?
                                        null : <div className="alert alert-warning">
                                                 <strong>Warning!</strong> Please enter User Name
                                               </div>
                                    }
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-addon col-sm-1"><i className="glyphicon glyphicon-lock"></i></span>
                                        <input type="password" className="form-control col-sm-11" id="pwd" placeholder="Password"
                                                onChange={this.onChangePasswordHandler}></input>
                                    </div>
                                    {((!this.state.passwordValid && this.state.counter === 0) || (this.state.passwordValid)|| (this.state.passwordValid && this.state.counter > 0))?
                                        null : <div className="alert alert-warning">
                                            <strong>Warning!</strong> Please enter Password
                                        </div>
                                    }
                                </div>
                                <div className="col-sm-6">
                                    <button type="submit" className="btn btn-primary col-sm-offset-8  col-sm-3">Login</button>
                                </div>
                                <div className="col-sm-6">
                                    <button type="button" className="btn btn-primary col-sm-offset-3 col-sm-3">Cancel</button>
                                </div>
                            </form>
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

export default Login;

