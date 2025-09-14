import { NextResponse } from 'next/server'
import pool from '@/components/api/db'
import ExcelJS from 'exceljs'

export const POST = async (req, res) => {
    try{
        const result = await pool.query('SELECT * FROM ojaxi WHERE sxvagan IS TRUE');

        const date = new Date()
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Months are zero-based, so add 1
        const day = date.getDate();

        // Create a new workbook and worksheet
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet(`sxvagan-dasaqmebuli-ojaxi-${day}-${month}-${year}`);

        worksheet.columns = Object.keys(result.rows[0]).map((key) => ({
            header: key,
            key: key,
            width: 20, // You can adjust the column width as needed
        }));

         // Add data rows
         result.rows.forEach((row) => {
            worksheet.addRow(row);
        });

        // Write the file to a buffer
        const buffer = await workbook.xlsx.writeBuffer();

        const filename = `ojaxi-${day}-${month}-${year}.xlsx`;
        // Send the buffer as the response
        return new NextResponse(buffer, {
           headers: {
               'Content-Disposition': `attachment; filename="${filename}"`,
               'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
           },
       });
    }
    catch(err){
        throw new Error(err)
    }
}

export const GET = async (req, res) => {
    try{
        const result = await pool.query('SELECT * FROM mshromeli WHERE sxvagan IS TRUE');

        
        const date = new Date()
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Months are zero-based, so add 1
        const day = date.getDate();

        // Create a new workbook and worksheet
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet(`sxvagan-dasaqmebuli-mshromeli-${day}-${month}-${year}`);

        worksheet.columns = Object.keys(result.rows[0]).map((key) => ({
            header: key,
            key: key,
            width: 20, // You can adjust the column width as needed
        }));

         // Add data rows
         result.rows.forEach((row) => {
            worksheet.addRow(row);
        });

         // Write the file to a buffer
         const buffer = await workbook.xlsx.writeBuffer();

         const filename = `mshromeli-${day}-${month}-${year}.xlsx`;
         // Send the buffer as the response
         return new NextResponse(buffer, {
            headers: {
                'Content-Disposition': `attachment; filename="${filename}"`,
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            },
        });
    }
    catch(err){
        throw new Error(err)
    }
}