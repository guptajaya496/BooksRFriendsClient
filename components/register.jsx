import React, {Component} from 'react';
import { RegisterInput } from 'react-bootstrap';
import Header from './header.jsx';
import Footer from './footer.jsx';
import Config from '../config';

class Register extends Component{

    constructor(props){
        super(props);

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.onChangeFirstNameHandler = this.onChangeFirstNameHandler.bind(this);
        this.onChangeLastNameHandler = this.onChangeLastNameHandler.bind(this);
        this.onChangeDOBHandler = this.onChangeDOBHandler.bind(this);
        this.onChangeAddressHandler = this.onChangeAddressHandler.bind(this);
        this.onChangeEmailIdHandler = this.onChangeEmailIdHandler.bind(this);
        this.onChangeOccupationHandler = this.onChangeOccupationHandler.bind(this);
        this.onChangeUserNameHandler = this.onChangeUserNameHandler.bind(this);
        this.onChangePasswordHandler = this.onChangePasswordHandler.bind(this);
        this.onChangeConfpasswordHandler = this.onChangeConfpasswordHandler.bind(this);

        this.state = {

            counter:0,

            firstName : null,
            firstNameValid:false,

            lastName:null,
            lastNameValid:false,

            dateOfBirth:null,
            dobValid:false,

            occupation :null,
            occupationValid:false,

            address:null,
            addressValid:false,

            emailId:null,
            emailIdValid:false,

            userName:null,
            userNameValid:false,

            password:null,
            passwordValid:false,

            confPassword:null,
            confPasswordValid:false,

            validForm:false
        };
    }

    handleFormSubmit(event){

        event.preventDefault();

        this.setState({counter: this.state.counter+1});

        if(this.state.firstNameValid && this.state.lastNameValid && this.state.dobValid &&
            this.state.addressValid && this.state.emailIdValid && this.state.occupationValid &&
            this.state.userNameValid && this.state.passwordValid && this.state.confPasswordValid ){

            this.setState({validForm: true});

            fetch(Config.URLREGISTERAPI, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Methods': ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'],
                    //'Access-Control-Allow-Origin': Config.ORIGINURLLOCAL,
                    'Access-Control-Allow-Origin': Config.ORIGINURLAPP,
                    'Access-Control-Allow-Headers': 'Content-Type'
                },
                body:JSON.stringify({
                    "firstName":this.state.firstName,
                    "lastName": this.state.lastName,
                    "username":this.state.userName,
                    "password":this.state.password,
                    "dateOfBirth":this.state.dateOfBirth,
                    "address":this.state.address,
                    "occupation":this.state.occupation,
                    "emailId":this.state.emailId,
                    "confirmPassword":this.state.confPassword
                })
            }).then(results => {
                console.log(results.status);
                if(results.status === 200)
                {
                    alert("You are successfully registered!!!");
                    history.push('/login');
                }
                else{
                    alert("Oops, you are not registered , Please try again!!!");
                }

                this.setState({Results:results});
            });
        }
        else
        {
            alert("Please fill all the Fields!!");
            this.setState({validForm: false});
        }
    }

    onChangeFirstNameHandler(e){

        this.setState({firstName:e.target.value});
        if(e.target.value != "" ) {
            this.setState({firstNameValid: true});
        }
        else{
            this.setState({firstNameValid: false});
        }
    }

    onChangeLastNameHandler(e){
        this.setState({lastName:e.target.value});
        if(e.target.value != "" ) {
            this.setState({lastNameValid: true});
        }
        else{
            this.setState({lastNameValid: false});
        }
    }

    onChangeDOBHandler(e){
        this.setState({dateOfBirth:e.target.value});
        if(e.target.value != "" ) {
            this.setState({dobValid: true});
        }
        else{
            this.setState({dobValid: false});
        }
    }

    onChangeAddressHandler(e){
        this.setState({address:e.target.value});
        if(e.target.value != "" ) {
            this.setState({addressValid : true});
        }
        else{
            this.setState({addressValid: false});
        }
    }

    onChangeEmailIdHandler(e){
        this.setState({emailId:e.target.value});
        if(e.target.value != "" ) {
            this.setState({emailIdValid : true});
        }
        else{
            this.setState({emailIdValid: false});
        }
    }

    onChangeOccupationHandler(e){
        this.setState({occupation:e.target.value});
        if(e.target.value != "" ) {
            this.setState({occupationValid : true});
        }
        else{
            this.setState({occupationValid: false});
        }
    }

    onChangeUserNameHandler(e){
        this.setState({userName:e.target.value});
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

    onChangeConfpasswordHandler(e){
        this.setState({confPassword:e.target.value});
        if(e.target.value != "" && e.target.value === this.state.password ) {

            this.setState({confPasswordValid : true});
        }
        else{
            this.setState({confPasswordValid: false});
        }
    }

    render(){
        return(

            <div>

                <Header/>

                <div className="container table-bordered">
                    <div className="heading">
                        <h1>New Member</h1>
                    </div>
                    <div className="col-sm-12">
                        <form onSubmit={this.handleFormSubmit}>
                            <div className="form-group">
                                <label htmlFor="firstName">First Name:</label>

                                <input type="text" className="form-control"
                                       id="firstName" placeholder="Enter First Name"
                                       onChange={this.onChangeFirstNameHandler}></input>
                                {((!this.state.firstNameValid && this.state.counter === 0) || (!this.state.firstNameValid && this.state.counter > 0))?
                                    null : <div className="alert alert-warning">
                                        <strong>Warning!</strong> Please enter First Name
                                    </div>
                                }
                            </div>

                            <div className="form-group">
                                <label htmlFor="lastName">Last Name:</label>
                                <input type="text" className="form-control"
                                       id="lastName" placeholder="Enter Last Name"
                                       onChange={this.onChangeLastNameHandler}></input>
                                {((!this.state.lastNameValid && this.state.counter === 0) || (this.state.lastNameValid && this.state.counter > 0))?
                                    null : <div className="alert alert-warning">
                                                <strong>Warning!</strong> Please enter Last Name
                                            </div>
                                }
                            </div>

                            <div className="form-group">
                                <label htmlFor="dateofbirth">Date of Birth:</label>
                                <input type="date" className="form-control"
                                       id="dateofbirth" placeholder="Date of Birth"
                                       onChange={this.onChangeDOBHandler}></input>
                                {((!this.state.dobValid && this.state.counter === 0) || (this.state.dobValid && this.state.counter > 0))?
                                    null : <div className="alert alert-warning">
                                                 <strong>Warning!</strong> Please enter Date of Birth
                                            </div>
                                }
                            </div>

                            <div className="form-group">
                                <label htmlFor="occupation">Occupation:</label>
                                <input type="text" className="form-control"
                                       id="occupation" placeholder="Enter Occupation"
                                       onChange={this.onChangeOccupationHandler}></input>
                                {((!this.state.occupationValid && this.state.counter === 0) || (this.state.occupationValid && this.state.counter > 0))?
                                    null : <div className="alert alert-warning">
                                                <strong>Warning!</strong> Please enter Occupation
                                            </div>
                                }
                            </div>

                            <div className="form-group">
                                <label htmlFor="address">Address:</label>
                                <input type="text" className="form-control"
                                       id="address" placeholder="Enter Address"
                                       onChange={this.onChangeAddressHandler}></input>
                                {((!this.state.addressValid && this.state.counter === 0) || (this.state.addressValid && this.state.counter > 0))?
                                    null : <div className="alert alert-warning">
                                        <strong>Warning!</strong> Please enter Address
                                    </div>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="emailId">E-mail ID:</label>
                                <input type="email" className="form-control"
                                       id="emailId" placeholder="Enter E mail Id"
                                       onChange={this.onChangeEmailIdHandler}></input>
                                {((!this.state.emailIdValid && this.state.counter === 0) || (this.state.emailIdValid && this.state.counter > 0))?
                                    null : <div className="alert alert-warning">
                                                <strong>Warning!</strong> Please enter Email id
                                            </div>
                                }
                            </div>

                            <div className="form-group">
                                <label htmlFor="userName">User Name:</label>
                                <input type="text" className="form-control"
                                       id="userName" placeholder="Enter UserName"
                                       onChange={this.onChangeUserNameHandler}></input>
                                {((!this.state.userNameValid && this.state.counter === 0) || (this.state.userNameValid && this.state.counter > 0))?
                                    null : <div className="alert alert-warning">
                                                <strong>Warning!</strong> Please enter User Name
                                            </div>
                                }
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input type="password" className="form-control"
                                       id="password" placeholder="Enter password"
                                       onChange={this.onChangePasswordHandler}></input>
                                {((!this.state.passwordValid && this.state.counter === 0) || (this.state.passwordValid && this.state.counter > 0))?
                                    null : <div className="alert alert-warning">
                                                <strong>Warning!</strong> Please enter Password
                                            </div>
                                }
                            </div>

                            <div className="form-group">
                                <label htmlFor="confpassword">Confirm Password:</label>
                                <input type="password" className="form-control"
                                       id="confpassword" placeholder="Enter Confirm password"
                                       onChange={this.onChangeConfpasswordHandler}></input>
                                {((!this.state.confPasswordValid && this.state.counter === 0) || (this.state.confPasswordValid && this.state.counter > 0))?
                                    null : <div className="alert alert-warning">
                                                <strong>Warning!</strong> Please enter Confirm Password same as password
                                            </div>
                                }
                            </div>

                            <div className="row col-sm-12">
                                <div className="col-sm-5">
                                    <button type="submit" className="btn btn-primary btn btn-lg col-sm-2">
                                        Register
                                    </button>
                                </div>

                                <div className="col-sm-5">
                                    <button type="button" className="btn btn-primary btn btn-lg col-sm-2" >Cancel</button>
                                </div>
                            </div>
                        </form>
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

export default Register;
