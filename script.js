// ---------- 01 Radiobutton ----------
document.querySelectorAll('input[name="delivery"]').forEach((radio) => {
  radio.addEventListener('change', (e) => {
    document.getElementById('radio-output').textContent = `Обрано: ${e.target.value}`;
  });
});

// ---------- 02 Checkbox ----------
const prefs = document.querySelectorAll('.pref');
function updateCheckboxOutput() {
  const checked = document.querySelectorAll('.pref:checked').length;
  document.getElementById('checkbox-output').textContent = `Позначено: ${checked} із ${prefs.length}`;
}
prefs.forEach((cb) => cb.addEventListener('change', updateCheckboxOutput));

// ---------- 03 Text input ----------
const nameField = document.getElementById('name-field');
nameField.addEventListener('input', () => {
  const value = nameField.value.trim();
  const greeting = value ? `Привіт, ${value}!` : 'Привіт, незнайомцю!';
  document.getElementById('text-output').textContent = `${greeting} (${nameField.value.length}/24)`;
});

// ---------- 04 Tabs ----------
const tabButtons = document.querySelectorAll('.tab-btn');
tabButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    document.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach((p) => p.classList.remove('active'));
    btn.classList.add('active');
    document.querySelector(`.tab-panel[data-panel="${target}"]`).classList.add('active');
  });
});

// ---------- 05 Button ----------
let clickCount = 0;
document.getElementById('count-btn').addEventListener('click', () => {
  clickCount += 1;
  document.getElementById('button-output').textContent = `Натискань: ${clickCount}`;
});

// ---------- 07 Link (expandable "read more") ----------
document.getElementById('reveal-link').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('reveal-text').classList.toggle('hidden');
});

// ---------- 08 Tooltip (tap support for touch devices) ----------
const infoIcon = document.querySelector('.info-icon');
infoIcon.addEventListener('click', () => infoIcon.classList.toggle('show'));
document.addEventListener('click', (e) => {
  if (!e.target.closest('.tooltip-wrap')) infoIcon.classList.remove('show');
});

// ---------- 09 Dropdown ----------
const planSelect = document.getElementById('plan-select');
planSelect.addEventListener('change', () => {
  const label = planSelect.options[planSelect.selectedIndex].text;
  const [name, price] = label.split(' — ');
  document.getElementById('plan-output').textContent = `Обрано план «${name}» — ${price}`;
});

// ---------- 10 Data grid ----------
const products = [
  { name: 'Термокружка', category: 'Посуд', price: 349, stock: 24 },
  { name: 'Рюкзак 30л', category: 'Спорядження', price: 1290, stock: 8 },
  { name: 'Ліхтар налобний', category: 'Електроніка', price: 620, stock: 0 },
  { name: 'Килимок туристичний', category: 'Спорядження', price: 480, stock: 15 },
  { name: 'Пальник газовий', category: 'Кухня', price: 890, stock: 5 },
];

const gridBody = document.getElementById('grid-body');
let sortKey = null;
let sortAsc = true;

function renderGrid() {
  gridBody.innerHTML = products
    .map(
      (p) => `<tr>
        <td>${p.name}</td>
        <td>${p.category}</td>
        <td>${p.price}</td>
        <td>${p.stock > 0 ? p.stock : 'немає'}</td>
      </tr>`
    )
    .join('');
}

document.querySelectorAll('#data-grid th').forEach((th) => {
  th.addEventListener('click', () => {
    const key = th.dataset.key;
    const type = th.dataset.type;
    sortAsc = sortKey === key ? !sortAsc : true;
    sortKey = key;

    products.sort((a, b) => {
      if (type === 'number') return sortAsc ? a[key] - b[key] : b[key] - a[key];
      return sortAsc
        ? a[key].localeCompare(b[key], 'uk')
        : b[key].localeCompare(a[key], 'uk');
    });

    document.querySelectorAll('#data-grid th').forEach((h) => h.classList.remove('sorted', 'asc'));
    th.classList.add('sorted');
    if (sortAsc) th.classList.add('asc');

    renderGrid();
  });
});

renderGrid();
