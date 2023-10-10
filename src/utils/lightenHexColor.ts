function lightenHexColor(str: string) {
    const notAllowed = ["0", "1", "2", "3", "4", "5"];
    const replaceCharacters = ["A", "B", "C", "D", "E", "F"];
    const newString = str.split("").map((ch, i) => {
        if (notAllowed.includes(ch.toUpperCase())) return replaceCharacters[i];
        return ch;
    });
    return newString.join("");
}

export default lightenHexColor;
