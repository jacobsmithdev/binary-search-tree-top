export default function randomIntArray(min = 0, max = 10, length = 10) {
    const arr = [];

    for (let i = 0; i < length; i++) {
        const difference = max - min;
        const randomInt = min + Math.floor(difference * Math.random());

        arr.push(randomInt);
    }
    return arr;
}
