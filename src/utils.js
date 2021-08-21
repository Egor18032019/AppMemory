/**
 *  @param {array} defaultCardArray массив с данным в ед-ном числе
 * @returns {array} Возвращает defaultCardArray массив разбитый на 6 массивов
 */
const getArrayForLines = (defaultCardArray) => {
    let cards = [].concat(defaultCardArray);
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
    console.log("findIndexInArrayForOpenTwoCard")
    for (let value of arr) {
        value.forEach(elem => {
        if(arrIdForClose.includes(elem.id)){
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
                console.log(it.id + " it.itFind === true " + (it.itFind === false) + " " + it.itFind)
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