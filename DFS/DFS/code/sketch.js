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

let path = new Array();

function setup() {
  frameRate(5);
  grid = create2DArray(rows, cols);

  grid[rows-2][cols-2]=3; // START POINT


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

function pathAvailable(i, j){
  let good = false;
  if(grid[i][j-1]==0){
    good = true;
  }
  else if(grid[i+1][j]==0){
    good = true;
  }
  else if(grid[i][j+1]==0){
    good = true;
  }
  else if(grid[i-1][j]==0){
    good = true;
  }
  return good;
}

function draw() {
  background(255);
  let cpt = 0;
  for(let i = 0;i<rows;i++){
    for(let j = 0;j<cols;j++){
      
      if(grid[i][j]==1){
        fill("black");
        rect(i*res, j*res, res, res);
      }
      else if(grid[i][j]==0){
        cpt++;
        fill("white");
        rect(i*res, j*res, res, res);
      }
      else if(grid[i][j]==2){
        fill("blue");
        rect(i*res, j*res, res, res);
      }
      else if(grid[i][j]==3){
        fill("red");
        rect(i*res, j*res, res, res);
      }
    }
  }
  if(cpt==0){
    return;
  }
  next = copyTab(grid);

  for(let i = 0;i<rows;i++){
    for(let j = 0;j<cols;j++){
      if(grid[i][j]==3 && pathAvailable(i, j)){
        next[i][j]=2;
        if(grid[i][j-1]==0){
          next[i][j-1]=3;
          path.push(1);
        }
        else if(grid[i+1][j]==0){
          next[i+1][j]=3;
          path.push(2);
        }
        else if(grid[i][j+1]==0){
          next[i][j+1]=3; 
          path.push(3);
        }
        else if(grid[i-1][j]==0){
          next[i-1][j]=3;
          path.push(4);
        }
      }
      else if (grid[i][j]==3){
        let direction = path.pop();
        if(direction==1){
          next[i][j+1]=3;
          next[i][j]=2;
        }
        else if(direction==2){
          next[i-1][j]=3;
          next[i][j]=2;
        }
        else if(direction==3){
          next[i][j-1]=3;
          next[i][j]=2;
        }
        else if(direction==4){
          next[i+1][j]=3;
          next[i][j]=2;
        }
      }
    }
  }
  document.getElementById("pile").innerHTML = path;
  grid = copyTab(next);
} 