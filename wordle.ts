import chalk from 'chalk';
import prompt from 'prompt';
import wordleList from './word-list.json';

async function wordle() {
    // Select the word
    const randomNum = Math.floor(Math.random() * 200);
    const word = wordleList[randomNum];

    // start prompt for the player
    prompt.start();

    console.log(`${chalk.bgBlueBright('You got 6 attempts the guess the correct word. Have fun! 😁')}`)
    let attempts = 0;

    while (attempts < 6) {
        attempts += 1;

        // get guess from player
        let result = await new Promise((resolve, reject) => {
            prompt.get([{description: 'Provide a 5 letter word', name: 'guess'}], function (err, result) {
                if (err) {
                    return reject(err)
                }
                return resolve(result.guess);
            });
        })
        console.log(`Attempt # ${attempts}: ` + result);

        const guess = result as string;

        if (!isCorrectGuess(word, guess)) {

            giveHint(word, guess)
        } else {
            console.log(`${chalk.bgGreen(guess)} is the word! Amazing!`)
            return
        }
    }

    console.log(`The correct word is ${chalk.bgMagenta(word)}. Sorry, try again!`)
}

export function isCorrectGuess(word: string, guess: string) {
    if (word === guess) {
        return true
    }

    return false
}


export function giveHint(word: string, guess: string) {
    let result = '';
    for (let i = 0; i < word.length; i++) {
        if (word[i] === guess[i]) {
            result += (chalk.bgGreen(guess[i]))
        } else if (word.includes(guess[i])) {
            result += (chalk.bgYellow(guess[i]))
        } else {
            result += (chalk.bgGray(guess[i]))
        }
    }

    console.log(result)
    return result
}



if (process.argv[1] === import.meta.filename) {
  wordle()
}