import { Component, OnInit } from '@angular/core';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {

  constructor(private product: ProductService) { }
  productList: Product[]=[];
  columns=['S.No','Image','Name','Price','Color','Category','Description','Action'];
  productMessage = '';
  delete_icon=faTrash;
  edit_icon=faEdit;
  ngOnInit(): void {
    this.getProductList();
  }

  getProductList(){
    this.product.ProductList().subscribe((res)=>{
      console.log(res);
      this.productList=res;
    })
  }

  delete_product(id: any){
    this.product.deleteProduct(id).subscribe((res)=>{
      if(res){
        this.productMessage="Product is deleted";
        this.getProductList();
        setTimeout(()=>{
          this.productMessage='';
        },3000);
      }
    })
  }

}
