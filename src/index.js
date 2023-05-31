import * as fs from 'node:fs'
import { JSDOM } from 'jsdom'
import { getTaskTemplate } from './core/task.js'
import { isEndEvent, isGateway, isStartEvent, isTask } from './utils/types.js';
import { getTaskName } from './utils/names.js';
import { getGateTemplate } from './core/gate.js';
import { getDiagramPath } from './utils/args.js';

const inputDirectory = getDiagramPath();
const outputDirectory = './output/';

const { document } = (new JSDOM(fs.readFileSync(inputDirectory))).window;

const diagram = document.getElementsByTagName('process').item(0);

fs.rmSync(outputDirectory, { recursive: true, force: true });
fs.mkdirSync(outputDirectory);

for (let index = 0; index < diagram.children.length; index++) {
    const element = diagram.children[index];
    if (isTask(element) || isGateway(element) || isEndEvent(element) || isStartEvent(element)) {
        const incomingElements = element.getElementsByTagName('incoming');
        const outgoingElements = element.getElementsByTagName('outgoing');
        let template;
        if (isTask(element) || isStartEvent(element)) {
            template = getTaskTemplate(document, element, getTaskName(element), incomingElements, outgoingElements);
        } else if (isGateway(element) || isEndEvent(element)) {
            template = getGateTemplate(document, element, getTaskName(element), incomingElements, outgoingElements);
        }
        fs.writeFileSync(outputDirectory + getTaskName(element) + '.py', template);

    }
}
