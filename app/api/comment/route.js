import { NextResponse } from 'next/server'
import pool from '@/components/api/db'

export const POST = async (req) => {
    try{
        const data = await req.json()

        const findOld = await pool.query('SELECT * FROM com WHERE ojaxiid = $1 AND admin = $2', [data.id, data.admin]);

        if(findOld.rows.length > 0) {
            const addData = await pool.query('UPDATE com SET comment = $1 WHERE ojaxiid = $2 AND admin = $3', [data.com, data.id, data.admin]);

            if(addData.rows) return NextResponse.json({super: 'super'})
                else throw new Error('Could not insert existed comment into database');
        }
        else{
            const addData = await pool.query('INSERT INTO com(ojaxiid, admin, comment) VALUES ($1, $2, $3)', [data.id, data.admin, data.com]);

            
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

        const getData = await pool.query('SELECT * FROM com WHERE ojaxiid = $1', [data.id]);
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

export const GET = async (req) => {
    try{
        const getData = await pool.query('SELECT * FROM com');
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