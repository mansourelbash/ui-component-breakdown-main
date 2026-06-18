/**
 * Table — table.stories.js
 *
 * Data table with striped rows, hover highlights, and clickable column sorting.
 * Click any bold column header to sort. table.js powers sorting.
 */

const PLANS = [
  { name: "Ma'ak 50",  data: '75 GB',    price: 'JD 15.00', status: 'Active',   commitment: '12 months' },
  { name: "Ma'ak 70",  data: '187.5 GB', price: 'JD 20.42', status: 'Active',   commitment: '24 months' },
  { name: "Ma'ak 80",  data: '200 GB',   price: 'JD 22.00', status: 'Active',   commitment: '24 months' },
  { name: "Ma'ak 100", data: '250 GB',   price: 'JD 27.50', status: 'Pending',  commitment: '12 months' },
  { name: "Ma'ak 120", data: '300 GB',   price: 'JD 33.00', status: 'Inactive', commitment: '24 months' },
];

function statusBadge(s) {
  const map = { Active: 'success', Pending: 'warning', Inactive: 'neutral' };
  return `<span class="badge badge--${map[s] || 'neutral'}"><span class="badge__dot"></span>${s}</span>`;
}

function renderTable({ striped, hoverable, bordered, sortable, caption }) {
  const tableClass = ['table', striped ? 'table--striped' : '', hoverable ? 'table--hoverable' : '', bordered ? 'table--bordered' : ''].filter(Boolean).join(' ');
  const thSort = sortable ? ' table__th--sortable' : '';

  const rows = PLANS.map(p => `
    <tr class="table__row">
      <td class="table__td table__td--bold">${p.name}</td>
      <td class="table__td">${p.data}</td>
      <td class="table__td table__td--brand">${p.price}</td>
      <td class="table__td">${statusBadge(p.status)}</td>
      <td class="table__td table__td--muted">${p.commitment}</td>
    </tr>`).join('');

  return `
<div class="table-wrap">
  <table class="${tableClass}">
    <thead class="table__head">
      <tr>
        <th class="table__th${thSort}" data-sort="name">Plan</th>
        <th class="table__th${thSort}" data-sort="data">Data</th>
        <th class="table__th${thSort}" data-sort="price">Price</th>
        <th class="table__th">Status</th>
        <th class="table__th${thSort}" data-sort="commitment">Commitment</th>
      </tr>
    </thead>
    <tbody class="table__body">${rows}</tbody>
    ${caption ? `<tfoot><tr><td colspan="5" class="table__caption">${caption}</td></tr></tfoot>` : ''}
  </table>
</div>`;
}

export default {
  title: 'Components/Table',
  tags: ['autodocs'],
  render: renderTable,
  argTypes: {
    striped:   { control: 'boolean', description: 'Alternate row background colours.' },
    hoverable: { control: 'boolean', description: 'Highlight row on hover.' },
    bordered:  { control: 'boolean', description: 'Add borders around all cells.' },
    sortable:  { control: 'boolean', description: 'Enable click-to-sort on column headers.' },
    caption:   { control: 'text',    description: 'Optional table footer caption.' },
  },
};

export const Default   = { args: { striped: false, hoverable: false, bordered: false, sortable: false, caption: '' } };
export const Striped   = { args: { striped: true,  hoverable: false, bordered: false, sortable: false, caption: '' } };
export const Hoverable = { args: { striped: false, hoverable: true,  bordered: false, sortable: false, caption: '' } };
export const Bordered  = { args: { striped: false, hoverable: false, bordered: true,  sortable: false, caption: '' } };
export const Sortable  = { args: { striped: true,  hoverable: true,  bordered: false, sortable: true,  caption: 'Click column headers to sort.' } };
export const Full      = { name: 'All Features', args: { striped: true, hoverable: true, bordered: false, sortable: true, caption: '5 Ma\'ak postpaid plans — click headers to sort.' } };
