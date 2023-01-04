import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private ProductService: ProductService
  ) { }
  
  searchResult : undefined | Product[]
  ngOnInit(): void {
    let query = this.route.snapshot.paramMap.get('query');
    this.route.params.subscribe(params => {
      let query = params['query'];
      query && this.ProductService.searchProducts(query).subscribe((res)=>{
        this.searchResult=res;
      })
  });
  }

}
