import chalk from 'chalk';
import { giveHint, isCorrectGuess } from "./wordle.ts";

describe('Wordle', () => {
    test('should return true if the guess is correct', () => {
        const value = isCorrectGuess('shell', 'shell');
        expect(value).toBeTruthy()
    })
    test('should return false if the guess is not correct', () => {
        const value = isCorrectGuess('shell', 'smell');
        expect(value).toBeFalsy()
    })

    test('should return the hints if the guess is not correct', () => {
        const value = giveHint('shell', 'malls');
        expect(value).toEqual(`${chalk.bgGray('m')}${chalk.bgGray('a')}${chalk.bgYellow('l')}${chalk.bgGreen('l')}${chalk.bgYellow('s')}`)
    })
})