import { Component, OnInit } from '@angular/core';
import {SearchService} from "../../services/search.service";
import {Router} from "@angular/router";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public searchInput: string = '';

  constructor(private searchService: SearchService, private router: Router) { }

  search() {
    if (!this.searchInput) return;
    this.searchService.setSearch(this.searchInput);
    this.router.navigate(['/catalog']);
  }

  clear() {
    this.searchInput = '';
    this.searchService.clearSearch();
  }
}
