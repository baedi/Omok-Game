import React from 'react'
import GameBoard from 'classes/GameBoard'

class GameSystem extends React.Component{

    render(){
        return(
            <div className='game_system'>
                <GameBoard/>
            </div>

        )
    }

}

export default GameSystem;