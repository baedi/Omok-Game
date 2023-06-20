import Token from 'classes/Token'

function CrossSquare(props){
    return(
        <button className='cross_square' onClick={props.onClick}>
            {props.value === Token.black() ? '●' : props.value === Token.white() ? '○' : ''}
        </button>
    );
}

export default CrossSquare