export default (row, col, parts, stones, numbersRight, numbersBottom) => {
    let board = [];

   //üres board kreálás
    for (let x = 0; x < col; x++) {
      let subCol = [];
      for (let y = 0; y < row; y++) {
        subCol.push({
          value: 0,
          active: false,
          x: x,
          y: y,
          
        });
      }
      board.push(subCol);
    }
  //testrészek hozzá adása farok-fej-test
  let partsArr = parts.split(',').map(Number);

  board[partsArr[0]][partsArr[1]].value = 1;
  board[partsArr[2]][partsArr[3]].value = 3;
  board[partsArr[4]][partsArr[5]].value = 4;
  //kövek hozzá adása
  let stonesArr = stones.split(',').map(Number);
  for (let i=0; i < stonesArr.length; i++)
    {
      if(i % 2 != 0){
      board[stonesArr[i-1]][stonesArr[i]].value = 2; 
      }
    }
  //oldalsó,alsó számok fel botása
  let right = numbersRight.split(',').map(Number);
  let bottom = numbersBottom.split(',').map(Number);

    return { board, right, bottom };
  };
  