/**
 * Pagination — pagination.stories.js
 *
 * Page navigation bar. Click any page number or prev/next.
 * pagination.js tracks state and fires pagination:change event.
 */

function buildPages(total, current) {
  const pages = [];

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
    return pages.map(p => `<button class="pagination__item${p === current ? ' pagination__item--active' : ''}" data-page="${p}">${p}</button>`).join('');
  }

  // Always show 1
  pages.push(`<button class="pagination__item${current === 1 ? ' pagination__item--active' : ''}" data-page="1">1</button>`);

  if (current > 3)  pages.push(`<span class="pagination__ellipsis">…</span>`);

  const start = Math.max(2, current - 1);
  const end   = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) {
    pages.push(`<button class="pagination__item${i === current ? ' pagination__item--active' : ''}" data-page="${i}">${i}</button>`);
  }

  if (current < total - 2) pages.push(`<span class="pagination__ellipsis">…</span>`);

  pages.push(`<button class="pagination__item${current === total ? ' pagination__item--active' : ''}" data-page="${total}">${total}</button>`);
  return pages.join('');
}

function renderPagination({ totalPages, currentPage, size, pill, showLabel }) {
  const cls = ['pagination', size !== 'default' ? 'pagination--' + size : '', pill ? 'pagination--pill' : ''].filter(Boolean).join(' ');
  const prevDisabled = currentPage <= 1 ? 'disabled' : '';
  const nextDisabled = currentPage >= totalPages ? 'disabled' : '';

  return `
<div style="display:flex;flex-direction:column;gap:12px;align-items:flex-start;">
  <nav class="${cls}" aria-label="Pagination" data-total-pages="${totalPages}" data-current-page="${currentPage}">
    <button class="pagination__btn pagination__btn--prev" ${prevDisabled} aria-label="Previous page">&#8249;</button>
    ${buildPages(totalPages, currentPage)}
    <button class="pagination__btn pagination__btn--next" ${nextDisabled} aria-label="Next page">&#8250;</button>
  </nav>
  ${showLabel ? `<p style="font-size:12px;color:var(--color-text-secondary);">Page ${currentPage} of ${totalPages}</p>` : ''}
</div>`;
}

export default {
  title: 'Components/Pagination',
  tags: ['autodocs'],
  render: renderPagination,
  argTypes: {
    totalPages:  { control: 'number',  description: 'Total number of pages.' },
    currentPage: { control: 'number',  description: 'Currently active page.' },
    size:        { control: 'radio',   options: ['default', 'sm', 'lg'], description: 'Size variant.' },
    pill:        { control: 'boolean', description: 'Use pill-shaped buttons.' },
    showLabel:   { control: 'boolean', description: 'Show "Page X of Y" label.' },
  },
};

export const Default     = { args: { totalPages: 10, currentPage: 1,  size: 'default', pill: false, showLabel: false } };
export const MiddlePage  = { args: { totalPages: 10, currentPage: 5,  size: 'default', pill: false, showLabel: true  } };
export const LastPage    = { args: { totalPages: 10, currentPage: 10, size: 'default', pill: false, showLabel: false } };
export const FewPages    = { args: { totalPages: 5,  currentPage: 3,  size: 'default', pill: false, showLabel: false } };
export const SinglePage  = { args: { totalPages: 1,  currentPage: 1,  size: 'default', pill: false, showLabel: false } };
export const PillStyle   = { args: { totalPages: 8,  currentPage: 4,  size: 'default', pill: true,  showLabel: false } };
export const Large       = { args: { totalPages: 8,  currentPage: 3,  size: 'lg',      pill: false, showLabel: true  } };
export const Small       = { args: { totalPages: 8,  currentPage: 3,  size: 'sm',      pill: false, showLabel: false } };
