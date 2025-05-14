export const sum = (a, b) => {
    return a + b;
};

export const multiply = (a, b) => {
    return a * b;
};

export const isPalindrome = (str) => {
    console.log(str.split('').reverse().join(''))
    if (str === str.split('').reverse().join('')) {
        return true;
    };

    return false;
};