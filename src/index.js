import * as fs from 'node:fs'
import { JSDOM } from 'jsdom'
import { getTaskTemplate } from './core/task.js'
import { isEndEvent, isGateway, isStartEvent, isTask } from './utils/types.js';
import { getTaskName } from './utils/names.js';
import { getGateTemplate } from './core/gate.js';
import { getDiagramPath } from './utils/args.js';

if (process.argv[2] == '-h') {
    console.log(`Parser BPMN to Zato
    ⚡️ Usage: node src/index.js <diagram-path> <service-provider> <bucket-name> <key-name>. 
    ⚠️ The only two valid service providers are redis and s3.
    ❕ The last two arguments are optional.
    ❕ Only use if you set the service provider to s3.`);
    console.log('🧪 Example: node src/index.js ./diagram.xml redis');
    process.exit(0);
}

const inputDirectory = getDiagramPath();
const outputDirectory = './output/';

let document;

try {
    document = (new JSDOM(fs.readFileSync(inputDirectory))).window.document;
} catch (error) {
    console.log('Error: Invalid diagram path.');
    process.exit(1);
}

try {
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
    console.log('🎉 Done!: The result can be seen in the ./output folder');

} catch (error) {
    console.error(error);
    fs.rmSync(outputDirectory, { recursive: true, force: true });
    process.exit(1);
}
