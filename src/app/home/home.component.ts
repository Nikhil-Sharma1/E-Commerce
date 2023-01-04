import { Component, OnInit } from '@angular/core';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private product:ProductService) { }
  popularProducts:undefined | Product[];
  trendyProducts: undefined |Product[];
  ngOnInit(): void {
    this.product.popularProducts().subscribe((res)=>{
      this.popularProducts=res;
    });
    this.product.trendyProducts().subscribe((res)=>{
      this.trendyProducts=res;
    })
  }

}
