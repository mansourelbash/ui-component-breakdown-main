/**
 * Carousel — carousel.stories.js
 *
 * Click prev/next arrows or dots to navigate.
 * Set data-interval for auto-play. data-loop for wrap-around.
 */

function buildSlide(slide) {
  return `
  <div class="carousel__slide">
    <div class="carousel__slide-inner" style="background:${slide.bg || '#F5F5F5'}; min-height:260px;">
      <p style="font-size:56px; margin-bottom:16px; line-height:1;">${slide.icon || '📱'}</p>
      <h3 style="font-size:18px; font-weight:700; color:var(--color-neutral-900); margin-bottom:8px;">${slide.title}</h3>
      <p style="font-size:14px; color:var(--color-neutral-600); max-width:320px;">${slide.text}</p>
    </div>
  </div>`;
}

function renderCarousel({ slides, loop, interval, showDots, showArrows }) {
  const dots = slides.map((_, i) =>
    `<button class="carousel__dot${i === 0 ? ' is-active' : ''}" aria-label="Go to slide ${i + 1}"></button>`
  ).join('');

  return `
<div class="carousel" data-loop="${loop}" data-interval="${interval}">
  <div class="carousel__track">
    ${slides.map(buildSlide).join('')}
  </div>
  ${showArrows ? `
  <button class="carousel__btn carousel__btn--prev" aria-label="Previous">&#8249;</button>
  <button class="carousel__btn carousel__btn--next" aria-label="Next">&#8250;</button>` : ''}
  ${showDots ? `<div class="carousel__dots">${dots}</div>` : ''}
</div>`;
}

const SLIDES = [
  { title: "Ma'ak 70 Plan",         text: "187.5 GB + Free 5G — JD 20.42 first month",          bg: '#FFF5EC', icon: '📶' },
  { title: 'Exclusive eShop Offer', text: 'Get an extra 25% GB when you subscribe online',        bg: '#FFF0E6', icon: '🛒' },
  { title: 'Free Add-Ons',          text: 'TOD · Anghami Plus · OSN+ bundled at no extra cost',  bg: '#FEF3E8', icon: '🎬' },
  { title: '5G Coverage',           text: 'Experience blazing-fast 5G across Jordan',             bg: '#FFF8F2', icon: '⚡' },
];

export default {
  title: 'Components/Carousel',
  tags: ['autodocs'],
  render: renderCarousel,
  argTypes: {
    slides:     { control: 'object',  description: 'Array of slide objects: { title, text, bg, icon }.' },
    loop:       { control: 'boolean', description: 'Wrap around at first/last slide.' },
    interval:   { control: 'number',  description: 'Auto-advance interval in ms. 0 = disabled.' },
    showDots:   { control: 'boolean', description: 'Show dot navigation indicators.' },
    showArrows: { control: 'boolean', description: 'Show prev/next arrow buttons.' },
  },
};

/** Default — arrows + dots, no loop */
export const Default = {
  args: { slides: SLIDES, loop: false, interval: 0, showDots: true, showArrows: true },
};

/** Looping — wraps around at ends */
export const Looping = {
  args: { slides: SLIDES, loop: true, interval: 0, showDots: true, showArrows: true },
};

/** Auto-play every 2.5 s */
export const AutoPlay = {
  args: { slides: SLIDES, loop: true, interval: 2500, showDots: true, showArrows: true },
};

/** Dots only — no arrows */
export const DotsOnly = {
  args: { slides: SLIDES, loop: true, interval: 0, showDots: true, showArrows: false },
};

/** Arrows only — no dots */
export const ArrowsOnly = {
  args: { slides: SLIDES, loop: false, interval: 0, showDots: false, showArrows: true },
};

/** Two slides */
export const TwoSlides = {
  args: { slides: SLIDES.slice(0, 2), loop: false, interval: 0, showDots: true, showArrows: true },
};

/** Single slide — no navigation needed */
export const SingleSlide = {
  args: { slides: [SLIDES[0]], loop: false, interval: 0, showDots: false, showArrows: false },
};
