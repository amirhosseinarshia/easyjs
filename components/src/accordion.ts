import { ComponentGlobalOptions, ComponentInterface, ESJinit } from './index.js';
interface ComponentSpecialOptions extends ComponentGlobalOptions {

    itemClass: string,
    itemDataClass: string,
    itemHeadingClass: string,
    allItemOpenable: boolean,
    toggleSpeed: string,
    defaultItemOpen: number,
    itemActiveClass: string | null,

}
export class ESJaccordion implements ComponentInterface {
    options: Partial<ComponentSpecialOptions> = {
        allItemOpenable: true,
        toggleSpeed: '0.5s',
        itemActiveClass: null
    };
    constructor(options: Partial<ComponentSpecialOptions> = {}) {
        this.options = ESJinit.findEndOptions(this.options, options);
        ESJinit.CheckRequiredOptions([
            'wrapperClass',
            'itemClass',
            'itemDataClass',
            'itemHeadingClass'

        ], this.options, 'ESJaccordion');

        this.ComponentRender();
    }
    ComponentRender(): void {
        this.ComponentUi();
    }
    ComponentUi(): void {
        const self = this;
        document.querySelectorAll(`.${self.options.wrapperClass}`).forEach(function (accordion) {
            (accordion as HTMLElement).querySelectorAll(`.${self.options.itemHeadingClass}`).forEach((itemHeading, index) => {
                let Indx: number = index + 1;


                const accordionItem: any = itemHeading.closest(`.${self.options.itemClass}`)?.querySelector(`.${self.options.itemDataClass}`);
                if (self.options.defaultItemOpen != Indx) {
                    accordionItem.style = 'display: none;';
                
                }else {
                    accordionItem.closest(`.${self.options.itemClass}`).querySelector(`.${self.options.itemHeadingClass}`).classList.toggle(`${self.options.itemActiveClass}`)
                }




                (itemHeading as HTMLElement).onclick = (e) => {

                    const accordionitemData: HTMLElement | any = (e.target as any).closest(`.${self.options.itemClass}`).querySelector(`.${self.options.itemDataClass}`);

                    if (self.options.allItemOpenable === false) {
                        (accordion as HTMLElement).querySelectorAll(`.${self.options.itemClass}`).forEach((item) => {
                        
                            (item as any).querySelector(`.${self.options.itemDataClass}`).style = `display: none;`;
                            
                            (item as any).querySelector(`.${self.options.itemDataClass}`).removeAttribute("data-is-open");
                       
                        });
                    }





                    if (e.target !== accordionItem) {

                        if (!accordionitemData.getAttribute('data-is-open')) {

                            accordionitemData.style = `display: block;`;
                            accordionitemData.setAttribute("data-is-open", true);
                            accordionitemData.closest(`.${self.options.itemClass}`).querySelector(`.${self.options.itemHeadingClass}`).classList.add(`${self.options.itemActiveClass}`)
                        } else {
                            accordionitemData.closest(`.${self.options.itemClass}`).querySelector(`.${self.options.itemHeadingClass}`).classList.toggle(`${self.options.itemActiveClass}`)
                            accordionitemData.style = `display: none;`;
                            accordionitemData.removeAttribute("data-is-open");

                        }

                    }



                }
            })
        })
    }
}