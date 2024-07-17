import { Component, OnInit } from '@angular/core';
import { StarShipService } from '../service/star-ship.service';
import { Observable } from 'rxjs';
import { StarShipResults, StarShip } from './../interfaces/starShip';
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

  starShipResults$: Observable<StarShipResults> | undefined;
  nextPage: number = 1;
  starShips: any[] = [];
  totalPages: number = 1;

  constructor(private service: StarShipService) {}

  ngOnInit(): void {
    this.loadStarShips();
  }

  loadStarShips(): void {
    this.starShipResults$ = this.service.getStarShipList(this.nextPage);
    this.starShipResults$.subscribe({
      next: (data: StarShipResults) => {
        this.totalPages = Math.ceil(data.count / 10);
        this.starShips = data.results;
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      }
    });
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

