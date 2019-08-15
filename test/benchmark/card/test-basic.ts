import '../../../lib/card';
import { html } from 'lit-html';
import { measureFixtureCreation } from '../helpers';

measureFixtureCreation(html`
    <sp-card variant="gallery" title="Card Title" subtitle="JPG">
        <img slot="preview" src="https://picsum.photos/532/192" />
        <div slot="description">10/15/18</div>
        <div slot="footer">Footer</div>
    </sp-card>
`);
