const root = document.querySelector(':root');

const backgroundColorBtn = document.querySelector('#background-color');
const primaryColorBtn = document.querySelector('#primary-color');
const secondaryColorBtn = document.querySelector('#secondary-color');
const accentColorBtn = document.querySelector('#accent-color');
const textColorBtn = document.querySelector('#text-color');

const updateBackground = (e) => {
    root.style.setProperty('--bg', e.target.value);
    updateContrast();
};

const updatePrimary = (e) => {
    root.style.setProperty('--primary', e.target.value);
    updateContrast();
};

const updateSecondary = (e) => {
    root.style.setProperty('--secondary', e.target.value);
    updateContrast();
};

const updateAccent = (e) => {
    root.style.setProperty('--accent', e.target.value);
    updateContrast();
};

const updateText = (e) => {
    root.style.setProperty('--text', e.target.value);
    updateContrast();
};

backgroundColorBtn.addEventListener('change', updateBackground);
primaryColorBtn.addEventListener('change', updatePrimary);
secondaryColorBtn.addEventListener('change', updateSecondary);
accentColorBtn.addEventListener('change', updateAccent);
textColorBtn.addEventListener('change', updateText);

const saveTheme = () => {
    const theme = {
        background: backgroundColorBtn.value,
        primary: primaryColorBtn.value,
        secondary: secondaryColorBtn.value,
        accent: accentColorBtn.value,
        text: textColorBtn.value
    };

    console.table(theme)
    localStorage.setItem('theme', JSON.stringify(theme));
};

const loadTheme = () => {
    if (localStorage.getItem('theme')) {
        const theme = JSON.parse(localStorage.getItem('theme'));

        for (const [k, v] of Object.entries(theme)) {
            console.log(k, v)
            root.style.setProperty(`--${k}`, v);
        };

        backgroundColorBtn.value = theme.background;
        primaryColorBtn.value = theme.primary;
        secondaryColorBtn.value = theme.secondary;
        accentColorBtn.value = theme.accent;
        textColorBtn.value = theme.text;
    } else {
        const computedRoot = getComputedStyle(root);

        backgroundColorBtn.value = computedRoot.getPropertyValue('--bg');
        primaryColorBtn.value = computedRoot.getPropertyValue('--primary');
        secondaryColorBtn.value = computedRoot.getPropertyValue('--secondary');
        accentColorBtn.value = computedRoot.getPropertyValue('--accent');
        textColorBtn.value = computedRoot.getPropertyValue('--text');

        console.log(backgroundColorBtn)
        console.log(backgroundColorBtn.value, primaryColorBtn.value, secondaryColorBtn.value, accentColorBtn.value, textColorBtn.value)
    };

    updateContrast();
};

window.addEventListener('load', loadTheme);
window.addEventListener('beforeunload', saveTheme);




const isLight = (clr) => {
    clr = clr.replace('#', '');

    const [r, g, b] = [0, 2, 4].map(i => parseInt(clr.substr(i, 2), 16));

    return (r*299+g*587+b*114)/1000 > 150;
};

const updateContrast = () => {
    document.querySelectorAll('#menu input[type="color"]').forEach(i => {
        const l = document.querySelector(`label[for="${i.name}"]`);

        if (l) {
            l.style.color = isLight(i.value) ? 'black' : 'white';
        };
    });
};