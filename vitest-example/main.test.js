import { sum, multiply, isPalindrome } from "./main";

import { describe, expect, test } from "vitest";

describe('Sum Test', () => {
    test('Adds 1 + 2 and returns 3', () => {
        expect(sum(1, 2)).toBe(3);
    });
});

describe('Multiply Test', () => {
    test('Multiplies 2 by 3 and returns 6', () => {
        expect(multiply(2, 3)).toBe(6);
    });
});

describe('Palindrome Test', () => {
    test('Passes palindrome and returns true', () => {
        expect(isPalindrome('level')).toBe(true);
    });
    test('Passes non-palindrome and returns false', () => {
        expect(isPalindrome('hello')).toBe(false);
    });
})


const vitest = {
    key: 'value',
    key: 'value',
    describe: function (){},
    expect: function (){},
    test: function (){},
};

vitest.describe();
vitest.expect();
vitest.test();
