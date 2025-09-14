'use client'
import Image from "next/image";
import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import logo from './favicon.ico'
import { useState } from 'react'
import Job from '@/components/job'
import Employee from '@/components/employee'
import Link from "next/link";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [but, setBut] = useState('but1')
  return (
    <>
      <Head>
        <title>Zrunva.org || კითხვარი</title>
        <meta name="description" content="საქართველოში საოჯახო ზრუნვის შრომა ამ დრომდე არაფორმალური შრომაა. ჩვენი ერთობაც არაფორმალურად დაიწყო 2021 წლის 29 მაისს , როცა თბილისში, კიკვიძის სკვერის მედიათეკის შენობაში შევიკრიბეთ.
ხოლო უკვე 2023 წელს პროგრესულ ფორუმთან თანამშრომლობით და გაეროს ქალთა ორგანიზაციის მხარდაჭერით შევძელით დაგვეფუძნებინა ძიძების და საოჯახო მშრომელების ასოციაცია და შეგვექმნა უფასო საკონსულტაციო სერვისი, იურიდიული დახმარების სერვისი, სატელეფონო მხარდაჭერის შესაძლებლობა ოჯახში დასაქმებული ქალებისთვის დაგვეწყო საოჯახო შრომის კლვევა და გაგვეჩინა მისი  ცვლილების შესაძლებლობა. 
ჩვენ სამი რამ გვაერთიანებს: (1) საოჯახო შრო­მის ცოდნა და გამოცდილება (2) სურვილი, ეს სამუშაო უკეთესი გავხადოთ, (3) რწმენა, რომ გაერთიანებით და ერთმანეთის თა­ნადგომით შრომის პირობების ცვლილება შესაძლებელია.
თითქმის ყოველ კვირას ვიკრიბებით ცოცხლად ან ვიდეო­ზარის საშუალებით. ჩვენი შეხვედრები ყო­ველთვის ერთმანეთის მხარდამჭერი და საქმიანია.
სამსახურის და საოჯახო საქმის მიღმა ძიძებს და საოჯახო მშრომელებს ცოტა თავისუფალი დრო გვრჩება, თუმ­ცა ვცდილობთ, ეს მცირე დრო ერთმანეთის დასახმარებლად, ახალი შესაძლებლობების გაჩენისთვის გამოვიყენოთ.
ვსაუბრობთ ჩვენს სამუშაო გარემოზე, ჩვენი შრო­მის - სხვის ოჯახში შრომის სპეციფიკაზე, მის სირთულეებზე და სიკეთეებზე, ჩვენ საჭიროებებზე, რომელსაც ხშირად ვერც სახელმწიფო და ვერც სხვა მხარეები ხედავენ. 
თუ ხართ საოჯახო მშრომელი, ამ დამოკიდებულებების გჯერათ და ეძებთ თქვენი მსგავსი ყოველდღიურობის მქონე ადამიანების ერთობას, შემოგვიერთდით. " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./favicon.ico" />
      </Head>
      <header className="flex flex-row justify-center items-center">
        <a className='flex flex-row justify-center items-center w-fit' href='https://zrunva.org'>
          <Image className='m-3' src={logo} alt='zrunva.org' width='70' height='50'/>
          <h1 className='m-3' style={{fontFamily: 'nino', fontSize: '20px'}}>ძიძების და საოჯახო მშრომელების ასოციაცია</h1>          
        </a>
      </header>
      <main className='my-5'>
        <div className='flex flex-row justify-around'>
          <button 
          className='px-3 py-1 rounded-xl'
          onClick={() => setBut('but1')} 
          style={{
            background: 'white',
            color: 'black',
            border: 'none',
          }}>საოჯახო მშრომელებისთვის</button>
          <button 
          className='px-3 py-1 rounded-xl'
          onClick={() => setBut('but2')} 
          style={{
            background: 'rgba(249, 209, 209, 0.35)',
            color: 'black',
            
            }}>დამსაქმებლებისთვის</button>
        </div>
        {but === 'but1' ? 
        <Job />
        : <Employee />
        }
      </main>
      <div className="w-full text-center">
        <Link className="text-center my-1" href="/login">Log In</Link>
      </div>
    </>
  )
}