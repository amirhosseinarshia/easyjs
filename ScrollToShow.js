import { ESJinit } from './index.js';
export class ScrollToShow {
    constructor(options = {}) {
        this.options = {
            animationIn: 'flipInY',
            animationOut: 'flipOutY',
            threshold: 1,
            hideWhenOffscreen: false,
        };
        this.options = ESJinit.findEndOptions(this.options, options);
        ESJinit.CheckRequiredOptions([
            'targetElements',
        ], this.options, self.name);
        alert(self.constructor.name);
        this.ComponentRender();
        // if('IntersectionObserver' in window) {
        //        alert('sasa')
        // }
    }
    ComponentRender() {
        const self = this;
        document.querySelectorAll(`${this.options.targetElements}`).forEach(element => {
            element.onclick = function () {
            };
        });
    }
    ComponentUi() {
    }
}
