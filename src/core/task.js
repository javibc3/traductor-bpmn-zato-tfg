import { isQuantumTask } from "../utils/types.js";
import { quantumServiceTemplate, serviceTemplate } from "../utils/templates.js";
import { getOutgoingElements } from "../utils/outgoing.js";
import { getIncomingElements } from "../utils/incoming.js";

export const getTaskTemplate = (document, element, taskName, incomingElements, outgoingElements) => {

    let template = isQuantumTask(element) ? quantumServiceTemplate(taskName) : serviceTemplate(taskName);

    template += getIncomingElements(document, element, incomingElements);

    if(isQuantumTask(element)) {
        template += `    def after_circuit_execution(self):\n`;
    }

    template += `       # Replace this with your code\n`;

    template += getOutgoingElements(document, element, outgoingElements);

    return template;
}

