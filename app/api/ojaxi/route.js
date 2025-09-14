import { NextResponse } from 'next/server'
import pool from '@/components/api/db'
export const POST = async (req) => {
    try{
        const data = await req.json();

        const date = new Date()
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Months are zero-based, so add 1
        const day = date.getDate();

        const formattedDate = `${day}-${month}-${year}`;

        const check = await pool.query('SELECT * FROM ojaxi WHERE mobiluri = $1', [data.mobile])

        if(check.rows.length > 0) throw new Error('ინფორმაცია უკვე არსებობს')
        else{
            const query = `
                INSERT INTO ojaxi (saxeligvari, mobiluri, qalaqi, ubani, profesia, vedzeb, periodi, unarebi, tvisebebi, gatavisufleba, kompetencia, pasuxismgeblobebi, saati, dge, sertifikati, xelfasi, visargebleb, gadaxda, dazgveva, damatebit, linki, ganatleba, gamocdileba, ena, gvari, tarigi, bavshvebi, house, ganrigi, movaleobebi, animals, addhours, email)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33)
            `;

            const values = [
                data.name,
                data.mobile,
                data.qalaqi,
                data.ubani,
                data.profesia,
                data.vedzeb,
                data.periodi,
                data.unarebi,
                data.tvisebebi,
                data.gatavisufleba,
                data.kompetencia,
                data.pasuxismgebloba,
                data.saati,
                data.dge,
                data.sertifikation,
                data.molodini,
                data.daxmareba,
                data.gadaxda,
                data.dazgveva,
                data.damatebit,
                data.link,
                data.ganatleba,
                data.gamocdileba,
                data.ena,
                data.gvari,
                formattedDate,
                data.babies,
                data.house,
                data.ganrigi,
                data.movaleobebi,
                data.animals,
                data.addHours,
                data.email
            ];

            const upload = await pool.query(query, values)

            if (upload) return new NextResponse('success')
            else return new NextResponse('error')
        }
    }
    catch(err){
        throw new Error(err.message)
    }
}

export const GET = async (req, res) => {
    try{const data = await pool.query(`
        SELECT * FROM ojaxi
        WHERE dasaqmebuli IS DISTINCT FROM TRUE
           AND sxvagan IS DISTINCT FROM TRUE
           ORDER BY TO_DATE(tarigi, 'DD-MM-YYYY') DESC NULLS LAST
    `);
        return NextResponse.json(data.rows)
    }
    catch(err){
        throw new Error(err.message)
    }
}

export const PUT = async (req, res) => {
    try{
        const data = await req.json();
        console.log(data.pn, data.ojaxiid)

        const checkUser = await pool.query('SELECT * FROM mshromeli WHERE piradinomeri = $1', [data.pn])

        if(checkUser.rows.length > 0){
            const ojaxiPUT = await pool.query('UPDATE ojaxi SET match = $1 WHERE ojaxiid = $2', [data.pn, data.ojaxiid])
            const mshromeliPUT = await pool.query('UPDATE mshromeli SET match = $1 WHERE piradinomeri = $2', [data.ojaxiid, data.pn])

            if (mshromeliPUT && ojaxiPUT) {
                return NextResponse.json({ojaxi: ojaxiPUT.rows[0]})
            }
        }
        else{throw new Error("Invalid")}
    }   
    catch(err){
        throw new Error(err.message)
    }
}

export const DELETE = async (req) => {
    try{
        const data = await req.json()

        // Set match value to NULL in ojaxi table
        const ojaxiDEL = await pool.query(
            'UPDATE ojaxi SET match = NULL WHERE match = $1',
            [data.pn]
        );

        // Set match value to NULL in mshromeli table
        const mshromeliDEL = await pool.query(
            'UPDATE mshromeli SET match = NULL WHERE piradinomeri = $1',
            [data.pn]
        );
        if(ojaxiDEL && mshromeliDEL) return NextResponse.json({suc: 'success'})
        else throw new Error('Failed to')
    }
    catch(err){
        throw new Error(err)
    }
}



