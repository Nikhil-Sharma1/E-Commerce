import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType: string='default';
  sellerName: string='';
  userName: string='';
  searchResult: undefined | Product[];
  cartItems=0;
  constructor(
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    console.log(this.searchResult)
    this.router.events.subscribe((res:any)=>{
      if(res.url){
        if(localStorage.getItem('seller') && res.url.includes('seller')){
          this.menuType = 'seller';
          let sellerDetails= localStorage.getItem('seller');
          let sellerData = sellerDetails && JSON.parse(sellerDetails);
          this.sellerName = `${sellerData.f_name} ${sellerData.l_name}`;
        }
        else if(localStorage.getItem('user')){
          this.menuType = 'user';
          let userDetails= localStorage.getItem('user');
          let userData = userDetails && JSON.parse(userDetails);
          this.userName = `${userData.f_name} ${userData.l_name}`;
        }
        else{
          this.menuType = 'default'
        }
      }
    })
    let cartData=localStorage.getItem('localCart');
    if(cartData){
      this.cartItems=JSON.parse(cartData).length;
    }
    this.productService.cartData.subscribe((items)=>{
      this.cartItems=items.length;
    })
  }

  logout_seller(){
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }

  logout_user(){
    localStorage.removeItem('user');
    this.router.navigate(['/user-auth']);
  }

  searchProduct(query: KeyboardEvent){
    if(query){
      const element=query.target as HTMLInputElement;
      if(element.value!=''){
        this.productService.searchProducts(element.value).subscribe((res)=>{
          if(res.length>5){
            res.length=5;
            this.searchResult=res;
          }
        })
      }
      else{
        this.hideSearch();
      }
      
    }
  }

  hideSearch(){
    this.searchResult=undefined;
  }

  search(query:string){
    this.router.navigate([`/search/${query}`]);
  }

  redirectToDetails(id:any){
    this.router.navigate([`/details/${id}`]);
  }
}
