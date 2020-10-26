let ctx;
let height, width;
//let today = new Date();
let totalMS = 24 * 60 * 60 * 1000;
let totalSec = 24 * 60 * 60;
let hourMS = 60*60*1000;
let minMS = 60*1000;


window.onload = () => {
    let canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        const resizeHandler = () => {
            let rect = document.body.getBoundingClientRect();
            [width, height] = [rect.width, rect.height].map(x => x * window.devicePixelRatio);
            
            canvas.width = width;
            canvas.height = height;
        }  
        resizeHandler();
        window.addEventListener('resize', resizeHandler);
        window.requestAnimationFrame(draw);
    } else {
        console.log(`Please use a browser that supports canvas elements.`);
    }
}


const draw = ms => {
    let today = new Date();
    var hour = today.getHours();
    var minute = today.getMinutes();
    var second = today.getSeconds();
    let millis = today.getMilliseconds();
    var hslColor = `hsl(${((ms/250)%360)}deg, 100%, 50%)`;
    // ctx.fillStyle = hslColor;
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,width,height);
    ctx.strokeStyle = 'white';

    //Curr MS in the day
    let currMS = hour*60*60*1000 + minute*60*1000 + second*1000 + millis;
    drawDay(currMS);
    
    //Curr MS in the hour
    currHourMS = minute*60*1000 + second*1000 + millis;
    drawHour(currMS, currHourMS);
    
    let currMinMS = second*1000 + millis;
    drawMin(currMS, currHourMS, currMinMS);
    
    
    window.requestAnimationFrame(draw);

} 

const drawDay = (currMS) => {
    ctx.strokeRect(
        0, 
        height*(currMS/totalMS), 
        width, 
        height-height*(currMS/totalMS));
}

const drawHour = (currMS, currHourMS) => {
    ctx.strokeRect(
        width*(currHourMS/hourMS), 
        height*(currMS/totalMS), 
        width*(currMS/hourMS), 
        height-height*(currMS/totalMS));
}

const drawMin = (currMS, currHourMS, currMinMS) => {
    ctx.strokeRect(
        width*(currHourMS/hourMS),
        height*(currMS/totalMS) + (height - height*(currMS/totalMS)) * (currMinMS/minMS),
        width - width*(currHourMS/hourMS),
        height - height*(currMS/totalMS) + (height - height*(currMS/totalMS))*(currMinMS/minMS));
}

// const drawSec = (currMS, currHourMS, currMinMS, currSecMS) => {
//     let x = ;
//     let y = ;
//     let secW = ;
//     let secH = ;
//     ctx.strokeRect(x, y, secW, secH);
// }