import { ESJinit } from './index.js';
export class ESJaccordion {
    constructor(options = {}) {
        this.options = {
            allItemOpenable: true,
            toggleSpeed: '0.5s',
            itemActiveClass: null
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
            accordion.querySelectorAll(`.${self.options.itemHeadingClass}`).forEach((itemHeading, index) => {
                var _a;
                let Indx = index + 1;
                const accordionItem = (_a = itemHeading.closest(`.${self.options.itemClass}`)) === null || _a === void 0 ? void 0 : _a.querySelector(`.${self.options.itemDataClass}`);
                if (self.options.defaultItemOpen != Indx) {
                    accordionItem.style = 'display: none;';
                }
                else {
                    accordionItem.closest(`.${self.options.itemClass}`).querySelector(`.${self.options.itemHeadingClass}`).classList.toggle(`${self.options.itemActiveClass}`);
                }
                itemHeading.onclick = (e) => {
                    const accordionitemData = e.target.closest(`.${self.options.itemClass}`).querySelector(`.${self.options.itemDataClass}`);
                    if (self.options.allItemOpenable === false) {
                        accordion.querySelectorAll(`.${self.options.itemClass}`).forEach((item) => {
                            item.querySelector(`.${self.options.itemDataClass}`).style = `display: none;`;
                            item.querySelector(`.${self.options.itemDataClass}`).removeAttribute("data-is-open");
                        });
                    }
                    if (e.target !== accordionItem) {
                        if (!accordionitemData.getAttribute('data-is-open')) {
                            accordionitemData.style = `display: block;`;
                            accordionitemData.setAttribute("data-is-open", true);
                            accordionitemData.closest(`.${self.options.itemClass}`).querySelector(`.${self.options.itemHeadingClass}`).classList.add(`${self.options.itemActiveClass}`);
                        }
                        else {
                            accordionitemData.closest(`.${self.options.itemClass}`).querySelector(`.${self.options.itemHeadingClass}`).classList.toggle(`${self.options.itemActiveClass}`);
                            accordionitemData.style = `display: none;`;
                            accordionitemData.removeAttribute("data-is-open");
                        }
                    }
                };
            });
        });
    }
}
