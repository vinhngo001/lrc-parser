const EOL = typeof window === 'undefined' ? require('os').EOL : '\n';

/**
 * 
 * @param {string} data
 * @example [length: 03:36]
 * @return {<Array>{string}} ['length', '03:06']
 */

function extractInfo(data) {
    const info = data.trim().slice(1, -1); // remove brackets: length: 03:06
    return info.split(':');
}

function lrcParser(data) {
    console.log({ data });
    if (typeof data !== 'string') {
        throw new TypeError('expect first argument to be a string');
    }

    // split a long stirng into lines by system's end-of-line marker line \r\n on Windows
    // or \n on POSIX
    let lines = data.split(EOL);
    const timeStart = /\[(\d*\:\d*\.?\d*)\]/ // i.g [00:10.55]
    const scriptText = /(.+)/ // Havana ooh na-na (ayy)
    const timeEnd = timeStart;
    console.log(">>>>>>>>", timeStart.source);
    console.log(timeEnd.source, "<<<<<<<<");
    const startAndText = new RegExp(timeStart.source + scriptText.source);

    const infos = [];
    const scripts = [];
    const result = {};

    for (let i = 0; startAndText.test(lines[i]) === false; i++) {
        infos.push(lines[i]);
    }

    infos.reduce((result, info) => {
        const [key, value] = extractInfo(info);
        result[key] = value;
        return result;
    }, result);
}