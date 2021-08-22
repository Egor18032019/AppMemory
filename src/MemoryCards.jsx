import React, { useState, useReducer } from 'react';
import Button from '@material-ui/core/Button';
import Timer from "./Timer.jsx"
import Tabel from "./Tabel.jsx"
import LinesForCards from "./LinesForCards.jsx"
import {
    FINDTWOCARD, TWOCARDOPEN, STARTGAME, OPENCARD, WRITERESULT
} from "./CONST"
import { DataContext, initialState, dataReducer } from "./DataReducer"


const MemoryCards = () => {
    const LIMITFORTIMEANSWER = 5;
    const [state, dispatch] = useReducer(dataReducer, initialState);
    let [itsTwoCardOpen, setTwoCardOpen] = useState(false);
    const { startGame, endGame, endGameAndSeeResult, result } = state;
    let cardTime = state.firstcard != null

    const endTimeForAnswer = () => {
        setTwoCardOpen(true)
    }

    const startGameMemmory = () => {
        dispatch({
            type: STARTGAME,
        })
    }
    const seeResult = (time) => {
        dispatch({
            type: WRITERESULT,
            payload: time
        })
    }
    if (startGame) {
        if (itsTwoCardOpen) {
            setTwoCardOpen(false)
            if (state.secondcard != null) {
                dispatch({
                    type: TWOCARDOPEN,
                    payload: state.secondcard
                })
            }
            else {
                dispatch({
                    type: OPENCARD,
                    payload: state.firstcard
                })
            }
        }

        if (state.firstcard != null && state.secondcard != null) {

            if (state.firstcard.title === state.secondcard.title) {
                dispatch({
                    type: FINDTWOCARD,
                    payload: state.firstcard.title
                })
            } else {
                console.log("Не угадал")
            }
        }

    }

    if (endGameAndSeeResult) {
        return (
            <Tabel
                dispatch={dispatch}
                result={result}
            />)
    }
    else {
        return (
            <DataContext.Provider value={{ dispatch, state }}>
                <div>
                    {cardTime ?
                        <Timer
                            endTimeForAnswer={endTimeForAnswer}
                            limitForTime={LIMITFORTIMEANSWER}
                        />
                        : `Найдите две одинаковые карт за ${LIMITFORTIMEANSWER}секунд!`}

                    <LinesForCards />
                    <div>
                        {startGame ?
                            <div className="timer-startGame" > Сначало игры прошло:
                                <Timer
                                    seeResult={seeResult}
                                    endGame={endGame}
                                /> секунд
                            </div>
                            :
                            <Button fullWidth={true}
                                variant="contained"
                                onClick={startGameMemmory}
                                size="large"
                                color="primary">Начать игру
                            </Button>
                        }
                    </div>
                </div>
            </DataContext.Provider>
        );
    }
}

export default MemoryCards;