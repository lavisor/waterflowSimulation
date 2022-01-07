import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public gridInformationSource = new BehaviorSubject<any>({ 'no_of_rows': 5, 'no_of_cols': 5, 'no_of_blocks': 5});
  gridInformation$ = this.gridInformationSource.asObservable();
  constructor() { }

  updateGridDimentions(row:number, cols:number, block:number){
    this.gridInformationSource.next( { 'no_of_rows': row, 'no_of_cols': cols, 'no_of_blocks': block});
    console.log("updated value");
  }

}
