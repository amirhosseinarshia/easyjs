import { ESJinit } from './index.js';
export class ESJindicator {
    constructor(options = {}) {
        this.options = {
            mode: 'both',
            events: ['mousemove', 'click'],
            indicatorDefaultHidden: false, // done
            indicatorAnimationIn: '',
            indicatorAnimationOut: '',
            hideIndicatorWhenEventTargetNotAnItem: false,
            indicatorMove: (indicator, targetItem) => { },
            indicatorStop: (indicator, targetItem) => { },
            indicatorMovingSpeed: '0.5s',
            indicatorAnimationSpeed: '0.5s',
            indicatorPositionMode: 'absolute', // done
            indicatorRatio: 'center',
            indicatorYmargin: '0',
            indicatorXmargin: 'auto',
        };
        this.options = ESJinit.findEndOptions(this.options, options);
        ESJinit.CheckRequiredOptions([
            'wrapperClass',
            'itemsClass',
            'indicatorClass',
        ], this.options, 'ESJindicator');
        this.ComponentRender();
    }
    ComponentRender() {
        var _a;
        const self = this;
        //  document.querySelector(`.${this.options.indicatorClass as string}`).style = 'position: fixed; visibility: hidden;';
        document.querySelector(`.${this.options.indicatorClass}`).style = `position: ${this.options.indicatorPositionMode}; visibility: ${(this.options.indicatorDefaultHidden === true) ? 'hidden' : 'visible'};`;
        (_a = this.options.events) === null || _a === void 0 ? void 0 : _a.forEach(eventname => {
            document.querySelectorAll(`.${self.options.itemsClass}`).forEach((item) => {
                item.addEventListener(`${eventname}`, function (e) {
                    self.ComponentUi(item, e);
                });
            });
        });
    }
    ComponentUi(currentItem, event) {
        var _a;
        const self = this;
        let y = event.pageY;
        let x = event.pageX;
        const indicator = document.querySelector(`.${self.options.indicatorClass}`);
        const indicatorWidth = indicator === null || indicator === void 0 ? void 0 : indicator.clientWidth;
        const indicatorHeight = indicator === null || indicator === void 0 ? void 0 : indicator.clientHeight;
        const indicatorXmargin = (self.options.indicatorXmargin === 'auto') ? currentItem.clientWidth + 'px' : self.options.indicatorXmargin;
        const indicatorYmargin = (self.options.indicatorYmargin === 'auto') ? currentItem.clientHeight + 'px' : self.options.indicatorYmargin;
        (_a = self.options.events) === null || _a === void 0 ? void 0 : _a.forEach(eventname => {
            window.addEventListener(`${eventname}`, function (e) {
                if ((e.pageX + indicatorWidth) >= window.innerWidth && mode === 'x') {
                    indicator.style.left = `${window.innerWidth - indicatorWidth}px`;
                }
                if (indicator.getBoundingClientRect().left < 0 && mode === 'x') {
                    indicator.style.left = `0px`;
                }
            });
        });
        const mode = self.options.mode;
        if (self.options.indicatorRatio === 'center') {
            x = x - currentItem.scrollWidth / 2;
            y = y - currentItem.scrollHeight / 2;
        }
        else if (self.options.indicatorRatio === 'end') {
            x = x - currentItem.scrollWidth;
            y = y - currentItem.scrollHeight;
        }
        if (mode === 'both' || mode === 'x') {
            indicator.style.left = `${x}px`;
        }
        if (mode === 'both' || mode === 'y') {
            indicator.style.top = `${y}px`;
        }
        indicator.style.margin = `${indicatorYmargin} ${indicatorXmargin}`;
        indicator.style.transition = `${this.options.indicatorAnimationSpeed} `;
        if (self.options.indicatorMove)
            self.options.indicatorMove(indicator, currentItem);
    }
}
