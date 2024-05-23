import { ESJinit } from './index.js';
export class ESJindicator {
    constructor(options = {}) {
        this.options = {
            itemClass: ''
        };
        this.options = ESJinit.findEndOptions(this.options, options);
        ESJinit.CheckRequiredOptions([
            'wrapperClass',
            'itemClass',
            'indicatorClass',
        ], this.options, 'ESJindicator');
        this.ComponentRender();
    }
    ComponentRender() {
        //  document.querySelector(`.${this.options.indicatorClass as string}`).style = 'position: fixed; visibility: hidden;';
    }
    ComponentUi() {
    }
}
