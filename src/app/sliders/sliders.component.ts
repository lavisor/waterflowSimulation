import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.scss']
})
export class SlidersComponent implements OnInit {

  panelOpenState: boolean = false;
  noOfRows: number = 1;
  noOfColumns: number = 1;
  noOfObstructions: number = 1;

  constructor(private router:Router, private commonService: CommonService) { }

  ngOnInit(): void {
  }

  rowsChanged(event:any) {
    this.noOfRows = event.value;
  }

  columnsChanged(event:any){
    this.noOfColumns = event.value;
  }

  obstructionsChanged(event:any){
    this.noOfObstructions = event.value;
  }
  navigateToGrid(){
    this.commonService.updateGridDimentions(this.noOfRows, this.noOfColumns, this.noOfObstructions);
    this.router.navigateByUrl('/simulate');
  }
}
