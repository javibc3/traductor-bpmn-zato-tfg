import { getTaskName } from "./names.js";
import { getTokenTemplate } from "./templates.js";
import { isParallelGateway } from "./types.js";

export const getIncomingElements = (document, element, incomingElements) => {
    let inString = '';
    for (let index = 0; index < incomingElements.length; index++) {
        const incomingId = incomingElements[index];
        const incomingFlow = document.getElementById(incomingId.textContent);
        const incomingElement = document.getElementById(incomingFlow.getAttribute('sourceRef'));
        if (isParallelGateway(element) && incomingElements.length > 1) {
            inString += getTokenTemplate(`parser.${getTaskName(incomingElement)}`);
        }
    }
    return inString;
}