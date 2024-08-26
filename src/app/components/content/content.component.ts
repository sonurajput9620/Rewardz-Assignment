import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { data } from './data';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

type Product = {
  "pk": number,
  "name": string,
  "points": number,
  "display_img_url": string,
  "quantity": number,
  "valid_until": string,
  "low_quantity": number,
}


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  public serach = new FormControl('');


  constructor(private offcanvasService: NgbOffcanvas) { }

  public categoryArray: string[] = ['e-Voucher', 'Products', 'Evergreen', 'Fashion & Retail'];
  private productArray: Product[] = [...data]
  public filterData: Product[] = data

  ngOnInit(): void {
    this.serach.valueChanges.pipe((debounceTime(500), distinctUntilChanged())).subscribe({
      next: (value) => {
        if (value !== null)
          this.filterData = this.productArray
            .filter((item) => item.name.toLowerCase().includes(value.toLowerCase()))
      }
    })
  }

  public openEnd(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end' });
  }

  public sortItems(criteria: string) {
    if (criteria === 'A-Z') {
      this.filterData.sort((a, b) => a.name.localeCompare(b.name));
    } else if (criteria === 'Z-A') {
      this.filterData.sort((a, b) => b.name.localeCompare(a.name));
    }
  }

  public resetFilters() {
    this.filterData = [...this.productArray];
    this.serach.patchValue('');
  }

}
