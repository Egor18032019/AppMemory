import React from "react";
import {
    onLoadForServer
} from "./backend.js"
import dataMock from "./data/dataMock.json"
import {
    OPENCARD,
    FINDTWOCARD,
    TWOCARDOPEN,
    STARTGAME,
    WRITERESULT
} from "./CONST"
import {
    getArrayForLines,
    findIndexInArray,
    findIndexInArrayForOpen,
    findIndexInArrayForOpenTwoCard,
    getWin,
    findIndexInArrayForOpenForClose

} from "./utils.js";



const DataContext = React.createContext("cards");
const initialState = {
    cards: [],
    firstcard: null,
    secondcard: null,
    startGame: false,
    endGame: false,
    result: [],
    endGameAndSeeResult: false
};



const dataReducer = (state, action) => {
    switch (action.type) {
        case OPENCARD:
            let idForCards = action.payload;
            let foo = [...state.cards];
         // точно открываем
            findIndexInArrayForOpen(foo, idForCards)
            if (state.firstcard != null) {
                if (state.firstcard.id === idForCards.id) {
                    findIndexInArrayForOpenForClose(foo,idForCards)
                    return Object.assign({}, state, {
                        firstcard: null,
                        cards: foo
                    })
                }

                return Object.assign({}, state, {
                    secondcard: idForCards
                })
            }
            return Object.assign({}, state, {
                firstcard: idForCards,
                cards: foo
            })
        case FINDTWOCARD:
            let stateDataRewriteArray = [...state.cards];
            let idForDelete = [state.firstcard.id, state.secondcard.id]
            let rewriteArray = findIndexInArray(stateDataRewriteArray, idForDelete);
            if (getWin(rewriteArray)) {
                return Object.assign({}, state, {
                    firstcard: null,
                    secondcard: null,
                    endGame: true
                });
            }

            return Object.assign({}, state, {
                firstcard: null,
                secondcard: null,
                cards: rewriteArray
            });
        case TWOCARDOPEN:

        
            let idForTwoCards = action.payload;
            if (idForTwoCards != null) {

                let DataRewriteArray = [...state.cards];

                let idForClose = [state.firstcard.id, state.secondcard.id]

                let rewriteArrayData = findIndexInArrayForOpenTwoCard(DataRewriteArray, idForClose);
                return Object.assign({}, state, {
                    firstcard: null,
                    secondcard: null,
                    cards: rewriteArrayData
                });
            }

            return state;
        case STARTGAME:
            const response = onLoadForServer(dataMock);
            const cardsOnLines = getArrayForLines(response)
            return Object.assign({}, state, {
                startGame: true,
                endGame: false,
                endGameAndSeeResult: false,
                cards: cardsOnLines,
            });
        case WRITERESULT:
            const timeForFindAllCards = action.payload;
            const oldResult = [].concat(state.result)
            let newResult;
            if (!oldResult.includes(timeForFindAllCards)) {
                newResult = oldResult.concat(timeForFindAllCards).sort()
            } else {
                newResult = oldResult
            }
            return Object.assign({}, state, {
                result: newResult,
                endGameAndSeeResult: true
            });
        default:
            return state
    };

}

export {
    dataReducer,
    initialState,
    DataContext
};