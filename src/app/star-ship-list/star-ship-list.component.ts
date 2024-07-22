import { Component, OnInit } from '@angular/core';
import { StarShipService } from '../service/star-ship.service';
import { Observable } from 'rxjs';
import { StarShipResults } from './../interfaces/starShip';
import {  map } from 'rxjs/operators';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink, RouterModule} from '@angular/router';


@Component({
  selector: 'app-star-ship-list',
  templateUrl: './star-ship-list.component.html',
  styleUrls: ['./star-ship-list.component.css'],
  standalone: true, 
  imports: [AsyncPipe,RouterLink, RouterModule, CommonModule]
})
export class StarShipListComponent implements OnInit {

  starShipResults$!: Observable<StarShipResults>;
  nextPage: number = 1;
  totalPages: number = 1;

  constructor(private service: StarShipService) {}

  ngOnInit(): void {
    this.loadStarShips();
  }

  loadStarShips(): void {
    this.starShipResults$ = this.service.getStarShipList(this.nextPage).pipe(
      map(data => {
        this.totalPages = Math.ceil(data.count / 10);
        return data;
      })
    );
  }
  


  loadNextPage(): void {
    if (this.nextPage < this.totalPages) {
      this.nextPage++;
      this.loadStarShips();
    }
  }

  loadPreviousPage(): void {
    if (this.nextPage > 1) {
      this.nextPage--;
      this.loadStarShips();
    }
  }

  isFirstPage(): boolean {
    return this.nextPage === 1;
  }

  isLastPage(): boolean {
    return this.nextPage === this.totalPages;
  }

}

