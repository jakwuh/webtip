import {readFileSync} from 'fs';
import template from './Document.hbs';

export class Document {
    getMeta(tip) {
        return tip ? [
            ['description', tip.description],
            ['og:title', tip.title],
            ['og:type', 'article'],
            ['og:url', `https://akwuh.me/t/${tip.id}/`],
            ['og:description', tip.description],
            ['og:site_name', 'Web Tip']
        ] : [
            ['description', 'Web, algos & related tips 🛠'],
            ['og:title', 'Web Tip @ James Akwuh'],
            ['og:type', 'website'],
            ['og:url', 'https://akwuh.me/t/'],
            ['og:description', 'Web, algos & related tips 🛠'],
            ['og:site_name', 'Web Tip']
        ]
    }

    getTitle(tip) {
        return (tip ? `${tip.title} - ` : '') + 'Web Tip @ James Akwuh';
    }

    render({tip, content = tip.content}) {
        let manifest = JSON.parse(readFileSync(MANIFEST_PATH)),
            meta = this.getMeta(tip),
            title = this.getTitle(tip);

        return template({
            tip,
            title,
            content,
            meta,
            stylesName: manifest['styles.css'],
            scriptsName: manifest['index.js']
        });
    }
}
