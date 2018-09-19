/* @flow */
/* global FileReader */
import XLSX from 'xlsx';
import type { Rows } from '../index.js.flow';

export default {
    contentType:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    parse(file: File): Promise<Rows> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = event => {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheet = workbook.Sheets[workbook.SheetNames[0]];
                const rows = XLSX.utils.sheet_to_json(sheet, {header:1, blankrows:false, defval:null});
                const maxCells = rows.reduce((max, row) => {
                    const cells = Object.keys(row).length;
                    return cells > max ? cells : max;
                }, 0);

                resolve(
                    rows.map(row => {
                        const keys = Object.keys(row);
                        return keys
                            .sort()
                            .map(key => row[key])
                            .concat(
                                Array.from(
                                    { length: maxCells - keys.length },
                                    () => ''
                                )
                            );
                    })
                );
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    }
};
