import { getServiceProvider } from "./args.js";
import { getTaskName } from "./names.js";
import { getRedisTokenTemplate, getS3TokenTemplate } from "./templates.js";
import { isParallelGateway } from "./types.js";

export const getIncomingElements = (document, element, incomingElements) => {
    let inString = '';
    for (let index = 0; index < incomingElements.length; index++) {
        const incomingId = incomingElements[index];
        const incomingFlow = document.getElementById(incomingId.textContent);
        const incomingElement = document.getElementById(incomingFlow.getAttribute('sourceRef'));
        if (isParallelGateway(element) && incomingElements.length > 1) {
            if (getServiceProvider() === 'redis') {
                inString += getRedisTokenTemplate(`parser.${getTaskName(incomingElement)}.${getTaskName(element)}`);
            } else {
                inString += getS3TokenTemplate(`parser.${getTaskName(incomingElement)}.${getTaskName(element)}`);
            }
        }
    }
    return inString;
}