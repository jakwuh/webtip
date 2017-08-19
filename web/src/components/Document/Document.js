import {readFileSync} from 'fs';
import template from './Document.hbs';

export class Document {
    render({content}) {
        const manifest = JSON.parse(readFileSync(MANIFEST_PATH));

        return template({
            content,
            stylesName: manifest['styles.css'],
            scriptsName: manifest['index.js']
        });
    }
}
