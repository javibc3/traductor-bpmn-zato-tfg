export const getTaskName = (element) => {
    if (element.getAttribute('name')) {
        return toCamelCase(element.getAttribute('name'));
    }
    return toCamelCase(element.getAttribute('id'));
}

const toCamelCase = (str) => {
    // Divide la frase en palabras utilizando espacios como separadores
    const words = str.split(' ') || str.split('_') || str.split('-') || str;

    // Convierte la primera letra de cada palabra, excepto la primera, en mayúscula
    const camelCaseWords = words.map(function (word, index) {
        if (index === 0) {
            word[0].toUpperCase();
            return word; // Convierte la primera palabra en minúscula
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });

    // Combina las palabras y agrega espacios entre ellas
    const camelCaseSentence = camelCaseWords.join('');

    return camelCaseSentence;
}