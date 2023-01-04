import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart, Product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData=new EventEmitter<Product[]|[]>();
  constructor(private http: HttpClient ) {}
  addProduct(data:Product){
    return this.http.post('http://localhost:3000/products',data);
  }

  getProduct(id: string){
    return this.http.get<Product>(`http://localhost:3000/products/${id}`);
  }

  ProductList(){
    return this.http.get<Product[]>('http://localhost:3000/products');//use product to define type, otherwise it take it as a object
  }

  deleteProduct(id:number){
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  updateProduct(data:Product){
    return this.http.put<Product>(`http://localhost:3000/products/${data.id}`,data);
  }

  popularProducts(){
    return this.http.get<Product[]>(`http://localhost:3000/products?_limit=4`);
  }

  trendyProducts(){
    return this.http.get<Product[]>(`http://localhost:3000/products`);
  }

  searchProducts(query:string){
    return this.http.get<Product[]>(`http://localhost:3000/products?q=${query}`)
  }

  localAddToCart(data:Product){
    let cartData=[];
    let localCart=localStorage.getItem('localCart');
    if(!localCart){
      localStorage.setItem('localCart',JSON.stringify([data]));
    }
    else{
      cartData=JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart',JSON.stringify(cartData));
    }
    this.cartData.emit(cartData);
  }

  removeItemFromCart(id:string){
    let cartData=localStorage.getItem('localCart');
    if(cartData){
      let items:Product[]=JSON.parse(cartData);
      items=items.filter((item:Product)=>
        id!=item.id?.toString()
      )
      console.log(items);
      localStorage.setItem('localCart',JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addToCart(cartData:Cart){
    return this.http.post('http://localhost:3000/cart',cartData);
  }
}
