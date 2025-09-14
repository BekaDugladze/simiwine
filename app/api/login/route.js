"use server"

import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import pool from '@/components/api/db'
const secretKey = process.env.SECRET_KEY;

// Function to set the authentication token cookie
const setAuthTokenCookie = (res, token) => {
    cookies().set('authToken', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
};

export const POST = async (req, res) => {
    try {
        const data = await req.json();

        const check = await pool.query('SELECT * FROM admin WHERE username = $1', [data.user]);
        if (check.rows.length > 0) {
            const compare = await bcrypt.compare(data.pass, check.rows[0].passname);
            if (!compare) {
                throw new Error('Password does not match');
            } else {
                const token = jwt.sign({ username: data.user }, secretKey, { expiresIn: '8h' });
                setAuthTokenCookie(res, token);
                return NextResponse.json({ token });
            }
        } else {
            throw new Error('User not found');
        }
    } catch (err) {
        console.error('POST endpoint error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
};

export const GET = async (req) => {
    const cookie = cookies();
    try {
        const token = await cookie.get('authToken');
        if (!token) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        try {
            const decoded = jwt.verify(token.value, secretKey);
            console.log(decoded)
            return NextResponse.json(decoded.username);
        } catch (err) {
            console.error('JWT verification error:', err);
            return new NextResponse('Unauthorized', { status: 401 });
        }
    } catch (err) {
        console.error('GET endpoint error:', err);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
};

export const PUT = async (req, res) => {
    try{
        const data = await req.json()

        const putPass = await pool.query('UPDATE admin SET passname = $1 WHERE username = $2', [data.pass, data.user])
        if(!putPass.rows.length > 0){
            return NextResponse.json({message: 'პაროლი წარმატებით შეიცვალა'})
        }
        else{
            throw new Error('Invalid request')
        }
    }
    catch(err){
        throw new Error(err.message)
    }
};

export const DELETE = async (req) => {
    try{
        const del = await cookies().delete('authToken')
        return NextResponse.json({data: del})
    }
    catch(err){
        throw new Error('Could not delete')
    }
}