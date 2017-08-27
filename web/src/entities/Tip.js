import {join} from 'path';
import {getTips} from '../libs/helpers/getTips';
import {getReadmeMarkdown} from '../libs/helpers/getMarkdown';
import {NotFoundError} from './errors';

export class Tip {
    constructor({id}) {
        this.id = id;
    }

    getRoot() {
        return join(TIPS_PATH, tips[this.id - 1]);
    }

    getContentPromise() {
        return getReadmeMarkdown(this.getRoot());
    }

    static fromId(id) {
        const tips = getTips();

        id = Number(id);

        if (!Number.isFinite(id) || id > tips.length || id < 1) {
            throw new NotFoundError('Tip not found');
        }

        return new this({id});
    }
}
