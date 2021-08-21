import Button from '@material-ui/core/Button';
import {
    STARTGAME
} from "./CONST"
const Tabel = (props) => {
    const { dispatch, result } = props;
    const startGameMemmory = () => {
        console.log("startGame")
        dispatch({
            type: STARTGAME,
        })
    }
    return (
        <section>
            <h2>Вы нашли все карты !!</h2>
            <ol>
                Результаты в порядке убывания:
                {result.map(
                    (iterator) => {
                        return (
                            <li> за {iterator} секунд</li>
                        )
                    })}
            </ol>
            <Button fullWidth={true}
                variant="contained"
                onClick={startGameMemmory}
                size="large"
                color="primary">Начать игру
            </Button>
        </section>
    )
}

export default Tabel