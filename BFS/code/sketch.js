function create2DArray(rows, cols){
  let arr = new Array(rows);
  for(let i = 0;i<rows;i++){
    arr[i] = new Array(cols);
  }
  for(let i = 0;i<rows;i++){
    for(let j = 0;j<cols;j++){
      if(i==0 || i == rows-1 || j==0 || j == rows-1){
        arr[i][j]=1;
      }
      else{
        arr[i][j]=0;
      }
    }
  } 
 
  return arr;
}

function createEmpty2DArray(rows, cols){
  let arr = new Array(rows);
  for(let i = 0;i<rows;i++){
    arr[i] = new Array(cols);
  }
  return arr;
}

let grid, next;
let rows = 10;
let cols = 10;
let res = 40;

function setup() {
  frameRate(2);
  grid = create2DArray(rows, cols);

  grid[rows-2][cols-2]=2; // START POINT


  // OBSTACLES
  grid[rows/2][cols/2]=1; 
  grid[rows/2+1][cols/2]=1;
  grid[rows/2-1][cols/2]=1;
  grid[rows/2-1][cols/2+1]=1;
  grid[rows/2-1][cols/2+2]=1;
  grid[rows/2-1][cols/2-2]=1;
  grid[rows/2-1][cols/2-1]=1;

  grid[2][7] = 1
  grid[2][6] = 1
  grid[2][5] = 1
  grid[2][4] = 1
  grid[2][3] = 1
  grid[2][2] = 1
  grid[2][1] = 1

  grid[6][2] = 1
  grid[7][2] = 1
  grid[8][2] = 1

  grid[6][7] = 1
  grid[6][8] = 1
  createCanvas(res*rows, res*cols); 

}

function copyTab(arr){
  let next = createEmpty2DArray(rows, cols);
  for(let i = 0 ; i<rows; i++){
    for(let j = 0 ; j<cols; j++){
      next[i][j]=arr[i][j];
    }
  }
  return next;
}

function draw() {
  
  background(255);
  for(let i = 0;i<rows;i++){
    for(let j = 0;j<cols;j++){
      if(grid[i][j]==1){
        fill("black");
        rect(i*res, j*res, res, res);
      }
      else if(grid[i][j]==0){
        fill("white");
        rect(i*res, j*res, res, res);
      }
      else if(grid[i][j]==2){
        fill("blue");
        rect(i*res, j*res, res, res);
      }
    }
  }

  next = copyTab(grid);

  for(let i = 0;i<rows;i++){
    for(let j = 0;j<cols;j++){
      if(grid[i][j]==2){
        if(grid[i][j-1]==0)
          next[i][j-1]=2;
        if(grid[i][j+1]==0)
          next[i][j+1]=2;
        if(grid[i-1][j]==0)
          next[i-1][j]=2; 
        if(grid[i+1][j]==0)
          next[i+1][j]=2;
      }
    }
  }
  
  grid = copyTab(next);
} 