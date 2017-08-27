import {getTips} from './getTips';
import {join} from 'path';
import * as fs from 'fs';
import promisify from 'es6-promisify';

const readFile = promisify(fs.readFile);
const tips = getTips();

export async function getTipMeta(id) {
    let date = tips[id - 1];

    try {
        let content = await readFile(join(TIPS_PATH, date, 'meta.json'));
        return JSON.parse(content);
    } catch (e) {
        return {};
    }
}
