import Token from 'classes/Token'
import 'css/token.css'

function CrossSquare(props){
    return(
        <button className="cross_square" onClick={props.onClick}>
            <div
                className={getDivClassName(props)}
                id={getDivId(props)}
            />
        </button>
    );
}

function getDivClassName(props){

    let isBlack = props.value === Token.black();
    let isWhite = props.value === Token.white();
    let maxIDX = props.maxBoardSize - 1;

    if(props.row === 0 && props.col === 0)
        return isBlack ? 'c_square_corner1_black' : isWhite ? 'c_square_corner1_white' : 'c_square_corner1_empty';

    else if(props.row === 0 && props.col === maxIDX)
        return isBlack ? 'c_square_corner2_black' : isWhite ? 'c_square_corner2_white' : 'c_square_corner2_empty';

    else if(props.row === maxIDX && props.col === 0)
        return isBlack ? 'c_square_corner3_black' : isWhite ? 'c_square_corner3_white' : 'c_square_corner3_empty';

    else if(props.row === maxIDX && props.col === maxIDX)
        return isBlack ? 'c_square_corner4_black' : isWhite ? 'c_square_corner4_white' : 'c_square_corner4_empty';

    else if(props.row === 0)
        return isBlack ? 'c_square_top_black' : isWhite ? 'c_square_top_white' : 'c_square_top_empty';

    else if(props.row === maxIDX)
        return isBlack ? 'c_square_bottom_black' : isWhite ? 'c_square_bottom_white' : 'c_square_bottom_empty';

    else if(props.col === 0)
        return isBlack ? 'c_square_left_black' : isWhite ? 'c_square_left_white' : 'c_square_left_empty';

    else if(props.col === maxIDX)
        return isBlack ? 'c_square_right_black' : isWhite ? 'c_square_right_white' : 'c_square_right_empty';

    return isBlack ? 'c_square_black' : isWhite ? 'c_square_white' : 'c_square_empty'
}

function getDivId(props){

    let isBlack = props.value === Token.black();
    let isWhite = props.value === Token.white();
    let isBlackTurn = props.turn;
    let maxIDX = props.maxBoardSize - 1;

    if(isBlack || isWhite)
        return 'c_square_already'

    if(props.row === 0 && props.col === 0)
        return isBlackTurn ? 'c_square_corner1_next_black' : 'c_square_corner1_next_white';

    else if(props.row === 0 && props.col === maxIDX)
        return isBlackTurn ? 'c_square_corner2_next_black' : 'c_square_corner2_next_white';

    else if(props.row === maxIDX && props.col === 0)
        return isBlackTurn ? 'c_square_corner3_next_black' : 'c_square_corner3_next_white';

    else if(props.row === maxIDX && props.col === maxIDX)
        return isBlackTurn ? 'c_square_corner4_next_black' : 'c_square_corner4_next_white';

    else if(props.row === 0)
        return isBlackTurn ? 'c_square_top_next_black' : 'c_square_top_next_white';

    else if(props.row === maxIDX)
        return isBlackTurn ? 'c_square_bottom_next_black' : 'c_square_bottom_next_white';

    else if(props.col === 0)
        return isBlackTurn ? 'c_square_left_next_black' : 'c_square_left_next_white';

    else if(props.col === maxIDX)
        return isBlackTurn ? 'c_square_right_next_black' : 'c_square_right_next_white';

    return isBlackTurn ? 'c_square_next_black' : 'c_square_next_white';

}

export default CrossSquare