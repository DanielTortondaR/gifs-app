import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifsList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'cgl2qZN8JS6Y9BzI7ZquZvFRZkSv8iPA';
  private serviceURL: string = 'https://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient) {
    this.loadLocalStorage();
      //para cargarlo al iniciar la página
   }


  get tagsHistory() {
    return [...this._tagsHistory];  // se hace para romper la referencia
  }

  private organizeHistory(tag: string) {

    tag = tag.toLowerCase();

    if( this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag != tag)
    }
    this._tagsHistory.unshift( tag );
    this._tagsHistory = this._tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }

  searchTag ( tag: string): void {

    if(tag.length == 0) return;

    this.organizeHistory(tag);

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '12')
    .set('q', tag);

    this.http.get<SearchResponse>(`${this.serviceURL}/search?`, {params: params})
    .subscribe( resp => {
      this.gifsList = resp.data;
    });

  }
  // fetch('https://api.giphy.com/v1/gifs/search?api_key=cgl2qZN8JS6Y9BzI7ZquZvFRZkSv8iPA&q=valorant&limit=10')
  // .then( resp => resp.json() )
  // .then( data => console.log(data));

  // const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=cgl2qZN8JS6Y9BzI7ZquZvFRZkSv8iPA&q=valorant&limit=10');
  // const data = await resp.json();
  // console.log(data);
    private saveLocalStorage(): void {
      localStorage.setItem('history', JSON.stringify(this._tagsHistory) );
    }

    private loadLocalStorage(): void {

      if( ! localStorage.getItem('history') ) return;

      this._tagsHistory = JSON.parse( localStorage.getItem('history')! ) ;

      this.searchTag(this._tagsHistory[0])

    }

}
