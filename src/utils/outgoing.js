import { getTaskName } from "./names.js";
import { outgoingCallTemplate, outgoingConditionalTemplate, outgoingStartConditionalTemplate, setTokenTemplate } from "./templates.js";
import { isExclusiveGateway, isParallelGateway } from "./types.js";

export const getOutgoingElements = (document, element, outgoingElements) => {
    let outString = '';
    let conditionalIndex = 0;
    for (let index = 0; index < outgoingElements.length; index++) {
        const outgoingId = outgoingElements[index];
        const outgoingFlow = document.getElementById(outgoingId.textContent);
        const outgoingElement = document.getElementById(outgoingFlow.getAttribute('targetRef'));
        if(isParallelGateway(outgoingElement)){
            outString += setTokenTemplate(`parser.${getTaskName(outgoingElement)}`);
        }
        else if(isExclusiveGateway(element) && outgoingElements.length > 1){
            if(conditionalIndex == 0){
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