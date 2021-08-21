import { makeStyles } from '@material-ui/core/styles';
import Card from "./Card.jsx";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(14),
            height: theme.spacing(14),
        },
    },
}));

const Cards = (props) => {
    const { dispatch, cardsForLine, startGame, secondcard } = props;
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {cardsForLine.map(
                (card) => {
                    return (
                        <Card
                            dispatch={dispatch}
                            card={card}
                            startGame={startGame}
                            secondcard={secondcard}
                            key={card.id + card.type}
                        />
                    );
                })}
        </div>
    )
}
export default Cards;
