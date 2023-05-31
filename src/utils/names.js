export const getTaskName = (element) => {
    if (element.getAttribute('name')) {
        return toCamelCase(element.getAttribute('name'));
    }
    return toCamelCase(element.getAttribute('id'));
}

const toCamelCase = (str) => {
    const words = str.split(' ') || str.split('_') || str.split('-') || str;

    const camelCaseWords = words.map(function (word, index) {
        if (index === 0) {
            word[0].toUpperCase();
            return word;
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });

    const camelCaseSentence = camelCaseWords.join('');

    return camelCaseSentence;
}