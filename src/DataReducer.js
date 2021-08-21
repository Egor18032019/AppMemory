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
                console.log(state.firstcard.id + " " + idForCards.id)
                if (state.firstcard.id === idForCards.id) {
                    findIndexInArrayForOpenForClose(foo,idForCards)
                    console.log("карты равны")
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
            console.log("FINDTWOCARD")
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
            console.log("TWOCARDOPEN")

            let idForTwoCards = action.payload;
            if (idForTwoCards != null) {
                console.log(" TWOCARDOPEN if ")

                let DataRewriteArray = [...state.cards];
                console.log(state.firstcard + " " + state.secondcard)

                let idForClose = [state.firstcard.id, state.secondcard.id]
                console.log(DataRewriteArray)

                let rewriteArrayData = findIndexInArrayForOpenTwoCard(DataRewriteArray, idForClose);
                return Object.assign({}, state, {
                    firstcard: null,
                    secondcard: null,
                    cards: rewriteArrayData
                });
            }

            return state;
        case STARTGAME:
            console.log("STARTGAME")
            const response = onLoadForServer(dataMock);
            const cardsOnLines = getArrayForLines(response)
            return Object.assign({}, state, {
                startGame: true,
                endGame: false,
                endGameAndSeeResult: false,
                cards: cardsOnLines,
            });
        case WRITERESULT:
            console.log("WRITERESULT ")
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