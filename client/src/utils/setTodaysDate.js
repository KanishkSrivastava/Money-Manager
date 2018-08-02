const d = new Date();
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const year =  d.getFullYear();
const month = months[d.getMonth()];
let date = d.getDate();
if(date<10){
    date = `0${date}`
}
const DATE = (`${month} ${date}, ${year}`);

export default DATE;
