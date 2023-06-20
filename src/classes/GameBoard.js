import React from 'react'
import CrossSquare from 'classes/CrossSquare'
import Token from 'classes/Token'
import RenjuRule from "classes/RenjuRule";

class GameBoard extends React.Component{
    constructor(props) {
        super(props);

        let arr = Array.from({length: 15}, () => []);
        for(let i=0; i<arr.length; i++){
            for(let j=0; j<arr.length; j++){
                arr[i].push(Token.empty())
            }
        }

        this.state = {
            crossSquares: arr,
            isBlackTurn: true,
            isEndGame: false
        }
    }
    checkField(row, col){
        let maxConnTokenCnt;
        const crossSquares = this.state.crossSquares.slice();
        let isBlackTurn = this.state.isBlackTurn;
        let isEndGame = this.state.isEndGame;

        if(isEndGame)
            return;

        if(crossSquares[row][col] !== Token.empty()){
            alert("This Square has already token.")
            return;
        }

        maxConnTokenCnt = RenjuRule.maxConnectToken(isBlackTurn, crossSquares, row, col)
        if((!isBlackTurn && maxConnTokenCnt >= 5) || (isBlackTurn && maxConnTokenCnt === 5)){
            alert((isBlackTurn ? "Black" : "White") + " Win!");
            isEndGame = true;
        }

        // Renju Rule process (Over token, 3-3, 4-4)
        if(isBlackTurn){
            if(isBlackTurn && maxConnTokenCnt > 5){
                alert("Black tokens cannot make more than six consecutive tokens.");
                return;
            }

            if(RenjuRule.isDoubleOpenThree(crossSquares, row, col)){
                alert("Black tokens cannot make open three continuously.");
                return;
            }

            if(RenjuRule.isDoubleOpenFour(crossSquares, row, col)){
                alert("Black tokens cannot make open four continuously.");
                return;
            }
        }

        crossSquares[row][col] = isBlackTurn ? Token.black() : Token.white();

        this.setState({
            crossSquares: crossSquares,
            isBlackTurn: !isBlackTurn,
            isEndGame: isEndGame,
        });
    }

    makeColGameBoard(colArr, row){
        const handleObj = this;
        return(
            <div className='game_board_row'>{
                colArr.map(function(obj, col){
                    return(
                        <CrossSquare value={obj} onClick={() => {handleObj.checkField(row, col)}} key={row + "r" + col + "c"}/>
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