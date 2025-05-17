let cookies = 0;
let cps = 1;
let autoclick = false;
let upgrades;

const cookie = document.querySelector('#cookie');
const clickSound = document.querySelector('#click')

const overlay = document.querySelector('#overlay');

const openShopBtn = document.querySelector('#open-shop');
const closeShopBtn = document.querySelector('#close-shop')
const shop = document.querySelector('#shop');
const shopSections = document.querySelector('#shop-sections');
const shopItems = document.querySelector('#shop-items');


// CLICKER FUNCTIONS

const handleCookieClick = (e) => {
    cookies += cps;
    document.querySelector('#num-cookies').textContent = `Cookies: ${cookies}`;

    playClick();
    const elements = spawnCookie(e);

    setTimeout(() => {
        destroyCookie(elements);
    }, 1000);
};

cookie.addEventListener('click', handleCookieClick);

const handleAutoclick = () => {
    if (autoclick) {
        cookies += cps;
        document.querySelector('#num-cookies').textContent = `Cookies: ${cookies}`
    };
};

setInterval(() => {
    handleAutoclick()
}, 1000);


// EFFECTS

// SFX

const playClick = () => {
    clickSound.currentTime = 0;
    clickSound.play();
};

// VFX

const spawnCookie = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const tilt = Math.random() * 60 - 30;
    const randCoords = getRandomCoords(60);

    const el = document.createElement('div');
    const p = document.createElement('p');
    const img = document.createElement('img');
    const randImg = document.createElement('img');

    el.style.position = 'absolute';
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.zIndex = 2;
    el.style.display = 'flex';
    el.style.flexDirection = 'column';
    el.style.rotate = `${tilt}deg`;
    el.style.pointerEvents = 'none';

    p.textContent = `+${cps}`;
    p.style.fontFamily = 'RubikGemstones';
    p.style.color = 'white';

    img.style.height = '20px';
    img.style.width = '20px';
    img.style.borderRadius = 'calc(infinity * 1px)'
    img.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
    img.src = 'assets/media/images/cookie.svg';
    img.ariaHidden = true;

    randImg.style.height = '50px';
    randImg.style.width = 'auto';
    randImg.style.position = 'absolute';
    randImg.style.left = `${randCoords.x}px`;
    randImg.style.top = `${randCoords.y}px`;
    randImg.style.borderRadius = 'calc(infinity * 1px)'
    randImg.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
    randImg.src = 'assets/media/images/cookie.svg';
    randImg.ariaHidden = true;
    randImg.classList.add('animate-cookie-fall');

    el.appendChild(p);
    el.appendChild(img);

    document.body.appendChild(el);
    document.body.appendChild(randImg);

    return [el, randImg];
};

const destroyCookie = (elements) => {
    document.body.removeChild(elements[0]);
    document.body.removeChild(elements[1]);
};


// SHOP FUNCTIONS

const handleLoadShop = async () => {
    if (!upgrades) {
        const req = await fetch('https://cookie-upgrade-api.vercel.app/api/upgrades')
        upgrades = await req.json();
    };

    for (const [k, v] of Object.entries(upgrades)) {
        const el = document.createElement('div');
        el.id = `shop-item-${v.id}`;

        const cost = document.createElement('p');
        cost.textContent = `Cost: ${v.cost}`;

        const name = document.createElement('h3');
        name.textContent = v.name;

        const description = document.createElement('p');

        if (v.name.toLowerCase().includes('auto')) {
            if (autoclick) {
                cost.textContent = 'Purchased';
                el.style.color = '#ccc';
                el.style.pointerEvents = 'none';
                el.tabIndex = -1;
            }
            description.textContent = 'Enable Autoclick'
        } else {
            description.textContent = `Increase CPS by: ${v.increase}`;
        };

        el.appendChild(cost);
        el.appendChild(name);
        el.appendChild(description)
        el.classList.add('shop-item');
        el.tabIndex = 0;
        el.addEventListener('click', handleShopPurchase);

        shopItems.appendChild(el);
    };
};

const openShop = () => {
    shop.style.display = 'flex';
    overlay.style.display = 'flex';
};

const closeShop = () => {
    shop.style.display = 'none';
    overlay.style.display = 'none';
};

const handleShopPurchase = (e) => {
    const upgradeTile = e.currentTarget;
    const id = Number(upgradeTile.id.split('-')[2]);
    let upgrade;

    for (const i in upgrades) {
        if (upgrades[i].id === id) {
            upgrade = upgrades[i];

            break;
        };
    };

    if (cookies >= upgrade.cost) {
        cookies -= upgrade.cost;
        upgrade.cost = Math.round(upgrade.cost * 1.25);
        upgradeTile.querySelector('p').textContent = `Cost: ${upgrade.cost}`;


        if (upgrade.name.toLowerCase().includes('auto')) {
            autoclick = true;

            upgradeTile.querySelector('p').textContent = 'Purchased';
            upgradeTile.style.background = 'white';
            upgradeTile.style.color = '#ccc';
            upgradeTile.style.pointerEvents = 'none';
            upgradeTile.tabIndex = -1;
        } else {
            cps += upgrade.increase;
            document.querySelector('#cps').textContent = `CPS: ${cps}`;
        };

        document.querySelector('#num-cookies').textContent = `Cookies: ${cookies}`;
    } else {
        return;
    };
};

openShopBtn.addEventListener('click', openShop);
closeShopBtn.addEventListener('click', closeShop);


// LOADING + SAVING OF DATA

const handleSave = () => {
    const data = {
        cookies: cookies,
        cps: cps,
        autoclick: autoclick,
        upgrades: upgrades
    };

    localStorage.setItem('data', JSON.stringify(data));
};

const handleLoad = () => {
    if (localStorage.getItem('data')) {
        const data = JSON.parse(localStorage.getItem('data'));

        cookies = Number(data.cookies);
        cps = Number(data.cps);
        autoclick = Boolean(data.autoclick)
        upgrades = data.upgrades;

        document.querySelector('#num-cookies').textContent = `Cookies: ${cookies}`;
        document.querySelector('#cps').textContent = `CPS: ${cps}`;
    };
};

window.addEventListener('beforeunload', handleSave);
window.addEventListener('load', handleLoad);
window.addEventListener('load', handleLoadShop);


// HELPERS

const getRandomCoords = (padding = null) => {
    const x = Math.random() * (window.innerWidth - padding * 2) + padding;
    const y = Math.random() * (window.innerHeight - padding * 2) + padding;

    return {x, y}
};