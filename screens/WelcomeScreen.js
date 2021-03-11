import React from 'react';
import { TextInput, TouchableOpacity, View, Text, Modal, ScrollView, KeyboardAvoidingView,StyleSheet,Alert } from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class WelcomeScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            password: '',
            isModalVisible: false,
            firstName:'',
            lastName:'',
            email:'',
            confirmPassword:''
        }
    }

    userSignUp=(email,password,confirmPassword)=>{
        if(password != confirmPassword){
            alert("Passwords Do Not Match")
        }
        else{
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(()=>{
            db.collection("users").add({
                first_name:this.state.firstName,
                last_name:this.state.lastName,
                email:this.state.email
            })
            return Alert.alert("User Created Successfully","Now you will be automatically signed In"
            ,[{text:'OK',onPress:()=> {
                this.setState({
                    isModalVisible:false
                });
                this.userSignIn(this.state.email,this.state.password)
            }}]);
        })
        .catch(error=>{
            console.log(error)
        })
    }
    }
    showModal=()=>{
        return (
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.isModalVisible}>
                    
                    <KeyboardAvoidingView behavior = "padding">
                        <ScrollView>
                            <Text>User Sign Up</Text>
                            <TextInput placeholder = "First Name" 
                            onChangeText = {(text)=>this.setState({firstName:text})}
                            value = {this.state.firstName}/>

                        <TextInput placeholder = "Last Name" 
                            onChangeText = {(text)=>this.setState({lastName:text})}
                            value = {this.state.lastName}/>


                        <TextInput keyboardType = "email-address"
                            placeholder = "Email Address" 
                            onChangeText = {(text)=>this.setState({email:text})}
                            value = {this.state.email}/>

                        <TextInput 
                            placeholder = "Password" 
                            onChangeText = {(text)=>this.setState({password:text})}
                            value = {this.state.password}/>

                        <TextInput 
                            placeholder = "Confirm Password" 
                            onChangeText = {(text)=>this.setState({confirmPassword:text})}
                            value = {this.state.confirmPassword}/>

                        <TouchableOpacity onPress = {()=>{this.userSignUp(this.state.email,this.state.password,this.state.confirmPassword)}}><Text>Sign Up</Text></TouchableOpacity>
                        <TouchableOpacity onPress = {()=>{
                            this.setState({
                                isModalVisible:false
                            })
                        }}><Text>Cancel</Text></TouchableOpacity>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </Modal>
        )
    }
    userSignIn = async (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                this.props.navigation.navigate("TabNavigator")
            })
            .catch((error) => {
                switch (error) {
                    case "auth/user-not-found":
                        alert("User Not Found")
                        break;
                    case "auth/uid-already-exists":
                        alert("Account already in use");
                        break;
                    case "auth/session-cookie-expired":
                        alert("Session Expired")
                        break;
                    case "auth/project-not-found":
                        alert("Project Is Deleted")
                        break;
                    case "auth/invalid-password":
                        alert("Password Incorrect")
                        break;
                }
            })
    }
    render() {
        return (

            <View>
                {
                    this.showModal()
                }
                <TextInput 
                style = {styles.textInputBox}
                placeholder="Username"
                    keyboardType="email-address"
                    onChangeText={text => {
                        this.setState({
                            email: text
                        })
                    }} 
                    value = {this.state.email}/>
                <TextInput
                    style = {styles.textInputBox}
                    secureTextEntry={true}
                    placeholder="Password"
                    onChangeText={text => {
                        this.setState({
                            password: text
                        })
                    }} 
                    value = {this.state.password}/>

                <TouchableOpacity
                    onPress={() => {
                        this.userSignIn(this.state.email, this.state.password)
                    }
                    }>
                    <Text>
                        Sign In
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        this.setState({
                            isModalVisible:true
                        })
                    }
                    }>
                    <Text>
                        Sign Up
                    </Text>
                </TouchableOpacity>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    textInputBox:{
        borderWidth:1,
        borderRadius:10,
        borderColor:"#ff2244",
        margin:20,
        marginBottom:10,
        padding:5,
        paddingTop:-3,
        paddingBottom:-3,
    }
})