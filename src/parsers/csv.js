/* @flow */
import Papa from 'papaparse';
import type { Rows } from '../types.flow';

export default {
    contentType: 'text/csv',
    parse(file: File): Promise<Rows> {
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
