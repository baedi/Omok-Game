import React from 'react'
import CrossSquare from 'classes/CrossSquare'

class GameBoard extends React.Component{
    constructor(props) {
        super(props);

        let arr = Array.from({length: 15}, () => []);
        for(let i=0; i<arr.length; i++){
            for(let j=0; j<arr.length; j++){
                arr[i].push('')
            }
        }

        this.state = {
            //crossSquares: Array(15).fill(Array(15).fill(null)),
            crossSquares: arr,
            isBlackTurn: true,
            isEndGame: false
        }
    }
    handleClick(row, col){
        const crossSquares = this.state.crossSquares.slice();
        let isBlackTurn = this.state.isBlackTurn;
        let isEndGame = this.state.isEndGame;

        if(isEndGame)
            return;

        // 이미 말이 놓여있는지 확인
        if(crossSquares[row][col] !== ''){
            alert("This Square has already token.")
            return;
        }

        // 렌주룰 적용 코드
        if(isBlackTurn && this.ruleCheck(row, col)){
            alert("")
            return;
        }

        crossSquares[row][col] = isBlackTurn ? '●' : '○';

        // 말 5개 완성 여부
        if(this.hasMakeFiveToken(isBlackTurn, crossSquares, row, col)){
            alert((isBlackTurn ? "Black" : "White") + " Win!");
            isEndGame = true;
        }

        this.setState({
            crossSquares: crossSquares,
            isBlackTurn: !isBlackTurn,
            isEndGame: isEndGame,
        });
    }

    ruleCheck(row, col){
        return false;
    }

    hasMakeFiveToken(isBlackTurn, crossSquares, row, col){

        let tokenType = isBlackTurn ? '●' : '○';
        let plusX, plusY;
        let maxLen = this.state.crossSquares.length;
        let token = [1, 0, 1, 0, 1, 0, 1, 0];
        let moveX = [1, -1, 0,  0, 1, -1,  1, -1];
        let moveY = [0,  0, 1, -1, 1, -1, -1,  1];

        for(let i=0; i<token.length; i++){
            plusX = moveX[i];
            plusY = moveY[i];
            for(let r=row+plusX, c=col+plusY; 0 <= r && r < maxLen && 0 <= c && c < maxLen; r = r + plusX, c = c + plusY){
                if(crossSquares[r][c] === tokenType)
                    token[i]++;
                else
                    break;
            }

            if(i % 2 === 1 && token[i-1] + token[i] >= 5)
                return true;

        }
        //console.log(token)

        return false;
    }


    makeColGameBoard(colArr, row){
        const handleObj = this;
        return(
            <div className='game_board_row'>{
                colArr.map(function(obj, col){
                    return(
                        <CrossSquare
                            value={obj}
                            onClick={() => {handleObj.handleClick(row, col)}}
                            key={row + "r" + col + "c"}
                        />
                    )
                })
            }
            </div>
        );
    }

    makeRowGameBoard(){
        const handleObj = this;
        return(
            this.state.crossSquares.map(function(obj, idx){
                return handleObj.makeColGameBoard(obj, idx);
            })
        )
    }

    render(){
        return (
            <div className='game_board'>
                {this.makeRowGameBoard()}
            </div>
        );
    }
}

export default GameBoard