import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { Observable } from 'rxjs'; 

@Component({
  selector: 'app-simulator-board',
  templateUrl: './simulator-board.component.html',
  styleUrls: ['./simulator-board.component.scss']
})
export class SimulatorBoardComponent implements OnInit {

  numberOfRows: number =10;
  numberOfCols: number = 10;
  numberOfObstruction: number = 10;
  inletChoosen = -1;
  selectedCell : any = {
    x: -1, 
    y: -1,
  };
  disableSimulateButton: boolean = true;
  showResetButton: boolean = false;
  previousSelectedCell : any = {
    x: -1, 
    y: -1,
  };
  water : number = -1;
  grid: any = [];
  blocks: any = [];
  inlets: any = [];

  constructor(private router:Router, private commonService: CommonService) { 

    this.getGridData();
  }

  getGridData(){
    this.commonService.gridInformation$.subscribe( data =>{
      this.numberOfRows = data.no_of_rows;
      this.numberOfCols = data.no_of_cols;
      this.numberOfObstruction = data.no_of_blocks;
      
      for(let x=0; x<this.numberOfRows;x++){
        this.grid.push(Array(this.numberOfCols).fill(0));
      }
  
      this.blocks = Array(this.numberOfObstruction).fill(0);
      this.inlets = Array(this.numberOfCols).fill(0);
    });
  }
  ngOnInit(): void {
  }


  initGrid(){
    for(let x=0; x<this.numberOfRows;x++){
      this.grid.push(Array(this.numberOfCols).fill(0));
    }

    this.blocks = Array(this.numberOfObstruction).fill(0);
    this.inlets = Array(this.numberOfCols).fill(0);
  } 

  dragStart(event:any){

  }

  droppedBlock(event:any){

  }

  dragEnd(event:any){
    if(this.grid[this.selectedCell.x][this.selectedCell.y] !=1){
      this.grid[this.selectedCell.x][this.selectedCell.y] = 1;
      if(this.inletChoosen!=-1){
        this.disableSimulateButton = false;
      }
      this.showResetButton = true;
      this.blocks.pop();
    }
  }

  dragEnter(event:any){
    let id = event.srcElement.id;
    this.previousSelectedCell.x = this.selectedCell.x;
    this.previousSelectedCell.y = this.selectedCell.y;
    this.selectedCell.x = id.split('_')[0];
    this.selectedCell.y = id.split('_')[1];
  }
  selectGrid(event:any){
    console.log(event);
  }
  goBack(){
    this.router.navigateByUrl('/create');
  }

  startWater(id:number){

    this.inletChoosen = id;
    if(this.selectedCell.x!=-1 && this.selectedCell.y!=-1){
      this.disableSimulateButton = false;
    }
    for(let x=0; x<this.inlets.length; x++){
      if(x!=id){
        this.inlets[x] = 0;
      }else {
        this.inlets[x] = -1;
      }
    }
  }
  
  startSimulation(){
    this.disableSimulateButton = true;
    let waterSimulatedResult = this.createCopy(this.grid);
    waterSimulatedResult = this.simulateWaterFlow(waterSimulatedResult, this.inletChoosen);
    let floor = 0;
    let incrementEveryHalfSecond = setInterval(() =>{
      this.fillRows(this.grid, waterSimulatedResult, floor);
      if(++floor == waterSimulatedResult.length) clearInterval(incrementEveryHalfSecond);
    }, 200);
  }

  fillRows( grid:any, source:any, index: number){
    for(let y=0; y<source[index].length; y++){
      grid[index][y] = source[index][y];
    }
  }

  createCopy(source:any){
    let destination = [];
    for(let x=0; x<source.length; x++){
      let items = [];
      for(let y=0; y<source[x].length;y++){
        items.push(source[x][y]);
      }
      destination.push(items);
    }
    return destination;
  }

  reset(){
    this.grid = [];
    this.blocks = [];
    this.inlets = [];
    this.inletChoosen = -1;
    this.showResetButton = false;
    for(let x=0; x<this.numberOfRows;x++){
      this.grid.push(Array(this.numberOfCols).fill(0));
    }
    this.selectedCell.x = -1;
    this.selectedCell.y = -1;
    this.disableSimulateButton = true;
    this.blocks = Array(this.numberOfObstruction).fill(0);
    this.inlets = Array(this.numberOfCols).fill(0);
  }

  simulateWaterFlow(A: any, B:number){
    if(A[0][B] != 1){
      A[0][B] = this.water;
    }else {
      return A;
    }
  
  
  for(let y=1; y<A[0].length; y++){
    if(A[0][y]!=1){
      if(A[0][y-1] == this.water && A[1][y-1] == 1){
        A[0][y] = this.water;
      }
    }
  }
  
  for(let y=A[0].length-2; y>=0; y--){
    if(A[0][y]!=1){
      if(A[0][y+1]== this.water && A[1][y+1] == 1){
        A[0][y] = this.water;
      }
    }
  }
  
    // fill left side flow
    for(let x=1; x<A.length; x++){
      for(let y=1; y<A[0].length; y++){
        // if is not blocked
        if(A[x][y]!=1 ){
          if(A[x-1][y] == this.water){
            A[x][y] = this.water;
          }
          else {
            if(x<A.length-1){
              if(A[x][y-1] == this.water && A[x+1][y-1] == 1){
                A[x][y] = this.water;
              }
            }
          }
  
        }
      }
    }
  
    // fill right side flow
    for(let x=1; x<A.length; x++){
      for(let y=A[0].length-2; y>=0; y--){
        // if is not blocked
        if(A[x][y]!=1){
          if(A[x-1][y] == this.water){
            A[x][y]= this.water;
          }
          else {
            if(x<A.length-1){
              if(A[x][y+1]== this.water && A[x+1][y+1] == 1){
                A[x][y] = this.water;
              }
            }
          }
        }
      }
    }
  
    for(let x=1; x<A.length; x++){
      for(let y=1; y<A[0].length; y++){
        // if is not blocked
        if(A[x][y]!=1 ){
          if(A[x-1][y] == this.water){
            A[x][y] = this.water;
          }
          else {
            if(x<A.length-1){
              if(A[x][y-1] == this.water && A[x+1][y-1] == 1){
                A[x][y] = this.water;
              }
            }
          }
  
        }
      }
    }
  
    return A;
  }

}
