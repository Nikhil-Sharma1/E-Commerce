import { Component, OnInit } from '@angular/core';
import {SellerService} from '../services/seller.service';
import {Router} from '@angular/router';
import {SignUp} from '../data-type';
import {SignIn} from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  
  
  signup_data:SignUp={
    f_name:'',
    l_name:'',
    email:'',
    phone:'',
    password: ''
  };

  signin_data:SignIn={
    email:'',
    password:''
  }

  new_user=true;
  authError:string='';
  constructor(
    private seller: SellerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.seller.reloadSeller();
  }

  validate(type: string){
    let isNotEmpty=false;
    switch(type){
      case 'sign-up':
        isNotEmpty = Object.values(this.signup_data).every(x => x != null && x != '');
        if(isNotEmpty){
          let email_pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
          if(this.signup_data.email.match(email_pattern)){
            let phone_pattern = /^\d{10}$/;
            if(this.signup_data.phone.match(phone_pattern)){
              return true;
            }
            else{
              this.authError="Please enter valid phone number";
            }
          }
          else{
            this.authError="Please enter valid email address";
          }
        }
        else{
          this.authError="Please fill all mandatory fields";
        }
      break;
      case 'sign-in':
        isNotEmpty = Object.values(this.signin_data).every(x => x != null && x != '');
        if(isNotEmpty){
          return true;
        }
        else{
          this.authError="Please fill all mandatory fields";
        }
    }
    return false;
    // if()
  }

  signup(){
    this.authError='';
    if(this.validate('sign-up')){
      this.seller.userSignUp(this.signup_data);
    }
  }

  signin(){
    this.authError='';
    if(this.validate('sign-in')){
      this.seller.userSignIn(this.signin_data);
      this.seller.isLoginError.subscribe((error)=>{
        if(error){
          this.authError="Email or password is incorrect";
        }
        else{
          alert("Login Successful");
        }
      })
    }
  }

  toggle(){
    this.authError='';
    this.signup_data={
      f_name:'',
      l_name:'',
      email:'',
      phone:'',
      password: ''
    }
    this.signin_data={
      email:'',
      password:''
    }
    this.new_user=!this.new_user;
  }

}
