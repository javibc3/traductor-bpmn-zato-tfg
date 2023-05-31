export const isTask = (element) => {
    return element.tagName == 'task'.toUpperCase();
};

export const isGateway = (element) => {
    return element.tagName == 'parallelGateway'.toUpperCase() || element.tagName == 'exclusiveGateway'.toUpperCase();
};

export const isParallelGateway = (element) => {
    return element.tagName == 'parallelGateway'.toUpperCase();
};

export const isExclusiveGateway = (element) => {
    return element.tagName == 'exclusiveGateway'.toUpperCase();
};

export const isStartEvent = (element) => {
    return element.tagName == 'startEvent'.toUpperCase()
};

export const isEndEvent = (element) => {
    return element.tagName == 'endEvent'.toUpperCase()
};

export const isTag = (element, tagName) => {
    return element.tagName == tagName.toUpperCase();
}

export const isQuantumTask = (element) => {
    const extensionElements = element.getElementsByTagName('extensionElements');
    if (extensionElements.length == 0) {
        return false;
    }
    if (extensionElements.item(0).getElementsByTagName('vp:ModelRef').length == 0) {
        return false;
    }
    return element.getElementsByTagName('extensionElements').item(0).getElementsByTagName('vp:ModelRef').item(0).getAttribute('name') == 'Quantum Task';
}