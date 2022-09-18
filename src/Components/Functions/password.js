const SpecialCharacters = [
    `!`,
`”`,
`#`,
`$`,
`%`,
`&`,
`’`,
`(`,
`)`,
`*`,
`+`,
`,`,
`-`,
`.`,
`/`,
`:`,
`;`,
`<`,
`=`,
`>`,
`?`,
`@`,
`[`,
`\``,
"]",
`^`,
`_`,
"`",
`{`,
`|`,
`}`,
`~`];

const Numbers = [
    `0`,
`1`,
`2`,
`3`,
`4`,
`5`,
`6`,
`7`,
`8`,
`9`
];

const Letters = [
    `a`,`b`,`c`,`d`,`e`,`f`,`g`,`h`,`i`,`j`,`k`,`l`,`m`,`n`,`o`,`p`,`q`,`r`,`s`,`t`,`u`,`v`,`w`,`x`,`y`,`z`,
]

const PasswordCheck = (str) => {
    let correct = false;
    let message = "";
    let result = [];
    let SpecialChars = 0;
    for(let i = 0; i < SpecialCharacters.length; i++) {
        if(str.indexOf(SpecialCharacters[i]) !== -1) {
            SpecialChars = SpecialChars + 1;
        }
    }
    let Nums = 0;
    for(let j = 0; j < Numbers.length; j++) {
        if(str.indexOf(Numbers[j]) !== -1) {
            Nums = Nums + 1;
        }
    }
    let SmallLets = 0;
    for(let k = 0; k < Letters.length; k++) {
        if(str.indexOf(Letters[k]) !== -1) {
            SmallLets = SmallLets + 1;
        }
    }
    let CapLets = 0;
    for(let l = 0; l < Letters.length; l++) {
        if(str.indexOf(Letters[l].toUpperCase()) !== -1) {
            CapLets = CapLets + 1;
        }
    }
    if(str.length === 0) {
        message = "Please enter a password";
        result.push(correct);
        result.push(message);
        return result;
    } else if(str.length < 12) {
        message = "Your password isn't long enough - it should be at least 12 characters long";
        result.push(correct);
        result.push(message);
        return result;
    } else if (SpecialChars === 0) {
        message = "Your password should at least contain one special character";
        result.push(correct);
        result.push(message);
        return result;
    } else if (Nums === 0) {
        message = "Your password should at least contain one number";
        result.push(correct);
        result.push(message);
        return result;
    } else if (SmallLets === 0) {
        message = "Your password should at least contain one lower case letter";
        result.push(correct);
        result.push(message);
        return result;
    } else if (CapLets === 0) {
        message = "Your password should at least contain one capital letter";
        result.push(correct);
        result.push(message);
        return result;
    } else {
        message = "Password is correct";
        correct = true;
        result.push(correct);
        result.push(message);
        return result;
    }
}

module.exports = PasswordCheck;
// Returns an array containing :
    // true if the password is strong enough
    // a message explaining why the password isn' strong enough