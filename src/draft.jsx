/* eslint-disable no-unused-vars */
// /**
//  *  @param {array} response массив с данным в ед-ном числе
//  * @returns {array} Возвращает двойной массив
//  */
//  let dataForGame = [].concat(response).concat(response);
async function simpleTimer(func) {
    let intervalId
    let promise = new Promise((resolve, reject) => {
        intervalId = setTimeout(() => resolve("готово!"), 2000)
        return () => clearInterval(intervalId);
    });
    let result = await promise; // будет ждать, пока промис не выполнится (*)
    // dev режими рендер два раза !!!!
    func(true)
    return result;
}