import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart, Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private ProductService: ProductService
  ) { }
  product_details: undefined| Product
  product_quantity=1;
  removeCart=false;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['productId'];
      id && this.ProductService.getProduct(id).subscribe((res)=>{
        this.product_details=res;
        let cartData=localStorage.getItem('localCart');
        if(id && cartData){
          let items=JSON.parse(cartData);
          items=items.filter((item:Product)=>
            id===item.id?.toString()
          )
          console.log(items);
          if(items.length){
            this.removeCart=true;
          }else{
            this.removeCart=false;
          }
        }
      })
    });
  }
  handleClick(action:string){
    switch(action){
      case 'min':
        if(this.product_quantity>1)
        this.product_quantity--;
        break;
      case 'plus':
        if(this.product_quantity<20)
        this.product_quantity++;
    }
  }

  AddToCart(){
    if(this.product_details){
      this.product_details.quantity=this.product_quantity;
      if(!localStorage.getItem('user')){
        this.ProductService.localAddToCart(this.product_details);
        this.removeCart=true;
      }
      else{
        let user = localStorage.getItem('user');
        let userId= user && JSON.parse(user).id;
        let cartData:Cart= {
          ...this.product_details, userId, productId: this.product_details.id
        }
        delete cartData.id;
        this.ProductService.addToCart(cartData).subscribe((res)=>{
          if(res){
            alert("Product is added to cart")
          }
        })
      }
    }
  }

  RemoveFromCart(id:any){
    this.ProductService.removeItemFromCart(id);
    this.removeCart=false;
  }

}
