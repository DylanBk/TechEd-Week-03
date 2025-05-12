window.addEventListener('DOMContentLoaded', () => {
    document.getElementsByName('birthdate')[0].max = new Date().toISOString().split("T")[0];
});

const form = document.querySelector('form');
const err = document.querySelector('#error');

const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const formDataObj = Object.fromEntries(formData);

    console.table(formDataObj);

    if (formDataObj['password'] !== formDataObj['confirm-password']) {
        const pw = document.getElementsByName('password')[0];
        const confirmPw = document.getElementsByName('confirm-password')[0];

        pw.style.border = 'solid 1px red';
        pw.style.background = '#ffcccc';

        confirmPw.style.border = 'solid 1px red';
        confirmPw.style.background = '#ffcccc';

        err.textContent = 'Passwords must match';

        return;
    };
};

form.addEventListener('submit', handleSubmit);