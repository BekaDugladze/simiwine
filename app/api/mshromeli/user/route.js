import { NextResponse } from 'next/server'
import pool from '@/components/api/db'
export const POST = async (req) => { 
    try{
        const data = await req.json()

        if(data.pn){
            const pn = data.pn; 
      
            const query = 'SELECT * FROM mshromeli WHERE piradinomeri = $1';
            const values = [pn];
      
            const find = await pool.query(query, values);

            console.log(find.rows)
            if(find.rows.length > 0){
                const data2 = await find.rows[0]
                return NextResponse.json(data2)
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

        const putData = await pool.query(
            `UPDATE mshromeli SET 
            saxeligvari = $1, 
            gvari = $2,
            piradinomeri = $3,
            molodini = $4, 
            qalaqi =$5,
            ubani = $6,
            sertifikati = $7,
            dazgveva =$8,
            dge =$9,
            saati = $10,
            garemo = $11,
            akadganatleba = $12,
            gamocdileba = $13,
            profesia = $14,
            asaki = $15,
            samushao = $16,
            damatebit = $17,
            shemsworebeli = $18,
            tarigi = $19,
            mobiluri = $20
             WHERE piradinomeri = $21`, 
             [data.name, data.gvari, data.piradinomeri, data.wage, data.qalaqi, 
                data.ubani, data.sertifikati, data.dazgveva, data.dge, data.saati, data.garemo,
                data.ganatleba, data.gamocdileba, data.profesia, data.asaki, data.samushao,
                data.damatebit, data.admin, formattedDate, data.mobiluri,
                data.pn,
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

        const deleteRow = await pool.query('DELETE FROM mshromeli WHERE piradinomeri = $1', [data.pn])
    }
    catch(err){
        throw new Error('could not delete')
    }
}