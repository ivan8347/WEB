// JavaScript source code
const elements = [
    {
        num: 1,
        sym: "H",
        name: "Водород",
        group: 1,
        period: 1,
        series: "nonmetal",
        block: "s",
        x: 1,
        y: 1
    },
    {
        num: 2,
        sym: "He",
        name: "Гелий",
        group: 18,
        period: 1,
        series: "noble",
        block: "s",
        x: 18,
        y: 1
    },
    {
        num: 3,
        sym: "Li",
        name: "Литий",
        group: 1,
        period: 2,
        series: "alkali",
        block: "s",
        x: 1,
        y: 2
    },
    {
        num: 4,
        sym: "Be",
        name: "Бериллий",
        group: 2,
        period: 2,
        series: "alkaline",
        block: "s",
        x: 2,
        y: 2
    },
    {
        num: 10,
        sym: "Ne",
        name: "Неон",
        group: 18,
        period: 2,
        series: "noble",
        block: "p",
        x: 18,
        y: 2
    },
    // ... дальше заполняешь все элементы
];
const ptable = document.getElementById('ptable');
const popup = document.getElementById('popup');
const popupClose = document.getElementById('popup-close');

const pName = document.getElementById('p-name');
const pSym = document.getElementById('p-sym');
const pNum = document.getElementById('p-num');
const pGroup = document.getElementById('p-group');
const pPeriod = document.getElementById('p-period');
const pSeries = document.getElementById('p-series');

let currentMode = 'series';

function renderTable(filterText = "") {
    ptable.innerHTML = "";

    elements.forEach(el => {
        // фильтр по поиску
        if (filterText) {
            const t = filterText.toLowerCase();
            if (!el.sym.toLowerCase().includes(t) &&
                !el.name.toLowerCase().includes(t)) {
                return;
            }
        }

        const div = document.createElement('div');
        div.classList.add('element');
        div.style.gridColumn = el.x;
        div.style.gridRow = el.y;

        // режим раскраски
        if (currentMode === 'series') {
            div.classList.add(`series-${el.series}`);
        } else if (currentMode === 'blocks') {
            div.style.background = el.block === 's' ? '#ffcc66'
                : el.block === 'p' ? '#66ffcc'
                    : el.block === 'd' ? '#66ccff'
                        : '#ff9966';
        } else if (currentMode === 'props') {
            // тут можно раскрашивать по другим свойствам (металл/неметалл и т.п.)
            div.classList.add(`series-${el.series}`);
        }

        div.innerHTML = `
            <div>${el.num}</div>
            <div style="font-size:18px;font-weight:bold;">${el.sym}</div>
            <div style="font-size:10px;">${el.name}</div>
        `;

        div.addEventListener('click', () => showPopup(el));

        ptable.appendChild(div);
    });
}

function showPopup(el) {
    pName.textContent = el.name;
    pSym.textContent = el.sym;
    pNum.textContent = el.num;
    pGroup.textContent = el.group;
    pPeriod.textContent = el.period;
    pSeries.textContent = el.series;
    popup.classList.remove('hidden');
}

popupClose.addEventListener('click', () => {
    popup.classList.add('hidden');
});

popup.addEventListener('click', (e) => {
    if (e.target === popup) {
        popup.classList.add('hidden');
    }
});

// переключение режимов
document.querySelectorAll('.controls button').forEach(btn => {
    btn.addEventListener('click', () => {
        currentMode = btn.dataset.mode;
        renderTable(document.getElementById('search').value);
    });
});

// поиск
document.getElementById('search').addEventListener('input', (e) => {
    renderTable(e.target.value);
});

// стартовый рендер
renderTable();
