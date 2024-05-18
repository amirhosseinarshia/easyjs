import { ESJinit } from './index.js';
export class ESJaccordion {
    constructor(options = {}) {
        this.options = {
            allItemOpenable: true,
            toggleSpeed: '0.5s'
        };
        this.options = ESJinit.findEndOptions(this.options, options);
        ESJinit.CheckRequiredOptions([
            'wrapperClass',
            'itemClass',
            'itemDataClass',
            'itemHeadingClass'
        ], this.options, 'ESJaccordion');
        this.ComponentRender();
    }
    ComponentRender() {
        this.ComponentUi();
    }
    ComponentUi() {
        const self = this;
        document.querySelectorAll(`.${self.options.wrapperClass}`).forEach(function (accordion) {
            accordion.querySelectorAll(`.${self.options.itemHeadingClass}`).forEach((item, index) => {
                let Indx = index + 1;
                const accordionItem = item.querySelector(`.${self.options.itemDataClass}`);
                if (self.options.defaultItemOpen != Indx) {
                    accordionItem.style = 'height: 0px; overflow: hidden;';
                }
                item.onclick = (e) => {
                    const accordionitemData = e.target.closest(`.${self.options.itemClass}`).querySelector(`.${self.options.itemDataClass}`);
                    if (self.options.allItemOpenable === false) {
                        accordion.querySelectorAll(`.${self.options.itemClass}`).forEach((item) => {
                            item.querySelector(`.${self.options.itemDataClass}`).style = `height: 0px; overflow: hidden;  transition: ${self.options.toggleSpeed};`;
                            item.querySelector(`.${self.options.itemDataClass}`).removeAttribute("data-is-open");
                        });
                    }
                    if (e.target !== accordionItem) {
                        if (!accordionitemData.getAttribute('data-is-open')) {
                            accordionitemData.style = `height: ${accordionitemData.scrollHeight}px; overflow: hidden; transition: ${self.options.toggleSpeed};`;
                            accordionitemData.setAttribute("data-is-open", true);
                        }
                        else {
                            accordionitemData.style = `height: 0px; overflow: hidden;  transition: ${self.options.toggleSpeed};`;
                            accordionitemData.removeAttribute("data-is-open");
                        }
                    }
                };
            });
        });
    }
}
