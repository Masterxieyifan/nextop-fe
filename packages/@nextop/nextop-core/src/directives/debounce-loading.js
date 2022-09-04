/*
 * @Author: hongdong.liao
 * @Date: 2021-06-15 14:16:29
 * @LastEditors: hongdong.liao
 * @LastEditTime: 2021-06-15 14:26:32
 * @FilePath: /nextop/packages/@nextop/nextop-core/src/directives/debounce-loading.js
 */
import Vue from 'vue';
// render spinner loading
const componentRenderer = function(options) {
    return function(h) {
        return h('span', {
            class: {
                'debounce-btn__spinner-wrapper': true,
                'hidden' : !this.show,
                [options.direction] : options.direction,
            },
        }, [
            h('i', {
                class: {
                    'el-icon-loading': true,
                },
            })
        ]);
    };
};

// add or remove button loading class
const setBtnStatus = function(el, options, flag) {
    if (flag) {
        if (options.disable) el.setAttribute('disabled', 'disabled');
        el.classList.add('debounce-loading');
    } else {
        if (el.getAttribute('disabled') && options.disable) el.removeAttribute('disabled');
        el.classList.remove('debounce-loading');
    }
};

// debounce handler
const debounceHanlder = (el, options, spinnerVM, flag) => {
    if (options.loading) {
        spinnerVM.show = flag; //show spinner
    }
    if (options.disable) {
        setBtnStatus(el, options, flag);
    }
};

// create spinner vm
const createSpinner = (el, options) => {
    const spinner = {
        el: document.createElement('span'),
        data: { show: false, },
        render: componentRenderer(options),
    };
    if (options.direction === 'right') {
        el.appendChild(spinner.el);
    } else {
        const firstChild = el.firstChild;
        el.insertBefore(spinner.el, firstChild);
    }
    return new Vue(spinner);
};

//debounce
const debounce = (fun, el, options, spinnerVM) =>(
    function() {
        debounceHanlder(el, options, spinnerVM, true);
        el.timer && clearTimeout(el.timer);
        el.timer = setTimeout(function() {
            fun();
            debounceHanlder(el, options, spinnerVM, false);
            el.timer = null;
        }, options.time || 300);
    }
);

// button debounce and loding directive
export const debounceDirective = () => {
    Vue.directive('debounce', {
        bind(el, binding, vnode) {
            //bind params
            const options = {
                time: 300,
                loading: true,
                disable: true,
                direction: 'right',
                ...binding.value,
            };
            const spinnerVM = createSpinner(el, options);
            // native mode
            if (vnode.data.on && vnode.data.on.click) {
                const nativeEvt = (event) => {
                    event && event.stopImmediatePropagation();
                    !el.timer && debounce(vnode.data.on.click, el, options, spinnerVM)();
                };
                el.addEventListener('click', nativeEvt, true);
                el._evtFun = nativeEvt;
            }
            // component mode
            if (vnode.componentOptions && vnode.componentOptions.listeners && vnode.componentOptions.listeners.click) {
                const componentEvt = (event) => {
                    event && event.stopImmediatePropagation();
                    !el.timer && debounce(vnode.componentOptions.listeners.click, el, options, spinnerVM)();
                };
                el.addEventListener('click', componentEvt, true);
                el._evtFun = componentEvt;
            }
        },
        unbind(el) {
            el.removeEventListener('click', el._evtFun);
        },
    });
};
