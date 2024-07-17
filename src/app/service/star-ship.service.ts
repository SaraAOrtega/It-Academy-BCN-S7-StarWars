// star-ship.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StarShip, StarShipResults } from '../interfaces/starShip';

@Injectable({
  providedIn: 'root'
})
export class StarShipService {

  constructor(private http: HttpClient) {}

  apiUrl:string = 'https://swapi.py4e.com/api/starships/';
  apiUrlImage: string = 'https://starwars-visualguide.com/assets/img/starships/'


  getStarShipList(page: number = 1): Observable<StarShipResults> {
    const url = `${this.apiUrl}?page=${page}`;
    return this.http.get<StarShipResults>(url);
  }

  getShipById(id: string): Observable<StarShip> {
    return this.http.get<StarShip>(`${this.apiUrl}/${id}`);
  }

  getStarshipImage(id: string): string {
    return `${this.apiUrlImage}${id}.jpg`;
  }
}
