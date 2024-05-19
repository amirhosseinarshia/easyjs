import { ESJinit } from './index.js';
export class ESJmodal {
    constructor(options = {}) {
        this.options = {
            animationIn: 'flipInY',
            animationOut: 'flipOutY',
            animationSpeed: '1s',
            closeByClickModal: true,
            onOpen: () => { },
            onClose: () => { },
            position: 'center'
        };
        this.options = ESJinit.findEndOptions(this.options, options);
        ESJinit.CheckRequiredOptions([
            'wrapperClass',
            'handlerClass'
        ], this.options, 'ESJmodal');
        this.ComponentRender();
    }
    ComponentRender() {
        const self = this;
        document.querySelectorAll(`.${this.options.handlerClass}`).forEach(element => {
            element.onclick = function () {
                self.ComponentUi();
            };
        });
    }
    ComponentUi() {
        const self = this;
        const modal = document.createElement('section');
        let position = '';
        if (self.options.position === 'center' || self.options.position === '') {
            position = 'align-items: center; justify-content: center;';
        }
        else if (self.options.position === 'top-center') {
            position = 'align-items: flex-start; justify-content: center;';
        }
        else if (self.options.position === 'top-left') {
            position = 'align-items: flex-start; justify-content: flex-start;';
        }
        else if (self.options.position === 'top-right') {
            position = 'align-items: flex-start; justify-content: flex-end;';
        }
        else if (self.options.position === 'bottom-center') {
            position = 'align-items: flex-end; justify-content: center;';
        }
        else if (self.options.position === 'bottom-left') {
            position = 'align-items: flex-end; justify-content: flex-start;';
        }
        else if (self.options.position === 'bottom-right') {
            position = 'align-items: flex-end; justify-content: flex-end;';
        }
        modal.style = `position: fixed; top: 0; bottom: 0;  left: 0; right: 0; background: rgba(0 , 0 ,0 ,0.7); display: flex;  z-index: 9999999999999; padding: 20px; ${position}`;
        let popup = document.querySelector(`.${self.options.wrapperClass}`);
        popup = popup.cloneNode(true);
        popup.style = `display: block; animation-duration: ${self.options.animationSpeed}; `;
        ESJinit.initializeAnimation(popup, `${self.options.animationIn}`);
        document.body.prepend(modal);
        modal.prepend(popup);
        self.options.onOpen();
        window.onclick = (e) => {
            if ((e.target === modal && self.options.closeByClickModal) || e.target === document.querySelector(`.${self.options.removerClass}`)) {
                ESJinit.initializeAnimation(popup, `${self.options.animationOut}`);
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 1000);
                self.options.onClose();
            }
        };
    }
}
