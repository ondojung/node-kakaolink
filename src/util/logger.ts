// logger.ts
import chalk from 'chalk';

const getTimeStamp = (): string => {
    const now = new Date();
    return chalk.gray.bold(now.toLocaleTimeString('ko-KR', { hour12: true }));
};

export default {
    i: (message: string) => console.log(`[${getTimeStamp()}] [${chalk.cyan('INFO')}] ${message}`),
    w: (message: string) => console.warn(`[${getTimeStamp()}] [${chalk.yellow('WARN')}] ${message}`),
    e: (message: string) => console.error(`[${getTimeStamp()}] [${chalk.red('ERROR')}] ${message}`),
    d: (message: string) => console.debug(`[${getTimeStamp()}] [${chalk.blue('DEBUG')}] ${message}`),
    s: (message: string) => console.debug(`[${getTimeStamp()}] [${chalk.green('SUCCESS')}] ${message}`),
};