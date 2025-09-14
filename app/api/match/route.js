import { NextResponse } from 'next/server';
import pool from '@/components/api/db'

  export const POST = async (req, res) => {
    try {
        const data = await req.json();

        const getOjaxi = await pool.query('SELECT * FROM ojaxi WHERE ojaxiid = $1', [data.id]);
        const getMshromeli = await pool.query('SELECT * FROM mshromeli WHERE piradinomeri = $1', [data.pn]);

        console.log(data);
        if (getOjaxi.rows.length > 0 && getMshromeli.rows.length > 0) {

            const updateOjaxi = await pool.query('UPDATE ojaxi SET dasaqmebuli = TRUE WHERE ojaxiid = $1', [data.id])
            const updateMshromeli = await pool.query('UPDATE mshromeli SET dasaqmebuli = TRUE WHERE piradinomeri = $1', [data.pn])
            
            if (updateOjaxi.rowCount> 0 && updateMshromeli.rowCount > 0) {
                return NextResponse.json({ wow: 'woow' });
            } else {
                throw new Error('can\'t insert');
            }
        } else {
            throw new Error('can\'t find data');
        } 
    } catch (err) {
        throw new Error(err.message);
    }
};


export const GET = async () => {
    try{
        // Query the `ojaxi` table
    const ojaxiResult = await pool.query('SELECT * FROM ojaxi WHERE dasaqmebuli IS TRUE');

    if (ojaxiResult.rows.length > 0) {
        // Prepare a variable to store mshromeli results
        const mshromeliResults = [];

        // Loop through each `ojaxi` row
        for (const ojaxiRow of ojaxiResult.rows) {
            const match = ojaxiRow.match; // Assuming `match` column exists in `ojaxi`

            // Query the `mshromeli` table
            const mshromeliResult = await pool.query(
                'SELECT * FROM mshromeli WHERE piradinomeri = $1 AND dasaqmebuli IS TRUE',
                [match]
            );

            if (mshromeliResult.rows.length > 0) {
                mshromeliResults.push(...mshromeliResult.rows);
            } else {
                throw new Error(`Couldn't find match for piradinomeri: ${match}`);
            }
        }

        console.log(ojaxiResult.rows, mshromeliResults)
        // Return combined results
        return NextResponse.json({
            ojaxi: ojaxiResult.rows,
            mshromeli: mshromeliResults
        });
    } else {
        throw new Error('No matching ojaxi found');
    }
    }
    catch(err){
        throw new Error(err.message);
    }
}

export const DELETE = async (req) => {
    try{
        const data = await req.json()

        const ojaxi = await pool.query('UPDATE ojaxi SET dasaqmebuli = NULL WHERE ojaxiid = $1 AND match = $2', [data.id, data.match])
        const mshromeli = await pool.query('UPDATE mshromeli SET dasaqmebuli = NULL WHERE piradinomeri = $1 AND match = $2', [data.match, data.id])

        if(ojaxi.rowCount > 0 && mshromeli.rowCount > 0) {
            return new NextResponse('success')
        }
        else{
            throw new Error('Failed to Update ojaxi')
        }
    }
    catch(err){
        throw new Error(err.message);
    }
}