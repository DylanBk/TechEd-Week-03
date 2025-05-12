const apiContainer = document.querySelector('#api-container');

const getData = async () => {
    const req = await fetch('https://randomfox.ca/floof');
    const res = await req.json();

    if (res) {
        console.table(res);

        apiContainer.querySelector('img').src = res.image;
        apiContainer.querySelector('a').textContent = res.link;
        apiContainer.querySelector('a').href = res.link;
    } else {
        console.error('Error fetching data');
        apiContainer.querySelector('a').textContent = `Error: Couldn't fetch data from https://randomfox.ca/floof`;
        apiContainer.querySelector('a').href = '';
    };
};

window.addEventListener('load', () => {
    getData();

//     setInterval(getData, 2000); // new req every 2 secs
});

const newFoxBtn = document.querySelector('#new-fox');
const shareFoxBtn = document.querySelector('#share-fox');
const toast = document.querySelector('.toast');

newFoxBtn.addEventListener('click', getData);

shareFoxBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(apiContainer.querySelector('a').href);

    toast.style.opacity = 1;

    setTimeout(() => {
        toast.style.opacity = 0;
    }, 2000);
});