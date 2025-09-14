import { NextResponse } from 'next/server'
import pool from '@/components/api/db'
export const POST = async (req) => {
    try{
        const data = await req.json()
        
        console.log(data)
        const date = new Date()
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Months are zero-based, so add 1
        const day = date.getDate();

        const formattedDate = `${day}-${month}-${year}`;

        const findOld = await pool.query('SELECT * FROM userkomentarebi WHERE pn = $1 AND admin = $2', [data.id, data.admin]);

        if(findOld.rows.length > 0) {
            const addData = await pool.query('UPDATE userkomentarebi SET komentari = $1, date = $2 WHERE pn = $3 AND admin = $4', [data.com, formattedDate, data.id, data.admin]);

            if(addData.rows) return NextResponse.json({super: 'super'})
                else throw new Error('Could not insert existed comment into database');
        }
        else{
            const addData = await pool.query('INSERT INTO userkomentarebi(pn, admin, komentari, date) VALUES ($1, $2, $3, $4)', [data.id, data.admin, data.com, formattedDate]);

            
            if(addData.rows) return NextResponse.json({super: 'super'})
                else throw new Error('Could not insert new info into database');
        }
    }
    catch(err){
        throw new Error(err.message)
    }
}

export const PUT = async (req) => {
    try{
        const data = await req.json()
        const getData = await pool.query('SELECT * FROM userkomentarebi WHERE pn = $1', [data.id]);
        if(getData.rows.length > 0){
            return NextResponse.json(getData.rows)
        }
        else {
            return new NextResponse('კომენტარი არ მოიძებნა')
        }
    }
    catch(err){
        throw new Error(err.message)
    }
}

export const DELETE = async (req) => {
    try{
        const data = await req.json();

        const deleteRow = await pool.query('DELETE FROM userkomentarebi WHERE pn = $1 AND admin = $2', [data.id, data.admin]);

        if(deleteRow.fields) {return NextResponse.json({succsess: 'success'});}
        else throw new Error('Could not delete')
    }
    catch(err){
        throw new Error(err)
    }
}