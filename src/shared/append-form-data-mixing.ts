const DUDE_WHERES_MY_FORM = 'dude-where-is-my-form';

interface FormDataEvent extends Event {
    formData?: FormData;
}

export const DudeWheresMyForm = (
    superclass: typeof HTMLElement
): typeof HTMLElement =>
    class extends superclass {
        private parentForm?: HTMLFormElement = undefined;
        public constructor() {
            super();
            this.appendFormData = this.appendFormData.bind(this);
            this.addEventListener(
                DUDE_WHERES_MY_FORM,
                (event: Event) => {
                    const path = event.composedPath();
                    const form = path.find(
                        (el: EventTarget) => el instanceof HTMLFormElement
                    ) as HTMLFormElement;
                    this.parentForm = form;
                    if (this.parentForm) {
                        this.parentForm.addEventListener(
                            'formdata',
                            this.appendFormData
                        );
                    }
                },
                true
            );
        }
        public connectedCallback(): void {
            if (super.connectedCallback) {
                super.connectedCallback();
            }
            const formFindingEvent = new CustomEvent(DUDE_WHERES_MY_FORM, {
                composed: true,
            });
            this.dispatchEvent(formFindingEvent);
        }
        public disconnectedCallback(): void {
            if (this.parentForm) {
                this.parentForm.removeEventListener(
                    'formdata',
                    this.appendFormData
                );
            }
            if (super.disconnectedCallback) {
                super.disconnectedCallback();
            }
        }
        protected appendFormData({ formData }: FormDataEvent): void {
            console.warn(
                'Abstract `appendFormData` method must be overridden with alterations your element should make it the `formData` of the form element to which it is related.'
            );
        }
    };
