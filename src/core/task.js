import { isQuantumTask } from "../utils/types.js";
import { amazonQuantumServiceTemplate, baseQuantumServiceTemplate, ibmQuantumServiceTemplate, serviceTemplate } from "../utils/templates.js";
import { getOutgoingElements } from "../utils/outgoing.js";
import { getIncomingElements } from "../utils/incoming.js";
import { getQuantumProvider } from "../utils/quantumArguments.js";

export const getTaskTemplate = (document, element, taskName, incomingElements, outgoingElements) => {

    let template = ''
    if (isQuantumTask(element)) {
        const provider = getQuantumProvider(element);
        if (provider == 'ibm') {
            template += ibmQuantumServiceTemplate(taskName)
        }
        else if (provider == 'aws' || provider == 'amazon') {
            template += amazonQuantumServiceTemplate(taskName)
        }
        else {
            template += baseQuantumServiceTemplate(taskName)
        }
    } else {
        template += serviceTemplate(taskName)
    }

    template += getIncomingElements(document, element, incomingElements);

    if (isQuantumTask(element)) {
        template += `    def after_circuit_execution(self):\n`;
    }

    template += `       # Replace this with your code\n`;

    template += getOutgoingElements(document, element, outgoingElements);

    return template;
}

