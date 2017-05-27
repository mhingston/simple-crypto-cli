const crypto = require('crypto');
const inquirer = require('inquirer');

const encrypt = () =>
{
    const questions =
    [
        {
            type: 'input',
            name: 'plainText',
            message: 'Enter your plain text'
        },
        {
            type: 'password',
            name: 'password',
            message: 'Enter your password'
        },
    ];

    inquirer.prompt(questions).then((answers) =>
    {
        const cipher = crypto.createCipher('aes256', answers.password);
        let cipherText = cipher.update(answers.plainText, 'utf8', 'base64');
        cipherText += cipher.final('base64');
        console.log(cipherText);
    });
};

const decrypt = () =>
{
    const questions =
    [
        {
            type: 'input',
            name: 'cipherText',
            message: 'Enter your cipher text'
        },
        {
            type: 'password',
            name: 'password',
            message: 'Enter your password'
        },
    ];

    inquirer.prompt(questions).then((answers) =>
    {
        const decipher = crypto.createDecipher('aes256', answers.password);
        let plainText = decipher.update(answers.cipherText, 'base64', 'utf8');
        plainText += decipher.final('utf8');
        console.log(plainText);
    });
};

const questions =
[
    {
        type: 'input',
        name: 'action',
        message: 'encrypt or decrypt'
    }
];

inquirer.prompt(questions).then((answers) =>
{
    if(answers.action.match(/^e/i))
    {
        encrypt();
    }

    else if(answers.action.match(/^d/i))
    {
        decrypt();
    }
});