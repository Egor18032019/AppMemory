import Cards from "./Cards.jsx";
import { DataContext } from "./DataReducer"
import React, { useContext } from 'react';
import Container from '@material-ui/core/Container';

const LinesForCards = () => {
    const { state, dispatch } = useContext(DataContext);

    const { cards, startGame, secondcard } = state;
    return (
        <Container maxWidth="lg">
            {cards.map(
                (iterator) => {
                    return (
                        <Cards
                            cardsForLine={iterator}
                            secondcard={secondcard}
                            dispatch={dispatch}
                            startGame={startGame}
                            key={Date.now() + iterator[0].type + Math.random()}
                        />
                    );
                })}
        </Container>

    )

}

export default LinesForCards;