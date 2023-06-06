import React from 'react'
import CrossSquare from 'classes/CrossSquare'

class GameBoard extends React.Component{
    constructor(props) {
        super(props);

        let arr = Array.from({length: 15}, () => []);
        for(let i=0; i<arr.length; i++){
            for(let j=0; j<arr.length; j++){
                arr[i].push('○')
            }
        }

        this.state = {
            //crossSquares: Array(15).fill(Array(15).fill(null)),
            crossSquares: arr
        }
    }
    handleClick(row, col){
        const crossSquares = this.state.crossSquares.slice();
        crossSquares[row][col] = '●';
        this.setState({crossSquares: crossSquares});
    }

    makeColGameBoard(colArr, row){
        const handleObj = this;
        return(
            colArr.map(function(obj, col){
                return(
                    <CrossSquare
                        value={obj}
                        onClick={() => {handleObj.handleClick(row, col)}}
                        key={row + "r" + col + "c"}
                    />
                )
            })
        );
    }

    makeRowGameBoard(){
        const handleObj = this;
        return(
            <div className='board-game_r'>
                {
                    this.state.crossSquares.map(function(obj, idx){
                        return handleObj.makeColGameBoard(obj, idx);
                    })
                }
            </div>
        )
    }

    render(){
        return (
            <div>{this.makeRowGameBoard()}</div>
        );
    }
}

export default GameBoard