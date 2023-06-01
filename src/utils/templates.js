import { getBucketName, getKeyName } from "./args.js";

export const serviceTemplate = (name) => {
    return `# -*- coding: utf-8 -*-
# zato: ide-deploy=True

from zato.server.service import Service

class ${name}(Service):
    name = 'parser.${name}'

    def handle(self):
`;
}

export const quantumServiceTemplate = (name) => {
    return `# -*- coding: utf-8 -*-
# zato: ide-deploy=True

# Zato
from zato.server.service import QuantumService

class ${name}(QuantumService):
    name = 'parser.${name}'

    def circuit(self):
        # Replace this with your circuit
    
    def before_circit_execution(self):

`;
}

export const outgoingCallTemplate = (name) => {
    return `        
        self.invoke_async('${name}', 'payload')\n`;
}

export const outgoingStartConditionalTemplate = (name) => {
    return `
        if ('Condition'):
            self.invoke_async('${name}', 'payload')\n`;
}

export const outgoingConditionalTemplate = (name) => {
    return `
        elif ('Condition'):
            self.invoke_async('${name}', 'payload')\n`;
}

export const setS3TokenTemplate = (name) => {
    return `
        with self.cloud.aws.s3.get('${getKeyName()}').conn.client() as client:

            key = '${name}'
            value = '${name}'
            bucket = '${getBucketName()}'

            client.set(key, value, bucket)
    
`
}

export const getS3TokenTemplate = (name) => {
    return `
        with self.cloud.aws.s3.get('${getKeyName()}').conn.client() as client:

            key = '${name}'
            bucket = '${getBucketName()}'

            while (client.get(key, bucket) == None):
                pass
            client.delete(key, bucket)

`
}

export const setRedisTokenTemplate = (name) => {
    return `
        self.kvdb.conn.set('${name}', '${name}')
    `
}

export const getRedisTokenTemplate = (name) => {
    return `
        while (self.kvdb.conn.get('${name}') == None):
            pass
        self.kvdb.conn.delete('${name}')
    `
}

