import React from 'react'
import GameBoard from 'classes/GameBoard'
import Token from 'classes/Token'
import RenjuRule from "./RenjuRule";

class GameSystem extends React.Component{

    constructor(props){
        super(props);

        let arr = Array.from({length:15}, () => []);
        for(let i=0; i<arr.length; i++)
            for(let j=0; j<arr.length; j++)
                arr[i].push(Token.empty());

        this.state = {
            crossSquares: arr,
            isBlackTurn: true,
            isEndGame: false,
            currTurnIdx: 0,
            saveTurn: [],
        }
    }

    checkField(row, col){

        let maxConnTokenCnt;
        const crossSquares = this.state.crossSquares.slice();
        let isBlackTurn = this.state.isBlackTurn;
        let isEndGame = this.state.isEndGame;

        let currTurnIdx = this.state.currTurnIdx;
        let saveTurn = this.state.saveTurn;

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
        else{
            // Renju Rule process (Over token, 3-3, 4-4)
            if(isBlackTurn){
                if(isBlackTurn && maxConnTokenCnt > 5){
                    alert("Black tokens cannot make more than six consecutive tokens.");
                    return;
                }

                if(RenjuRule.is3_3(crossSquares, row, col)){
                    alert("Black tokens cannot make open three continuously.");
                    return;
                }

                if(RenjuRule.is4_4(crossSquares, row, col)){
                    alert("Black tokens cannot make open four continuously.");
                    return;
                }
            }
        }


        for(let i=saveTurn.length-1; i>=currTurnIdx; i--){
            saveTurn.pop();
        }
        saveTurn.push(JSON.parse(JSON.stringify(crossSquares)));
        crossSquares[row][col] = isBlackTurn ? Token.black() : Token.white();



        this.setState({
            crossSquares: crossSquares,
            isBlackTurn: !isBlackTurn,
            isEndGame: isEndGame,
            currTurnIdx: saveTurn.length,
            saveTurn: saveTurn,
        });
    }

    makeLoadGameButton(){
        const handleObj = this;
        return(
          this.state.saveTurn.map(function(obj, idx) {
              return (
                  <button onClick={() => handleObj.loadGame(idx)}>save {idx}</button>
              );
          })
        );
    }

    loadGame(idx){
        this.setState({
            crossSquares: this.state.saveTurn[idx],
            isBlackTurn: idx % 2 === 0,
            isEndGame: false,
            currTurnIdx: idx
        })
    }

    render(){
        console.log(this.state.saveTurn);

        return(
            <div className='game_system'>
                <GameBoard
                    crossSquares={this.state.crossSquares}
                    isBlackTurn={this.state.isBlackTurn}
                    onClick={(r, c) => this.checkField(r, c)}
                />
                <div>Omok Game (Renju-rule) Test Version!</div>
                <div>Coming Soon...</div>
                {this.makeLoadGameButton()}
            </div>
        )
    }

}

export default GameSystem;