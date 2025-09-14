
export function Qalaqi(props){
    return(
        <div className='formDiv2'>
            <label htmlFor='name, lastname'>3. საცხოვრებელი ქალაქი</label>
            <select id='qalaqi' value={props.qalaqi} onChange={props.handleQalaqi} required>
                <option value=''>აირჩიეთ ქალაქი</option>
                <option value='თბილისი'>თბილისი</option>
                <option value='თბილისის შემოგარენი'>თბილისის შემოგარენი</option>
                <option value='ბათუმი'>ბათუმი</option>
                <option value='ქუთაისი'>ქუთაისი</option>
                <option value='რუსთავი'>რუსთავი</option>
                <option value='აბაშა'>აბაშა</option>
                <option value='ამბროლაური'>ამბროლაური</option>
                <option value='ახალქალაქი'>ახალქალაქი</option>
                <option value='ახალციხე'>ახალციხე</option>
                <option value='ახმეტა'>ახმეტა</option>
                <option value='ბაღდათი'>ბაღდათი</option>
                <option value='ბოლნისი'>ბოლნისი</option>
                <option value='ბორჯომი'>ბორჯომი</option>
                <option value='გარდაბანი'>გარდაბანი</option>
                <option value='გორი'>გორი</option>
                <option value='გურჯაანი'>გურჯაანი</option>
                <option value='დედოფლისწყარო'>დედოფლისწყარო</option>
                <option value='დმანისი'>დმანისი</option>
                <option value='დუშეთი'>დუშეთი</option>
                <option value='ვანი'>ვანი</option>
                <option value='ზესტაფონი'>ზესტაფონი</option>
                <option value='ზუგდიდი'>ზუგდიდი</option>
                <option value='თელავი'>თელავი</option>
                <option value='თერჯოლა'>თერჯოლა</option>
                <option value='კასპი'>კასპი</option>
                <option value='ლაგოდეხი'>ლაგოდეხი</option>
                <option value='ლანჩხუთი'>ლანჩხუთი</option>
                <option value='მარნეული'>მარნეული</option>
                <option value='მარტვილი'>მარტვილი</option>
                <option value='მცხეთა'>მცხეთა</option>
                <option value='ნინოწმინდა'>ნინოწმინდა</option>
                <option value='ოზურგეთი'>ოზურგეთი</option>
                <option value='ონი'>ონი</option>
                <option value='საგარეჯო'>საგარეჯო</option>
                <option value='სამტრედია'>სამტრედია</option>
                <option value='საჩხერე'>საჩხერე</option>
                <option value='სენაკი'>სენაკი</option>
                <option value='სიღნაღი'>სიღნაღი</option>
                <option value='ტყიბული'>ტყიბული</option>
                <option value='ქობულეთი'>ქობულეთი</option>
                <option value='ყვარელი'>ყვარელი</option>
                <option value='ცაგერი'>ცაგერი</option>
                <option value='წყალტუბო'>წყალტუბო</option>
                <option value='ჭიათურა'>ჭიათურა</option>
                <option value='ხაშური'>ხაშური</option>
                <option value='ხობი'>ხობი</option>
                <option value='ხონი'>ხონი</option>
            </select>
        </div>
    )
}

export function Ubani(props){
    return(
        <div className='formDiv2'>
            <label htmlFor='ubani'>5. საცხოვრებელი უბანი</label>
            {props.qalaqi === 'თბილისი' && (
            <select id='ubani' value={props.ubani} onChange={props.handleUbani} disabled={!props.qalaqi} required>
                    <>
                    <option value=''>აირჩიეთ უბანი</option>
                    <option value='ავლაბარი'>ავლაბარი</option>
                    <option value='ბაგები'>ბაგები</option>
                    <option value='გლდანი'>გლდანი</option>
                    <option value='დიდი დიღომი'>დიდი დიღომი</option>
                    <option value='დიდუბე'>დიდუბე</option>
                    <option value='დიღმის მასივი'>დიღმის მასივი</option>
                    <option value='ვაზისუბანი'>ვაზისუბანი</option>
                    <option value='ვაკე'>ვაკე</option>
                    <option value='ვარკეთილი'>ვარკეთილი</option>
                    <option value='ვაშლიჯვარი'>ვაშლიჯვარი</option>
                    <option value='ვერა'>ვერა</option>
                    <option value='ისანი'>ისანი</option>
                    <option value='ივერთუბანი'>ივერთუბანი</option>
                    <option value='ლისი'>ლისი</option>
                    <option value='მთაწმინდა'>მთაწმინდა</option>
                    <option value='ნაძალადევი'>ნაძალადევი</option>
                    <option value='ნუცუბიძის პლატოები'>ნუცუბიძის პლატოები</option>
                    <option value='საბურთალო'>საბურთალო</option>
                    <option value='სამგორი'>სამგორი</option>
                    <option value='სოლოლაკი'>სოლოლაკი</option>
                    <option value='ჩუღურეთი'>ჩუღურეთი</option>
                    <option value='ჰუალინგი'>ჰუალინგი</option>
                    </>
            </select>
            )} 
            {props.qalaqi === 'თბილისის შემოგარენი' && (
            <select id='ubani' value={props.ubani} onChange={props.handleUbani} disabled={!props.qalaqi} required>
                    <>
                    <option value=''>აირჩიეთ უბანი</option>
                    <option value='კოჯორი'>კოჯორი</option>
                    <option value='ოქროყანა'>ოქროყანა</option>
                    <option value='ტაბახმელა'>ტაბახმელა</option>
                    <option value='შინდისი'>შინდისი</option>
                    <option value='წავკისი'>წავკისი</option>
                    <option value='წყნეთი'>წყნეთი</option>
                    </>
            </select>
            )} 
            {props.qalaqi !== 'თბილისი' && props.qalaqi !== 'თბილისის შემოგარენი' && 
            (<input type='text' onChange={props.handleUbani} disabled={!props.qalaqi} required/>)}
        </div>
    )
}