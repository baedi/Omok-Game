import Token from 'classes/Token'

function CrossSquare(props){
    return(
        <button className={props.value === Token.black() ? 'cross_square1' : 'cross_square2' } onClick={props.onClick}>
            {props.value === Token.black() ? '●' : props.value === Token.white() ? '○' : ''}
        </button>
    );
}

export default CrossSquare