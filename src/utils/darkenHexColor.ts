function darkenHexColor(str: string) {
    const notAllowed = ["A", "B", "C", "D", "E", "F"];
    const replaceCharacters = ["0", "1", "2", "3", "4", "5"];
    const newString = str.split("").map((ch, i) => {
        if (notAllowed.includes(ch.toUpperCase())) return replaceCharacters[i];
        return ch;
    });
    return newString.join("");
}

export default darkenHexColor;
