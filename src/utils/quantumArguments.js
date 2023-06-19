import { decode } from "html-entities";

export const getQuantumAttributes = (element) => {
    const attributes = getAttributesFromElement(element);
    delete attributes.provider;
    let attributesString = '';
    for (const [key, value] of Object.entries(attributes)) {
        if(typeof value === 'string'){
            attributesString += `${key}="${value}", `;
        }
        else {
            attributesString += `${key}=${value}, `;
        }
    }
    return attributesString;
}

export const getQuantumProvider = (element) => {
    const attributes = getAttributesFromElement(element);
    return attributes.provider ? attributes.provider.toLowerCase().trim() : null;
}


const getAttributesFromElement = (element) => {
    const attributes = element.getElementsByTagName('documentation')[0];
    return JSON.parse(decode(attributes.textContent));
}

