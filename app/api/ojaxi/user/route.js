import { NextResponse } from 'next/server'
import pool from '@/components/api/db'

export const POST = async (req) => { 
    try{
        const data = await req.json()
        console.log(data.pn);

        if(data.pn){
            const find = await pool.query('SELECT * FROM ojaxi WHERE ojaxiid = $1', [data.pn])

            console.log(find.rows)
            if(find.rows){
                return NextResponse.json(find.rows[0])
            }
            else{
                throw new Error('Couldn\'t find')
            }
        }
        else{
            throw new Error('PN and Data is not defined')
        }
    }
    catch(err){
        throw new Error(err.message)
    }
}


export const PUT = async (req) => {
    try{
        const data = await req.json()
        console.log(data)
        
        const date = new Date()
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Months are zero-based, so add 1
        const day = date.getDate();

        const formattedDate = `${day}-${month}-${year}`;

        const putData = await pool.query(`UPDATE ojaxi SET 
            saxeligvari = $1 , 
            gvari = $2,
            xelfasi = $3,
            qalaqi = $4,
            ubani = $5,
            sertifikati = $6,
            dazgveva = $7,
            dge = $8,
            saati = $9,
            gatavisufleba = $10,
            ganatleba = $11,
            gamocdileba = $12,
            profesia = $13,
            tvisebebi = $14,
            kompetencia = $15,
            periodi = $16,
            damatebit = $17,
            admin = $18,
            tarigi = $19,
            mobiluri = $20,
            bavshvebi = $22
            WHERE ojaxiid = $21`, 
            [
                data.name, data.gvari, data.xelfasi, data.qalaqi, 
                data.ubani, data.sertifikati, data.dazgveva, data.dge, data.saati, data.gatavisufleba,
                data.ganatleba, data.gamocdileba, data.profesia, data.tvisebebi, data.kompetencia, data.periodi,
                data.damatebit, data.admin, formattedDate, data.mobiluri,
                data.pn, data.bavshvebi
             ])

        if(putData.rows){
            return NextResponse.json({success: 'success'})
        }
        else {throw new Error('could not update')}
    }
    catch(err){
        throw new Error(err.message)
    }
}
export const DELETE = async (req) => {
    try{
        const data = await req.json()

        const deleteRow = await pool.query('DELETE FROM ojaxi WHERE ojaxiid = $1', [data.pn])
    }
    catch(err){
        throw new Error('could not delete')
    }
}