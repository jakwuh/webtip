import {readFileSync} from 'fs';
import template from './Document.hbs';

export class Document {
    getMeta(tip) {
        return [
            ['og:title', tip.title],
            ['og:type', 'article'],
            ['og:url', `https://akwuh.me/t/${tip.id}/`]
        ]
    }

    render({content, tip}) {
        let manifest = JSON.parse(readFileSync(MANIFEST_PATH)),
            meta = this.getMeta(tip);

        return template({
            tip,
            meta,
            content,
            stylesName: manifest['styles.css'],
            scriptsName: manifest['index.js']
        });
    }
}
