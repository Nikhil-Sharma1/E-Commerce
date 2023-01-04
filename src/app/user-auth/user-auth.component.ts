import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service'
import {Router} from '@angular/router';
import {SignUp} from '../data-type';
import {SignIn} from '../data-type';
import {Cart} from '../data-type';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

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
    private UserService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.UserService.reloadUser();
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
      this.UserService.userSignUp(this.signup_data);
      this.localCartToDbCart();
    }
  }

  signin(){
    this.authError='';
    if(this.validate('sign-in')){
      this.UserService.userSignIn(this.signin_data);
      this.UserService.isLoginError.subscribe((error)=>{
        if(error){
          this.authError="Email or password is incorrect";
        }
        else{
          alert("Login Successful");
          this.localCartToDbCart();
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

  localCartToDbCart(){
    let data=localStorage.getItem('localCart');
    if(data){
      cartDataList:product[]=JSOn.parse(data);
      let user=localStorage.getItem('user');
      let userId=user && JSON.parse(user).id;
      cartDataList.forEach((product:product)=>{
        let cartData:Cart = {
          ...product,userId,productId:product.id
        }
        delete cartData.id;
      })
    }
  }

}
