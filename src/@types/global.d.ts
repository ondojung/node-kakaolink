// logger.ts
const getTimeStamp = (): string => {
    const now = new Date();
    return now.toLocaleTimeString('ko-KR', { hour12: true });
};

// 전역 변수 logger에 값 설정
globalThis.logger = {
    i: (message: string) => console.log(`[${getTimeStamp()}] [INFO] ${message}`),
    w: (message: string) => console.warn(`[${getTimeStamp()}] [WARN] ${message}`),
    e: (message: string) => console.error(`[${getTimeStamp()}] [ERROR] ${message}`),
    d: (message: string) => console.debug(`[${getTimeStamp()}] [DEBUG] ${message}`),
};