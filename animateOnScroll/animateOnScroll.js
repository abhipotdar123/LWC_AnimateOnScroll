/**
 * @description
 * This component is used to animate cards on scroll. It utilizes the IntersectionObserver API
 * to detect when each card enters the viewport and animates it into view. This technique is ideal
 * for lazy loading content as the user scrolls.
 *
 * @author Abhinav Potdar
 * @date 2025-01-23
 * @component AnimateOnScroll
 * @version 1.0
 */

import { LightningElement } from 'lwc';

export default class AnimateOnScroll extends LightningElement {
    items = [
        {
            title: 'Constructor()',
            description: 'Invoked when the instance of the component is created, this is similar to the init() method in the aura component. This hook is fired in the parent component first since it flows from parent to child. Child elements can’t be accessed because they don’t exist yet. Element properties are assigned to the component after construction, so do not access them as they are not yet in existence (public properties decorated with @api). It is necessary to invoke super() from the constructor, since the Lightning web component extends LightningElement which has a constructor and is not supposed to bypass the parent class constructor (To assign the correct property (prototype) and set a value to ‘this’ attribute).'
        },
        {
            title: 'ConnectedCallback()',
            description: 'Invoked when the component is inserted into DOM. Child elements can’t be accessed because they don’t exist yet. This hook flows from parent component to child component. Eventually this method is invoked, all the public properties (decorated with @api) would have been received from the parent component by which we can call an apex method which requires these public properties as input parameters. In order to verify if a component is connected to DOM, the isConnected property can be used. Parent elements can be accessed and modified in this lifecycle hook.'
        },
        {
            title: 'Render()',
            description: 'Invoked after the execution of connectedCallback() method. This hook is used to override the standard rendering functionality in Lightning web components & to update the UI. It flows from parent component to child component. Rendering process can be controlled by conditionally rendering the template on the basis of certain conditions or criteria. This hook is not technically a lifecycle hook. It is a protected method on the LightningElement class.'
        },
        {
            title: 'RenderedCallback()',
            description: 'Invoked when a component is completely rendered on UI. This hook should be used cautiously so that an infinite rendering loop is not triggered since this hook is called after the component gets rendered every time. Make sure to use a private boolean property like isRendered to track whether renderedCallback() has been executed. Not recommended to use renderedCallback() to change the state of the component instead use getter and setter. Reactive property in renderedCallback() leads to infinite loop.'
        },
        {
            title: 'disconnectedCallback()',
            description: 'Invoked when the component is removed from the DOM. This lifecycle hook is essential for cleanup tasks such as removing event listeners, canceling network requests, or destroying any side-effects created during the component’s lifecycle. It is a good place to release resources that are no longer needed after the component is destroyed, ensuring optimal performance and memory management.'
        },
        {
            title: 'ErrorCallback(error, stack)',
            description: 'Invoked when the component throws error in one of the lifecycle hooks (instantiating the component, connecting or rendering). Similar to JavaScript catch{} block, error and stack are the two arguments. error is JavaScript native error object whereas stack is a string. To capture the stack information and render a different template when error occurred.'
        }
    ];


    observer;

    renderedCallback() {
        if (!this.observer) {
            const cards = this.template.querySelectorAll('.card.hidden');
            this.observer = new IntersectionObserver(this.handleIntersect.bind(this), {
                root: null,
                rootMargin: '0px',
                threshold: 0.5,
            });

            cards.forEach((card) => this.observer.observe(card));
        }
    }

    handleIntersect(entries) {
        entries.forEach((entry) => {
            const target = entry.target;
            if (entry.isIntersecting) {
                target.classList.add('visible');
                target.classList.remove('hidden');
                this.observer.unobserve(target);
            }
        });
    }

    disconnectedCallback() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}