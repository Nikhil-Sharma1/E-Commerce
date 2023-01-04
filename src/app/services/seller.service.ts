import { Injectable , EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SignUp} from '../data-type';
import {SignIn} from '../data-type';
import {BehaviorSubject} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  userSignUp(data:SignUp){
    return this.http.post('http://localhost:3000/seller',data, {observe:'response'}).subscribe((res)=>{
      this.isSellerLoggedIn.next(true);  
      localStorage.setItem('seller',JSON.stringify(res.body));
      console.log(res.body);
      this.router.navigate(['seller-home']);
      // console.log(res);
    });
  }

  userSignIn(data:SignIn){
    let result = this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,{observe:'response'}).subscribe((res:any)=>{
      console.log(res);
      if(res && res.body && res.body.length){
        console.log("user logged in");
        this.isSellerLoggedIn.next(true);
        // console.log(res.body);
        localStorage.setItem('seller',JSON.stringify((res.body)[0]));
        this.router.navigate(['seller-home']);
        // return true;
      }
      else{
        console.warn("Login failed");
        this.isLoginError.emit(true);
      }
    });
    // console.log(data);
  }

  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home'])
    }
  }
}
