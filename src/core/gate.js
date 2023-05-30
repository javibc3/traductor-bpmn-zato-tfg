import { getIncomingElements } from "../utils/incoming.js";
import { getOutgoingElements } from "../utils/outgoing.js";
import { serviceTemplate } from "../utils/templates.js";
import { isEndEvent } from "../utils/types.js";

export const getGateTemplate = (document, element, taskName, incomingElements, outgoingElements) => {

    let template = serviceTemplate(taskName);

    template += getIncomingElements(document, element, incomingElements);

    if (isEndEvent(element)) {
        template += `       self.response.payload = 'END'\n`;
    }
    else {
        template += getOutgoingElements(document, element, outgoingElements);
    }

    return template;
}