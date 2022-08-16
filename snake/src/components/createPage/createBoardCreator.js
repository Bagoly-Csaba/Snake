export default (row, col) => {
    let board = [];
    let bottom = [];
    let right = [];
   //üres board kreálás
    for (let x = 0; x < row; x++) {
      let subCol = [];
      for (let y = 0; y < col; y++) {
        subCol.push({
          value: 0,
          active: false,
          x: x,
          y: y,
          
        });
      }
      board.push(subCol);
    }
    for (let y = 0; y < row; y++) {
      right.push({
        value: 0,
        index: y,
      });
  }
  for (let y = 0; y < col; y++) {
    bottom.push({
      value: 0,
      index: y,
    });
}
  

    return { board ,bottom ,right };
  };
  