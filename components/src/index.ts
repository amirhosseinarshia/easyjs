
// components
import { ESJmodal } from "./modal.js";
// easyjs main
import { ESJinit } from './easyjs.js';
import { ESJscrollToShow } from './ScrollToShow.js';
import { ESJaccordion } from './accordion.js';



export interface ComponentGlobalOptions {
    // props
    handlerClass: string,
    wrapperClass: string,
    animationIn: string,
    animationOut: string,
    animationSpeed: string
    // callback functions
    onOpen: CallableFunction | any,
    onClose: CallableFunction | any
};

export interface ComponentInterface {
    options: Partial<ComponentGlobalOptions>;
    ComponentRender(): void;
    ComponentUi(elm: Element): void;
}


export const Components: any | object = {
    modal: ESJmodal,
    scrollToShow: ESJscrollToShow,
    accordion:ESJaccordion
};

export { ESJinit };

