/* @flow */
import Papa from 'papaparse';

export default {
    contentType: 'text/csv',
    parse(file) {
        return new Promise((resolve, reject) => {
            const rows = [];

            Papa.parse(file, {
                worker: true,
                dynamicTyping: true,
                step: ({ data }) => rows.push(...data),
                complete: () => resolve(rows),
                error: reject
            });
        });
    }
};
