import {join} from 'path';
import {readFileSync} from 'fs';
import {getTips} from './getTips';
import {Markdown} from 'markdown-to-html';
import toArray from 'stream-to-array';

const tips = getTips();

export function getTip(id) {
    id = Number(id);

    if (!Number.isFinite(id) || id > tips.length || id < 1) {
        return;
    }

    let path = join(TIPS_PATH, tips[id - 1], 'Readme.md');

    return new Promise((resolve, reject) => {
        let md = new Markdown();
        md.bufmax = 2048;

        md.render(path, {}, (err) => {
            if (err) {
                return reject(err);
            }

            toArray(md, (err, arr) => {
                if (err) {
                    return reject(err);
                }

                resolve(arr.join(''));
            });
        });
    });
}
