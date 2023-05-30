import * as fs from 'node:fs'
import { JSDOM } from 'jsdom'
import { getTaskTemplate } from './core/task.js'
import { isEndEvent, isGateway, isTask } from './utils/types.js';
import { getTaskName } from './utils/names.js';
import { getGateTemplate } from './core/gate.js';

const inputDirectory = './input/Diagrama.xml';
const outputDirectory = './output/';

const { document } = (new JSDOM(fs.readFileSync(inputDirectory))).window;

const diagram = document.getElementsByTagName('process').item(0);

for (let index = 0; index < diagram.children.length; index++) {
    const element = diagram.children[index];
    if ((isTask(element) || isGateway(element) || isEndEvent(element)) && !fs.existsSync(outputDirectory + getTaskName(element) + '.py')) {
        const incomingElements = element.getElementsByTagName('incoming');
        const outgoingElements = element.getElementsByTagName('outgoing');
        let template;
        if (isTask(element)) {
            template = getTaskTemplate(document, element, getTaskName(element), incomingElements, outgoingElements);
        } else if (isGateway(element) || isEndEvent(element)) {
            template = getGateTemplate(document, element, getTaskName(element), incomingElements, outgoingElements);
        }
        if (!fs.existsSync(outputDirectory)) {
            fs.mkdirSync(outputDirectory);
        }
        fs.writeFileSync(outputDirectory + getTaskName(element) + '.py', template);

    }
}
