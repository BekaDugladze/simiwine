import { NextResponse } from 'next/server'
import pool from '@/components/api/db'
  export const POST = async (req, res) => {
    try {
        const data = await req.json();
        console.log(data)
            
        const getData = await pool.query('UPDATE mshromeli SET sxvagan = TRUE WHERE piradinomeri = $1', [data.id])

        if(getData.rowCount > 0) return NextResponse.json(getData.rows);
        else throw new Error(`Could not find`)
    } catch (err) {
        await pool.query('ROLLBACK');
        throw new Error(err.message);
    }
};

export const DELETE = async (req, res) => {
    try {
        const data = await req.json();
        console.log(data);
            
        const getData = await pool.query('UPDATE mshromeli SET sxvagan = false WHERE piradinomeri = $1', [data.id]);

        if(getData.rowCount > 0) return NextResponse.json(getData.rows);
        else throw new Error()
    } catch (err) {
        await pool.query('ROLLBACK');
        throw new Error(err.message);
    }
};