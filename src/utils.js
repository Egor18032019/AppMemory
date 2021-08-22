//функции перемешивание
const shuffle = function (arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let num = Math.floor(Math.random() * (i + 1));
        let d = arr[num];
        arr[num] = arr[i];
        arr[i] = d;
    }
    return arr;
}

/**
 *  @param {array} defaultCardArray массив с данным в ед-ном числе
 * @returns {array} Возвращает defaultCardArray массив разбитый на 6 массивов
 */
const getArrayForLines = (defaultCardArray) => {
    let oldCards = [].concat(defaultCardArray);
    let cards =shuffle(oldCards)
    let bar = [];
    const getArrayForLines2 = () => {
        if (cards.length === 6) {
            let foo = cards.slice(0, 6)
            bar.push(foo)
            return true;
        }
        if (cards.length > 0) {
            let foo = cards.slice(0, 6)
            cards.splice(0, 6)
            bar.push(foo)
            return getArrayForLines2();
        }
    }
    getArrayForLines2(cards, bar);
    return bar
}

const findIndexInArray = (arr, arrIdForDelete) => {
    for (let value of arr) {
        let findIndex = value.findIndex((it) => {
            return arrIdForDelete.includes(it.id)
        });
        if (findIndex > -1) {
            // value.splice(findIndex,1)
            value[findIndex].itFind = true;
        }
    }
    return arr;
}

/**
 * Для открытие карты
 * @param {*} arr массив данных
 * @param {*} card содержит id элемента в котором нао поменять itOpen на true
 * @returns новый массив !
 */
const findIndexInArrayForOpen = (arr, card) => {
    let bar = [].concat(arr)
    let findIndex
    for (let value of bar) {
        findIndex = value.findIndex((it) => {
            return it.id === card.id
        });
        if (findIndex > -1) {
            value[findIndex].itOpen = true;
        }
    }
    return bar;
}

/**
 * Для закрытие карты
 * @param {*} arr массив данных
 * @param {*} card содержит id элемента в котором нао поменять itOpen на false
 * @returns новый массив !
 */
const findIndexInArrayForOpenForClose = (arr, card) => {
    let bar = [].concat(arr)
    let findIndex
    for (let value of bar) {
        findIndex = value.findIndex((it) => {
            return it.id === card.id
        });
        if (findIndex > -1) {
            value[findIndex].itOpen = false;
        }
    }
    return bar;
}

const findIndexInArrayForOpenTwoCard = (arr, arrIdForClose) => {
    for (let value of arr) {
        value.forEach(elem => {
            if (arrIdForClose.includes(elem.id)) {
                elem.itOpen = false
            }
        });
    }
    return arr;
}

const getWin = (arr) => {
    let isBigEnough = (element, index, array) => {
        let foo = element.every(
            (it) => {
                return it.itFind === true
            });
        return foo
    }
    return arr.every(isBigEnough);
}

export {
    getArrayForLines,
    findIndexInArray,
    findIndexInArrayForOpen,
    findIndexInArrayForOpenForClose,
    findIndexInArrayForOpenTwoCard,
    getWin
}