// Global styles — tokens must load before component CSS
import '../src/styles/tokens.css';
import '../src/styles/base.css';

// Component CSS — imported here so every story gets styles automatically
import '../src/components/breadcrumb/breadcrumb.css';
import '../src/components/action-buttons/action-buttons.css';
import '../src/components/promo-banner/promo-banner.css';
import '../src/components/feature-list/feature-list.css';
import '../src/components/free-addons/free-addons.css';
import '../src/components/toggle-group/toggle-group.css';
import '../src/components/commitment-plan-card/commitment-plan-card.css';
import '../src/components/number-selector/number-selector.css';
import '../src/components/quantity-stepper/quantity-stepper.css';
import '../src/components/price-display/price-display.css';
import '../src/components/cta-buttons/cta-buttons.css';

// ── New components ──────────────────────────────────────────────────────
import '../src/components/modal/modal.css';
import '../src/components/tooltip/tooltip.css';
import '../src/components/carousel/carousel.css';
import '../src/components/collapse/collapse.css';
import '../src/components/input/input.css';
import '../src/components/textarea/textarea.css';

// jQuery — assigned to window so component .js files work identically
// to how they work when loaded via CDN on a plain HTML page
import $ from 'jquery';
window.$ = window.jQuery = $;

// Component JS — use require() (not import) so these modules execute
// AFTER the window.jQuery assignment above, not before it (import is hoisted).
require('../src/components/action-buttons/action-buttons.js');
require('../src/components/toggle-group/toggle-group.js');
require('../src/components/commitment-plan-card/commitment-plan-card.js');
require('../src/components/quantity-stepper/quantity-stepper.js');
require('../src/components/cta-buttons/cta-buttons.js');

// ── New component JS ────────────────────────────────────────────────────
require('../src/components/modal/modal.js');
require('../src/components/tooltip/tooltip.js');
require('../src/components/carousel/carousel.js');
require('../src/components/collapse/collapse.js');
require('../src/components/input/input.js');
require('../src/components/textarea/textarea.js');

/** @type { import('@storybook/html').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    layout: 'padded',
  },
};

export default preview;
