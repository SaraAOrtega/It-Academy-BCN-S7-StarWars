import { Component, Input } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { StarShip } from '../interfaces/starShip'; 
import { ActivatedRoute } from '@angular/router';
import { StarShipService } from '../service/star-ship.service';
import { Observable } from 'rxjs';
import { RouterLink, RouterModule, RouterOutlet} from '@angular/router';
import { switchMap} from 'rxjs/operators';


@Component({
  selector: 'app-star-ship-item',
  templateUrl: './star-ship-item.component.html',
  styleUrls: ['./star-ship-item.component.css'],
  standalone: true, 
  imports: [AsyncPipe, RouterModule, RouterLink, RouterOutlet]
})
export class StarShipItemComponent {
  starShip$: Observable<StarShip> | undefined;
  starship: StarShip | undefined;
  imgUrl : string = ""; 

  constructor(
    private route: ActivatedRoute,
    private starshipService: StarShipService
  ) {}


  
  ngOnInit(): void {
    this.starShip$ = this.route.params.pipe(
      switchMap(params => {
        const id: string = params['id'];
        this.imgUrl = this.starshipService.getStarshipImage(id);
        return this.starshipService.getShipById(id);
      })
    );
  }

  imageError() {
    this.imgUrl = 'https://starwars-visualguide.com/assets/img/big-placeholder.jpg';
  }
}
