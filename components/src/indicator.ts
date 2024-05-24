import { ComponentGlobalOptions, ComponentInterface, ESJinit } from './index.js';

interface ComponentSpecialOptions extends ComponentGlobalOptions {
    itemsClass: string,
    indicatorClass: string,
    mode: string, // x | y | both
    events: string[],
    indicatorDefaultHidden: boolean,
    indicatorAnimationIn: string,
    indicatorAnimationOut: string,
    indicatorAnimationSpeed: string,
    indicatorMovingSpeed: string,
    hideIndicatorWhenEventTargetNotAnItem: boolean,
    indicatorMove: CallableFunction,
    indicatorStop: CallableFunction,
    indicatorPositionMode: string,
    indicatorRatio: string,
    indicatorXmargin: string,
    indicatorYmargin: string,
}
export class ESJindicator implements ComponentInterface {
    options: Partial<ComponentSpecialOptions> = {
        mode: 'both',
        events: ['mousemove', 'click'],
        indicatorDefaultHidden: false, // done
        indicatorAnimationIn: '',
        indicatorAnimationOut: '',
        hideIndicatorWhenEventTargetNotAnItem: false,
        indicatorMove: (indicator: Element, targetItem: Element) => { },
        indicatorStop: (indicator: Element, targetItem: Element) => { },
        indicatorMovingSpeed: '0.5s',
        indicatorAnimationSpeed: '0.5s',
        indicatorPositionMode: 'absolute', // done
        indicatorRatio: 'center',
        indicatorYmargin: '0',
        indicatorXmargin: 'auto',
    };
    constructor(options: Partial<ComponentSpecialOptions> = {}) {
        this.options = ESJinit.findEndOptions(this.options, options);
        ESJinit.CheckRequiredOptions([
            'wrapperClass',
            'itemsClass',
            'indicatorClass',
        ], this.options, 'ESJindicator');

        this.ComponentRender();
    }
    ComponentRender(): void {
        const self: ESJindicator = this;
        //  document.querySelector(`.${this.options.indicatorClass as string}`).style = 'position: fixed; visibility: hidden;';
        (document.querySelector(`.${this.options.indicatorClass}`) as any).style = `position: ${this.options.indicatorPositionMode}; visibility: ${(this.options.indicatorDefaultHidden === true) ? 'hidden' : 'visible'};`;


        this.options.events?.forEach(eventname => {
            document.querySelectorAll(`.${self.options.itemsClass}`).forEach((item) => {
                item.addEventListener(`${eventname}`, function (e) {
                    self.ComponentUi(item, e);
                })
            })
        });



    }
    ComponentUi(currentItem: Element, event: any): void {
        const self: ESJindicator = this;
        let y: number = event.pageY;
        let x: number = event.pageX;
        const indicator: HTMLElement | null = document.querySelector(`.${self.options.indicatorClass}`);
        const indicatorWidth = indicator?.clientWidth as number;
        const indicatorHeight = indicator?.clientHeight as number;

        const indicatorXmargin = (self.options.indicatorXmargin === 'auto') ? currentItem.clientWidth+'px' : self.options.indicatorXmargin;
        const indicatorYmargin = (self.options.indicatorYmargin === 'auto') ? currentItem.clientHeight+'px' : self.options.indicatorYmargin;


        self.options.events?.forEach(eventname => {

            window.addEventListener(`${eventname}`, function (e: Event) {
                if (((e as any).pageX + indicatorWidth) >= window.innerWidth && mode === 'x') {
                    (indicator as HTMLElement).style.left = `${window.innerWidth - indicatorWidth}px`;
                }

                if((indicator as HTMLElement).getBoundingClientRect().left < 0 && mode === 'x') {
                    (indicator as HTMLElement).style.left = `0px`;
                }

             
            })

        });

        const mode: string | undefined = self.options.mode;

        if (self.options.indicatorRatio === 'center') {
            x = x - currentItem.scrollWidth / 2;
            y = y - currentItem.scrollHeight / 2;
        } else if (self.options.indicatorRatio === 'end') {
            x = x - currentItem.scrollWidth;
            y = y - currentItem.scrollHeight;
        }

        if (mode === 'both' || mode === 'x') {
            (indicator as HTMLElement).style.left = `${x}px`;
        }
        if (mode === 'both' || mode === 'y') {
            (indicator as HTMLElement).style.top = `${y}px`;
        }



       (indicator as HTMLElement).style.margin = `${indicatorYmargin} ${indicatorXmargin}`;
        



        (indicator as HTMLElement).style.transition = `${this.options.indicatorAnimationSpeed} `;







        if (self.options.indicatorMove)
            self.options.indicatorMove(indicator, currentItem);

    }
}

