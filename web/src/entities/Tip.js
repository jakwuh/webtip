import {join} from 'path';
import {getTips} from '../libs/helpers/getTips';
import {getReadmeMarkdown} from '../libs/helpers/getMarkdown';
import {NotFoundError} from './errors';
import {getTipTitle} from '../libs/helpers/getTipTitle';

export class Tip {
    constructor({id}) {
        this.id = id;
        this.title = getTipTitle(id);
    }

    getRoot() {
        const tips = getTips();

        return join(TIPS_PATH, tips[this.id - 1]);
    }

    async fetchContent() {
        let content = await getReadmeMarkdown(this.getRoot());
        this.content = content;
        this.description = content.slice(0, 160);
    }

    static findIndexByDate(date) {
        const tips = getTips();

        return tips.findIndex(tip => tip === date) + 1;
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
