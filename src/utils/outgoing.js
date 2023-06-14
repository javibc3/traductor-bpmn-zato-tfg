import fs from 'fs';
import { getTaskName } from "./names.js";
import { outgoingCallTemplate, outgoingConditionalTemplate, outgoingStartConditionalTemplate, setRedisTokenTemplate, setS3TokenTemplate } from "./templates.js";
import { isExclusiveGateway, isParallelGateway } from "./types.js";
import { getServiceProvider } from './args.js';

export const getOutgoingElements = (document, element, outgoingElements) => {
    let outString = '';
    let conditionalIndex = 0;
    for (let index = 0; index < outgoingElements.length; index++) {
        const outgoingId = outgoingElements[index];
        const outgoingFlow = document.getElementById(outgoingId.textContent);
        const outgoingElement = document.getElementById(outgoingFlow.getAttribute('targetRef'));
        if (isParallelGateway(outgoingElement) && outgoingElement.getElementsByTagName('incoming').length > 1) {
            if (getServiceProvider() === 'redis') {
                outString += setRedisTokenTemplate(`parser.${getTaskName(element)}.${getTaskName(outgoingElement)}`);
            } else {
                outString += setS3TokenTemplate(`parser.${getTaskName(element)}.${getTaskName(outgoingElement)}`);
            }
            if (!existsElements(document, outgoingElement.getElementsByTagName('incoming'))) {
                outString += outgoingCallTemplate(`parser.${getTaskName(outgoingElement)}`);
            }
        }
        else if (isExclusiveGateway(element) && outgoingElements.length > 1) {
            if (conditionalIndex == 0) {
                outString += outgoingStartConditionalTemplate(`parser.${getTaskName(outgoingElement)}`);
            }
            else {
                outString += outgoingConditionalTemplate(`parser.${getTaskName(outgoingElement)}`);
            }
            conditionalIndex++;
        }
        else {
            outString += outgoingCallTemplate(`parser.${getTaskName(outgoingElement)}`);
        }
    }
    return outString;
}

const existsElements = (document, incomingElements) => {
    for (let index = 0; index < incomingElements.length; index++) {
        const incomingId = incomingElements[index];
        const incomingFlow = document.getElementById(incomingId.textContent);
        const incomingElement = document.getElementById(incomingFlow.getAttribute('sourceRef'));
        if (fs.existsSync(`./output/${getTaskName(incomingElement)}.py`)) {
            return true;
        }
    }
    return false;
}