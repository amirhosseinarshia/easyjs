


import { ComponentGlobalOptions, ComponentInterface, ESJinit } from './index.js';

interface ComponentSpecialOptions extends ComponentGlobalOptions {
    closeByClickModal: boolean,
    removerClass: string
}

export class ESJmodal implements ComponentInterface {
    options: Partial<ComponentSpecialOptions> = {
        animationIn: 'flipInY',
        animationOut: 'flipOutY',
        closeByClickModal: true,
        onOpen: () => { },
        onClose: () => { },
    };

    constructor(options: Partial<ComponentSpecialOptions> = {}) {
        this.options = ESJinit.findEndOptions(this.options, options);
        ESJinit.CheckRequiredOptions([
            'wrapperClass',
            'handlerClass'
        ], this.options,'ESJmodal');
        this.ComponentRender();
    }

    ComponentRender(): void {
        const self: ESJmodal = this;
        document.querySelectorAll(`.${this.options.handlerClass}`).forEach(element => {
            (element as any).onclick = function () {
                self.ComponentUi();
            }
        });
    }
    ComponentUi(): void {
        const self = this;
        const modal = document.createElement('section') as any;
        modal.style = 'position: fixed; top: 0; bottom: 0;  left: 0; right: 0; background: rgba(0 , 0 ,0 ,0.8); display: flex; align-items: center; justify-content: center; z-index: 9999999999999;';

        let popup: any = document.querySelector(`.${self.options.wrapperClass}`);


        popup = popup.cloneNode(true);

        popup.style = 'display: block;';



        ESJinit.initializeAnimation(popup, `${self.options.animationIn}`);
        document.body.prepend(modal);
        modal.prepend(popup);

        self.options.onOpen();

        window.onclick = (e) => {
            if ((e.target === modal && self.options.closeByClickModal) || e.target === document.querySelector(`.${self.options.removerClass}`)) {
                ESJinit.initializeAnimation(popup, `${self.options.animationOut}`)

                setTimeout(() => {
                    document.body.removeChild(modal)
                   
                }, 1000);
                self.options.onClose();
            }
        }
    }

}
