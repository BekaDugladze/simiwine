export function Daxmareba(props){
    return(
        <div className='formDiv2'>
            <label>17. რომელი ქვემოთ ჩამოთვლილი სერვისით ისარგებლებდით ასოციაციის მხრიდან?</label>
            <div className='flex flex-row'>
                <label>საოჯახო მშრომელის შვებულების ან ავადმყოფობის დროს, დროებითი ჩანაცვლება</label>
                <input type="checkbox" value='საოჯახო მშრომელის შვებულების ან ავადმყოფობის დროს, დროებითი ჩანაცვლება' onChange={props.handleDaxmareba} />
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
                <label>ხელშეკრულების გაფორმება და დასაქმებულის ზედამხედველობა</label>
                <input type="checkbox" value='ხელშეკრულების გაფორმება და დასაქმებულის ზედამხედველობა' onChange={props.handleDaxmareba} />
            </div>
            <div className='flex flex-row'>
                <label>საჭიროების შემთხვევაში იურიდიული დახმარება</label>
                <input type="checkbox" value='საჭიროების შემთხვევაში იურიდიული დახმარება' onChange={props.handleDaxmareba} />
            </div>
            <div className='flex flex-row'>
                <label>პროფესიული ტრენინგი ოჯახში დასაქმებულისთვის</label>
                <input type="checkbox" value='პროფესიული ტრენინგი ოჯახში დასაქმებულისთვის' onChange={props.handleDaxmareba} />
            </div>
            <div className='flex flex-row'>
                <label>ფსიქო-საგანმანათლებლო ტრენინგი მშობლებისთვის ბავშვთა აღზრდის საკითხებზე</label>
                <input type="checkbox" value='ფსიქო-საგანმანათლებლო ტრენინგი მშობლებისთვის ბავშვთა აღზრდის საკითხებზე' onChange={props.handleDaxmareba} />
            </div>
        </div>
    )
}

export function Gadaxda(props){
    return(
        <div className='formDiv2'>
            <label htmlFor='name, lastname'>18. ძიძების და საოჯახო მშრომელების ასოციაციაში თქვენთვის შესაფერი საოჯახო მშრომელის მოძიების და შრომის გრძელვადიანი ზედამხედველობისთვის არის <span className="font-bold"> ერთჯერადი გადასახდელი, 300 ლარი.</span> <br></br><br></br> ამ თანხას იხდის დამსაქმებელი ოჯახი კანდიდატის შერჩევის და გამოსაცდელი პერიოდის წარმატებით გავლის შემფეგ. შეგვიძლია თანხის რამდენიმე ნაწილად გადახდა შემოგთავაზოთ. გთხოვთ მიუთითოთ საჭიროების შემთხვევაში. </label>
            <select id='saati'  onChange={props.handleGadaxda} required>
                    <option value=''>აირჩიეთ</option>
                    <option value='გადავიხდი ერთიანად'>გადავიხდი ერთიანად</option>
                    <option value='გავანაწილებ 2 თვეზე'>გავანაწილებ 2 თვეზე</option>
            </select>
        </div>
        )
}