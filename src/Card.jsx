import Button from '@material-ui/core/Button';
import {
    OPENCARD
} from "./CONST"
const Card = (props) => {
    const { dispatch, card, startGame, secondcard } = props;
    const clickOnCard = () => {
         if (startGame) {
            if (secondcard == null) {
                dispatch({
                    type: OPENCARD,
                    payload: {
                        id: card.id,
                        title: card.attributes.title
                    }
                })
            }
        }
    }
    let icons = (<img src={`../img/${card.attributes.title}`} alt={card.attributes.alt} width="95" height="95" />)
    let text = card.itOpen ? icons : "Переверни карту";
    if (card.itFind) {
        text = "Карта найдена!"
    }

    let variant = card.itOpen ? "contained" : "outlined"
    return (
        <Button disabled={card.itFind}
            fullWidth={true}
            variant={variant}
            onClick={clickOnCard}
            size="large">
            {text}
        </Button>
    )
}
export default Card;

