import { NextResponse } from 'next/server'
import { Pool } from 'pg';


const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });
  export const POST = async (req, res) => {
    try {
        const data = await req.json();
            
        const getData = await pool.query('UPDATE ojaxi SET sxvagan = TRUE WHERE ojaxiid = $1', [data.id])

        if(getData.rowCount > 0) return NextResponse.json(getData.rows);
        else throw new Error(`Could not find`)
    } catch (err) {
        await pool.query('ROLLBACK');
        throw new Error(err.message);
    }
};


export const GET = async () => {
    try{
        // Query the `ojaxi` table
    const ojaxiResult = await pool.query('SELECT * FROM ojaxi WHERE sxvagan IS TRUE');
    const mshromelist = await pool.query('SELECT * FROM mshromeli WHERE sxvagan IS TRUE')
    
        // Return combined results
        return NextResponse.json({
            ojaxi: ojaxiResult.rows,
            mshromeli: mshromelist.rows
        });
    
    }
    catch(err){
        throw new Error(err.message);
    }
}

export const DELETE = async (req, res) => {
    try {
        const data = await req.json();
        console.log(data);
            
        const getData = await pool.query('UPDATE ojaxi SET sxvagan = false WHERE ojaxiid = $1', [data.id]);

        if(getData.rowCount > 0) return NextResponse.json(getData.rows);
        else throw new Error()
    } catch (err) {
        await pool.query('ROLLBACK');
        throw new Error(err.message);
    }
};