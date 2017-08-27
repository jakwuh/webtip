import {getTips} from './getTips';
import {readFileSync} from 'fs';
import {join} from 'path';

const tips = getTips();

const TIP_REGEXP = /\[[\d\-]+:\s*(.*)\s*]/;
const ALL_TIPS_REGEXP = new RegExp(TIP_REGEXP.source, 'g');

export function getTipTitle(id) {
    let date = tips[id - 1];
    let content = readFileSync(join(ROOT_PATH, 'Readme.md')).toString();

    let matches = content.match(ALL_TIPS_REGEXP);

    let line = matches.find(match => match.slice(1).startsWith(date));

    return line.match(TIP_REGEXP)[1];
}
