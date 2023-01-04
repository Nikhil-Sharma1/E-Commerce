import { Component, OnInit } from '@angular/core';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {

  product_details:Product={
    name:'',
    price:'',
    color:'',
    category:'',
    description:'',
    image_url:''
  }
  id:any;

  authError=''
  addProductMessage = '';
  constructor(private product:ProductService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    // this.id = this.route.snapshot.paramMap.get('id');
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if(this.id!=0){
        this.product.getProduct(this.id).subscribe((res)=>{
          this.product_details=res;
        });
      }
      else{
        this.empty_form();
      }
      console.log(typeof(this.id));
  });
  }

  validate(){
    let isNotEmpty = Object.values(this.product_details).every(x => x != null && x != '');
    if(isNotEmpty){
      let price_pattern = /^\d+(,\d{3})*(\.\d{1,2})?$/;
      if(this.product_details.price.match(price_pattern)){
        // console.log("hi");
        return true;
      }
      else{
        this.authError="Only numbers are allowed in the Price field";
      }
    }
    else{
      this.authError="Please fill all mandatory fields";
    }
    return false;
  }

  add_product(){
    if(this.validate()){
      this.authError='';
      this.product.addProduct(this.product_details).subscribe((res)=>{
        if(res){
          this.addProductMessage="Product is successfully added";
          setTimeout(()=>{
            this.addProductMessage='';
          },3000);
          this.empty_form();
        }
        else{
          alert("An Error has been occured. Please try again");
        }
      });
      
    }
  }

  update_product(){
    if(this.validate()){
      this.authError='';
      this.product.updateProduct(this.product_details).subscribe((res)=>{
        if(res){
          this.router.navigate(['/seller-home']);
        }
        else{
          alert("An Error has been occured. Please try again");
        }
      });
    }
  }

  empty_form(){
    this.product_details={
      name:'',
      price:'',
      color:'',
      category:'',
      description:'',
      image_url:''
    }
  }
}
