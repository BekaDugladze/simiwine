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

        const check = await pool.query('SELECT saxeligvari FROM mshromeli WHERE piradinomeri = $1', [data.pn])

        if(check.rows.length > 0) throw new Error('ინფორმაცია უკვე არსებობს')
        else{
            const query = `
                INSERT INTO mshromeli (piradinomeri, saxeligvari, mobiluri, asaki, qalaqi, ubani, akadganatleba, profesia, mimushavia, gamocdileba, vedzeb, unarebi, garemo, pasuxismgeblobebi, saati, dge, sertifikati, molodini, winaxelfasi, dazgveva, daxmareba, sawevro, damatebit, link, samushao, ena, wevroba, gvari, tarigi, smoker, email)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31)
            `;

            const values = [
                data.pn,
                data.name,
                data.mobile,
                data.asaki,
                data.qalaqi,
                data.ubani,
                data.ganatleba,
                data.profesia,
                data.mimushavia,
                data.gamocdileba,
                data.vedzeb,
                data.unarebi,
                data.garemo,
                data.pasuxismgebloba,
                data.saati,
                data.dge,
                data.sertifikation,
                data.molodini,
                data.lastWage,
                data.dazgveva,
                data.daxmareba,
                data.gadaxda,
                data.detailed,
                data.link,
                data.samushao,
                data.ena,
                data.msurs,
                data.gvari,
                formattedDate,
                data.smoker,
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
    try{
        const data = await pool.query(`SELECT * FROM mshromeli WHERE dasaqmebuli IS DISTINCT FROM TRUE AND sxvagan IS DISTINCT FROM TRUE ORDER BY TO_DATE(tarigi, 'DD-MM-YYYY') DESC NULLS LAST`)
        return NextResponse.json(data.rows)
    }
    catch(err){
        throw new Error(err.message)
    }
}