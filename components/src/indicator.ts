import { ComponentGlobalOptions, ComponentInterface, ESJinit } from './index.js';

interface ComponentSpecialOptions extends ComponentGlobalOptions {

    itemClass: string
    indicatorClass: string,
    pos: string,
    events: string
}
export class ESJindicator implements ComponentInterface {
    options: Partial<ComponentSpecialOptions> = {
        itemClass: ''
    };
    constructor(options: Partial<ComponentSpecialOptions> = {}) {
        this.options = ESJinit.findEndOptions(this.options, options);
        ESJinit.CheckRequiredOptions([
            'wrapperClass',
            'itemClass',
            'indicatorClass',
        ], this.options, 'ESJindicator');

        this.ComponentRender();
    }
    ComponentRender(): void {
        //  document.querySelector(`.${this.options.indicatorClass as string}`).style = 'position: fixed; visibility: hidden;';
    }
    ComponentUi(): void {

    }
}

