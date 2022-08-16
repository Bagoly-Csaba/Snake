export default (board, aiLastPos) => {   
        var megoldas; 
        var palya = JSON.parse(JSON.stringify(board));
        palya.pozicio = aiLastPos
        var rightSide = palya.right
        var BottomSide = palya.bottom
        
        function bejaro(start){
            var queue = [];
            queue.push(start);
            while (queue.length > 0){
                let currentNode = queue[0];
                if(isSolution(currentNode)){
                    megoldas = currentNode
                    return ;
                }
                let lepesek = getPossbleMoves(currentNode);
                lepesek.forEach(element => {
                    queue.push(element);
                });
                queue.shift();
                
            }
                   
            console.log(queue)
        }bejaro(palya);
       
    
        function getPossbleMoves(allas){
          let moves = []
          if(allas.pozicio[0] !== 0){
            if(allas.board[allas.pozicio[0] - 1][allas.pozicio[1]].value !== 2 ){
              let  up = JSON.parse(JSON.stringify(allas));
            up.board[allas.pozicio[0] - 1][allas.pozicio[1]].value = 1;
            up.pozicio[0] = allas.pozicio[0] - 1;
            moves.push(up);
            }
          }
          if(allas.pozicio[1] !== 0){
            if(allas.board[allas.pozicio[0]][allas.pozicio[1] - 1].value !== 2){
              let  left = JSON.parse(JSON.stringify(allas));
              left.board[allas.pozicio[0]][allas.pozicio[1] - 1].value = 1;
              left.pozicio[1] = left.pozicio[1] - 1;
              function addToList(){
                moves.push(left);
              }addToList()
              
            }
          }
          if(allas.pozicio[0] !== allas.right.length - 1){
              if(allas.board[allas.pozicio[0] + 1][allas.pozicio[1]].value !== 2 ){
                let  down = JSON.parse(JSON.stringify(allas));
                down.board[allas.pozicio[0] + 1][allas.pozicio[1]].value = 1;
                down.pozicio[0] = allas.pozicio[0] + 1;
                moves.push(down);
              }   
            }
          if(allas.pozicio[1] !== allas.bottom.length - 1){
              if(allas.board[allas.pozicio[0]][allas.pozicio[1] + 1].value !== 2){
                  let  right = JSON.parse(JSON.stringify(allas));
                  right.board[allas.pozicio[0]][allas.pozicio[1] + 1].value = 1;
                  right.pozicio[1] = allas.pozicio[1] + 1;
                  moves.push(right);
              }
          }
          return moves;  
        }
    
        function isSolution(allas){
          let rightCount = 0;
          let bottomCount = 0;
          let bodypartCount = 0;
          //oldalsó check
          allas.board.map((singleRow,index1)=>{   
            let rowCount = 0; 
              singleRow.map((singleBlock,index2)=>{
              if(singleBlock.value === 1){
                rowCount++;
              } 
              })
            if(rowCount === rightSide[index1]){
              rightCount++;
            }
          })
          //alsó check
            for(let i = 0; i < allas.bottom.length;i++){
              let colCount = 0; 
              for(let j = 0; j < allas.right.length;j++){
                if(allas.board[j][i].value === 1){
                  colCount++;
                } 
              }
              if(colCount === BottomSide[i]){
                bottomCount++;
              }
            }
          
          //testresz check
          allas.board.map((singleRow,index1)=>{   
              singleRow.map((singleBlock,index2)=>{
              if(singleBlock.value === 3){
                bodypartCount++
              } 
              if(singleBlock.value === 4){
                bodypartCount++
              } 
              })
            
          })
          if( rightCount === allas.right.length && bottomCount === allas.bottom.length && bodypartCount === 0){
            return true
          }
        }//
    
    

    return { megoldas};
  };
  