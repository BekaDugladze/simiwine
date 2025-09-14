export function Daxmareba(props){
    return(
        <div className='formDiv2'>
            <label>20. რომელი ქვემოთ ჩამოთვლილი სერვისით ისარგებლებთ ასოციაციის მხრიდან?</label>
            <div className='flex flex-row'>
                <label>არ მსურს</label>
                <input type="checkbox" value='არ მსურს' onChange={props.handleDaxmareba} />
            </div>
            <div className='flex flex-row'>
                <label>პროფესიული ტრენინგი</label>
                <input type="checkbox" value='პროფესიული ტრენინგი' onChange={props.handleDaxmareba} />
            </div>
            <div className='flex flex-row'>
                <label>სატელეფონო კონსულტაცია შრომის საკითხებზე</label>
                <input type="checkbox" value='სატელეფონო კონსულტაცია შრომის საკითხებზე' onChange={props.handleDaxmareba} />
            </div>
            <div className='flex flex-row'>
                <label>სატელეფონო კონსულტაცია ბავშის აღზრდის საკითხებზე</label>
                <input type="checkbox" value='სატელეფონო კონსულტაცია ბავშის აღზრდის საკითხებზე' onChange={props.handleDaxmareba} />
            </div>
            <div className='flex flex-row'>
                <label>ხელშეკრულების გაფორმება და სამუშაო პროცესის ზედამხედველობა</label>
                <input type="checkbox" value='ხელშეკრულების გაფორმება და სამუშაო პროცესის ზედამხედველობა' onChange={props.handleDaxmareba} />
            </div>
            <div className='flex flex-row'>
                <label>საჭიროების შემთხვევაში იურიდიული დახმარება</label>
                <input type="checkbox" value='საჭიროების შემთხვევაში იურიდიული დახმარება' onChange={props.handleDaxmareba} />
            </div>
            <div className='flex flex-row'>
                <label>სხვა ადამიანით დროებითი ჩანაცვლება შვებულების ან ავადმყოფობის დროს</label>
                <input type="checkbox" value='სხვა ადამიანით დროებითი ჩანაცვლება შვებულების ან ავადმყოფობის დროს' onChange={props.handleDaxmareba} />
            </div>
            <div className='flex flex-row'>
                <label>სხვა</label>
                <input type="checkbox" value='სხვა' onChange={props.handleDaxmareba} />
            </div>
        </div>
    )
}

export function Gadaxda(props){
    return(
        <div className='formDiv2'>
            <label htmlFor='name, lastname'>21. ასოციაციის დასაქმების მომსახურება თქვენთვის უფასოა. დასაქმების და სასურველი ოჯახის პოვნის შემთხვევაში, გაქვთ თუ არა სურვილი დაეხმაროთ ასოციაციას ნებისმიერი ოდენობის თანხის ჩარიცხვით? </label>
            <select id='sertifikati' ref={props.gadaxdaRef} required>
                <option value=''>აირჩიეთ</option>
                <option value='კი'>კი</option>
                <option value='არა'>არა</option>
            </select>
        </div>
        )
}