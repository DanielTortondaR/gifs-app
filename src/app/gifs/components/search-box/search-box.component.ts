import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input
      type="text"
      class="form-control"
      placeholder="Buscar gifs..."
      (keyup.enter)="searchTag()"
      #txtTagInput
    >
  `,
})

export class SearchBoxComponent {

  //Inyectamos el servicio
  constructor( private gifsService: GifsService) {};


  @ViewChild('txtTagInput') //Para acceder a un elemento usando su referencia
  public tagInput!: ElementRef<HTMLInputElement>;


  searchTag( ): void {

    this.gifsService.searchTag( this.tagInput.nativeElement.value );

    this.tagInput.nativeElement.value = '';
  }


}
