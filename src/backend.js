const onLoadForServer = (data) => {
    //Получение данных для отображения реализовать
    // при помощи имитации получения данных по API.
    const {
        response
    } = data;
    response.map(
        (place) => {
            place["itFind"] = false
            return (
                place["itOpen"] = false
                
            )
        }
    )

    return response;
}

export {
    onLoadForServer
}