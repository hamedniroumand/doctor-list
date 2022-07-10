export const shuffle = (array) => {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

export const randomItems = (array) => {
    const shuffledArray = shuffle(array);
    const maxRandomIndex = Math.floor(Math.random() * shuffledArray.length - 1);
    return shuffledArray.filter((item, index) => {
        return index <= maxRandomIndex && item;
    });
}