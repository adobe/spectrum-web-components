/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { html, TemplateResult } from '@spectrum-web-components/base';
import { boolean } from '@open-wc/demoing-storybook';

import '../sp-dialog.js';
import { landscape } from './images.js';
import '@spectrum-web-components/button/sp-button.js';

export default {
    title: 'Dialog',
    component: 'sp-dialog',
};

export const small = (): TemplateResult => {
    const noTransitions = boolean('No Transitions', false, 'Testing');
    return html`
        <sp-dialog open size="small" ?no-transitions=${noTransitions}>
            <h2 slot="title">Disclaimer</h2>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Auctor
            augue mauris augue neque gravida. Libero volutpat sed ornare arcu.
            Quisque egestas diam in arcu cursus euismod quis viverra. Posuere ac
            ut consequat semper viverra nam libero justo laoreet. Enim ut tellus
            elementum sagittis vitae et leo duis ut. Neque laoreet suspendisse
            interdum consectetur libero id faucibus nisl. Diam volutpat commodo
            sed egestas egestas. Dolor magna eget est lorem ipsum dolor. Vitae
            suscipit tellus mauris a diam maecenas sed. Turpis in eu mi bibendum
            neque egestas congue. Rhoncus est pellentesque elit ullamcorper
            dignissim cras lobortis.
        </sp-dialog>
    `;
};

export const medium = (): TemplateResult => {
    return html`
        <sp-dialog open size="medium">
            <h2 slot="title">Disclaimer</h2>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Auctor
            augue mauris augue neque gravida. Libero volutpat sed ornare arcu.
            Quisque egestas diam in arcu cursus euismod quis viverra. Posuere ac
            ut consequat semper viverra nam libero justo laoreet. Enim ut tellus
            elementum sagittis vitae et leo duis ut. Neque laoreet suspendisse
            interdum consectetur libero id faucibus nisl. Diam volutpat commodo
            sed egestas egestas. Dolor magna eget est lorem ipsum dolor. Vitae
            suscipit tellus mauris a diam maecenas sed. Turpis in eu mi bibendum
            neque egestas congue. Rhoncus est pellentesque elit ullamcorper
            dignissim cras lobortis.
        </sp-dialog>
    `;
};

export const large = (): TemplateResult => {
    return html`
        <sp-dialog open size="large">
            <h2 slot="title">Disclaimer</h2>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Auctor
            augue mauris augue neque gravida. Libero volutpat sed ornare arcu.
            Quisque egestas diam in arcu cursus euismod quis viverra. Posuere ac
            ut consequat semper viverra nam libero justo laoreet. Enim ut tellus
            elementum sagittis vitae et leo duis ut. Neque laoreet suspendisse
            interdum consectetur libero id faucibus nisl. Diam volutpat commodo
            sed egestas egestas. Dolor magna eget est lorem ipsum dolor. Vitae
            suscipit tellus mauris a diam maecenas sed. Turpis in eu mi bibendum
            neque egestas congue. Rhoncus est pellentesque elit ullamcorper
            dignissim cras lobortis.
        </sp-dialog>
    `;
};

export const dismissible = (): TemplateResult => {
    return html`
        <sp-dialog open size="medium" dismissible>
            <h2 slot="title">Disclaimer</h2>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Auctor
            augue mauris augue neque gravida. Libero volutpat sed ornare arcu.
            Quisque egestas diam in arcu cursus euismod quis viverra. Posuere ac
            ut consequat semper viverra nam libero justo laoreet. Enim ut tellus
            elementum sagittis vitae et leo duis ut. Neque laoreet suspendisse
            interdum consectetur libero id faucibus nisl. Diam volutpat commodo
            sed egestas egestas. Dolor magna eget est lorem ipsum dolor. Vitae
            suscipit tellus mauris a diam maecenas sed. Turpis in eu mi bibendum
            neque egestas congue. Rhoncus est pellentesque elit ullamcorper
            dignissim cras lobortis.
        </sp-dialog>
    `;
};

export const noDivider = (): TemplateResult => {
    return html`
        <sp-dialog open size="medium" dismissible no-divider>
            <h2 slot="title">Disclaimer</h2>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Auctor
            augue mauris augue neque gravida. Libero volutpat sed ornare arcu.
            Quisque egestas diam in arcu cursus euismod quis viverra. Posuere ac
            ut consequat semper viverra nam libero justo laoreet. Enim ut tellus
            elementum sagittis vitae et leo duis ut. Neque laoreet suspendisse
            interdum consectetur libero id faucibus nisl. Diam volutpat commodo
            sed egestas egestas. Dolor magna eget est lorem ipsum dolor. Vitae
            suscipit tellus mauris a diam maecenas sed. Turpis in eu mi bibendum
            neque egestas congue. Rhoncus est pellentesque elit ullamcorper
            dignissim cras lobortis.
        </sp-dialog>
    `;
};

export const hero = (): TemplateResult => {
    return html`
        <sp-dialog open size="medium" dismissible no-divider>
            <div slot="hero" style="background-image: url(${landscape})"></div>
            <h2 slot="title">Disclaimer</h2>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Auctor
            augue mauris augue neque gravida. Libero volutpat sed ornare arcu.
            Quisque egestas diam in arcu cursus euismod quis viverra. Posuere ac
            ut consequat semper viverra nam libero justo laoreet. Enim ut tellus
            elementum sagittis vitae et leo duis ut. Neque laoreet suspendisse
            interdum consectetur libero id faucibus nisl. Diam volutpat commodo
            sed egestas egestas. Dolor magna eget est lorem ipsum dolor. Vitae
            suscipit tellus mauris a diam maecenas sed. Turpis in eu mi bibendum
            neque egestas congue. Rhoncus est pellentesque elit ullamcorper
            dignissim cras lobortis.
        </sp-dialog>
    `;
};

export const alertConfirmation = (): TemplateResult => {
    return html`
        <sp-dialog open size="alert">
            <h2 slot="title">Enable Smart Filters?</h2>
            Smart filters are nondestructive and will preserve your original
            images.
            <sp-button variant="secondary" slot="button">Cancel</sp-button>
            <sp-button variant="cta" slot="button">Enable</sp-button>
        </sp-dialog>
    `;
};

export const alertInformation = (): TemplateResult => {
    return html`
        <sp-dialog open size="alert">
            <h2 slot="title">Enable Smart Filters?</h2>
            Smart filters are nondestructive and will preserve your original
            images.
            <sp-button variant="secondary" slot="button">Cancel</sp-button>
            <sp-button variant="primary" slot="button">Enable</sp-button>
        </sp-dialog>
    `;
};

export const alertDestructive = (): TemplateResult => {
    return html`
        <sp-dialog open size="alert">
            <h2 slot="title">Enable Smart Filters?</h2>
            Smart filters are nondestructive and will preserve your original
            images.
            <sp-button variant="secondary" slot="button">Cancel</sp-button>
            <sp-button variant="negative" slot="button">Enable</sp-button>
        </sp-dialog>
    `;
};

export const alertError = (): TemplateResult => {
    return html`
        <sp-dialog open size="alert" error>
            <h2 slot="title">Enable Smart Filters?</h2>
            Smart filters are nondestructive and will preserve your original
            images.
            <sp-button variant="secondary" slot="button">Cancel</sp-button>
            <sp-button variant="primary" slot="button">Enable</sp-button>
        </sp-dialog>
    `;
};

export const alertErrorWithLongTitle = (): TemplateResult => {
    return html`
        <sp-dialog open size="alert" error>
            <h2 slot="title">Unable to Share Project to Behance Community</h2>
            Smart filters are nondestructive and will preserve your original
            images.
            <sp-button variant="secondary" slot="button">Cancel</sp-button>
            <sp-button variant="primary" slot="button">Enable</sp-button>
        </sp-dialog>
    `;
};

export const fullscreen = (): TemplateResult => {
    return html`
        <sp-dialog open mode="fullscreen">
            <h2 slot="title">Enable Smart Filters?</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                sit amet, consectetur, adipisci velit, sed quia non numquam eius
                modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem. Ut enim ad minima veniam, quis nostrum
                exercitationem ullam corporis suscipit laboriosam, nisi ut
                aliquid ex ea commodi consequatur? Quis autem vel eum iure
                reprehenderit qui in ea voluptate velit esse quam nihil
                molestiae consequatur, vel illum qui dolorem eum fugiat quo
                voluptas nulla pariatur?
            </p>
            <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                rerum facilis est et expedita distinctio. Nam libero tempore,
                cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus id quod maxime placeat facere possimus, omnis voluptas
                assumenda est, omnis dolor repellendus. Temporibus autem
                quibusdam et aut officiis debitis aut rerum necessitatibus saepe
                eveniet ut et voluptates repudiandae sint et molestiae non
                recusandae. Itaque earum rerum hic tenetur a sapiente delectus,
                ut aut reiciendis voluptatibus maiores alias consequatur aut
                perferendis doloribus asperiores repellat.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                sit amet, consectetur, adipisci velit, sed quia non numquam eius
                modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem. Ut enim ad minima veniam, quis nostrum
                exercitationem ullam corporis suscipit laboriosam, nisi ut
                aliquid ex ea commodi consequatur? Quis autem vel eum iure
                reprehenderit qui in ea voluptate velit esse quam nihil
                molestiae consequatur, vel illum qui dolorem eum fugiat quo
                voluptas nulla pariatur?
            </p>
            <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                rerum facilis est et expedita distinctio. Nam libero tempore,
                cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus id quod maxime placeat facere possimus, omnis voluptas
                assumenda est, omnis dolor repellendus. Temporibus autem
                quibusdam et aut officiis debitis aut rerum necessitatibus saepe
                eveniet ut et voluptates repudiandae sint et molestiae non
                recusandae. Itaque earum rerum hic tenetur a sapiente delectus,
                ut aut reiciendis voluptatibus maiores alias consequatur aut
                perferendis doloribus asperiores repellat.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                sit amet, consectetur, adipisci velit, sed quia non numquam eius
                modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem. Ut enim ad minima veniam, quis nostrum
                exercitationem ullam corporis suscipit laboriosam, nisi ut
                aliquid ex ea commodi consequatur? Quis autem vel eum iure
                reprehenderit qui in ea voluptate velit esse quam nihil
                molestiae consequatur, vel illum qui dolorem eum fugiat quo
                voluptas nulla pariatur?
            </p>
            <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                rerum facilis est et expedita distinctio. Nam libero tempore,
                cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus id quod maxime placeat facere possimus, omnis voluptas
                assumenda est, omnis dolor repellendus. Temporibus autem
                quibusdam et aut officiis debitis aut rerum necessitatibus saepe
                eveniet ut et voluptates repudiandae sint et molestiae non
                recusandae. Itaque earum rerum hic tenetur a sapiente delectus,
                ut aut reiciendis voluptatibus maiores alias consequatur aut
                perferendis doloribus asperiores repellat.
            </p>
            <div slot="footer">
                Anything in the footer is sticky and aligned right.
            </div>
            <sp-button variant="secondary" slot="button">
                Cancel
            </sp-button>
            <sp-button variant="cta" slot="button">Enable</sp-button>
        </sp-dialog>
    `;
};

export const fullscreenTakeover = (): TemplateResult => {
    return html`
        <sp-dialog open mode="fullscreenTakeover">
            <h2 slot="title">Enable Smart Filters?</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                sit amet, consectetur, adipisci velit, sed quia non numquam eius
                modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem. Ut enim ad minima veniam, quis nostrum
                exercitationem ullam corporis suscipit laboriosam, nisi ut
                aliquid ex ea commodi consequatur? Quis autem vel eum iure
                reprehenderit qui in ea voluptate velit esse quam nihil
                molestiae consequatur, vel illum qui dolorem eum fugiat quo
                voluptas nulla pariatur?
            </p>
            <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                rerum facilis est et expedita distinctio. Nam libero tempore,
                cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus id quod maxime placeat facere possimus, omnis voluptas
                assumenda est, omnis dolor repellendus. Temporibus autem
                quibusdam et aut officiis debitis aut rerum necessitatibus saepe
                eveniet ut et voluptates repudiandae sint et molestiae non
                recusandae. Itaque earum rerum hic tenetur a sapiente delectus,
                ut aut reiciendis voluptatibus maiores alias consequatur aut
                perferendis doloribus asperiores repellat.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                sit amet, consectetur, adipisci velit, sed quia non numquam eius
                modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem. Ut enim ad minima veniam, quis nostrum
                exercitationem ullam corporis suscipit laboriosam, nisi ut
                aliquid ex ea commodi consequatur? Quis autem vel eum iure
                reprehenderit qui in ea voluptate velit esse quam nihil
                molestiae consequatur, vel illum qui dolorem eum fugiat quo
                voluptas nulla pariatur?
            </p>
            <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                rerum facilis est et expedita distinctio. Nam libero tempore,
                cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus id quod maxime placeat facere possimus, omnis voluptas
                assumenda est, omnis dolor repellendus. Temporibus autem
                quibusdam et aut officiis debitis aut rerum necessitatibus saepe
                eveniet ut et voluptates repudiandae sint et molestiae non
                recusandae. Itaque earum rerum hic tenetur a sapiente delectus,
                ut aut reiciendis voluptatibus maiores alias consequatur aut
                perferendis doloribus asperiores repellat.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                sit amet, consectetur, adipisci velit, sed quia non numquam eius
                modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem. Ut enim ad minima veniam, quis nostrum
                exercitationem ullam corporis suscipit laboriosam, nisi ut
                aliquid ex ea commodi consequatur? Quis autem vel eum iure
                reprehenderit qui in ea voluptate velit esse quam nihil
                molestiae consequatur, vel illum qui dolorem eum fugiat quo
                voluptas nulla pariatur?
            </p>
            <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                rerum facilis est et expedita distinctio. Nam libero tempore,
                cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus id quod maxime placeat facere possimus, omnis voluptas
                assumenda est, omnis dolor repellendus. Temporibus autem
                quibusdam et aut officiis debitis aut rerum necessitatibus saepe
                eveniet ut et voluptates repudiandae sint et molestiae non
                recusandae. Itaque earum rerum hic tenetur a sapiente delectus,
                ut aut reiciendis voluptatibus maiores alias consequatur aut
                perferendis doloribus asperiores repellat.
            </p>
            <div slot="footer">
                Anything in the footer is sticky and aligned right.
            </div>
            <sp-button variant="secondary" slot="button">
                Cancel
            </sp-button>
            <sp-button variant="cta" slot="button">Enable</sp-button>
        </sp-dialog>
    `;
};
