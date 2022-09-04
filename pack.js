const shell = require('shelljs');
const inquirer = require('inquirer');

// npm 登录操作
async function npmLogin() {
    const username = `admin\n`;
    const inputArray = ['Username', 'Password', 'Email'];
    const emailChild = shell.exec('git config --get user.email', {async: true, silent: true,});
    let getEmail = () => {
        return new Promise(resolve => {
            emailChild.stdout.on('data', async (chunk) => {
                resolve(chunk + '\n');
            })
        });
    };
    const email = await getEmail();
    const loginChild = shell.exec('npm login --registry=http://npm.nextop.cc', {async: true});
    loginChild.stdout.on('data', async (chunk) => {
        let column = inputArray.shift();
        if (column && !!~column.indexOf('Username')) {
            shell.echo(username);
            loginChild.stdin.write(username);
        } else if (column && !!~column.indexOf('Password')) {
            let pwd = await inquirer.prompt([{
                type: 'password',
                message: 'Enter npm password',
                name: 'password',
            }]).then(async (answers) => {
                return new Promise(resolve => {
                    resolve(answers.password);
                })
            });
            loginChild.stdin.write(pwd + '\n');
        } else if (column && !!~column.indexOf('Email')) {
            shell.echo(email);
            loginChild.stdin.write(email);
        } else {
            loginChild.stdin.end();
        }
    })
}

npmLogin();