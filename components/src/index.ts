
// components
import { ESJmodal } from "./modal.js";
import { ESJscrollToShow } from './ScrollToShow.js';
import { ESJindicator } from './indicator.js';
import { ESJaccordion } from './accordion.js';
// easyjs main
import { ESJinit } from './easyjs.js';




export interface ComponentGlobalOptions {
    // props
    onOpenClass: string,
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
    ComponentUi(elm: Element , any : any): void;
}


export const Components: any | object = {
    modal: ESJmodal,
    scrollToShow: ESJscrollToShow,
    accordion:ESJaccordion,
    indicator : ESJindicator
};

export { ESJinit };

