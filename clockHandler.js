
const drawCircle = (canvas, radius, color) => {
    canvas.beginPath();//The beginPath() method begins a path, or resets the current path.
    canvas.arc(0,0,radius,0,2*Math.PI);
    canvas.fillStyle = color;
    canvas.fill();
}

const makeGradient = (canvas, radius) => {

    const grad = canvas.createRadialGradient(0,0,radius*0.95,0,0,radius*1.05);
    grad.addColorStop(0,'black');
    grad.addColorStop(1,'rgb(15, 15, 15)');
    // grad.addColorStop(1,'black');

    canvas.strokeStyle = grad;
    canvas.lineWidth = radius*0.1
    canvas.stroke();

}

const setNumbers = (canvas, radius) => {
    canvas.font = radius * 0.15 + "px arial";
    canvas.textBaseline = 'middle';
    canvas.textAlign = 'center';

    for(let hour=1; hour<13; hour++) {

        let angle = hour*Math.PI/6;
        canvas.rotate(angle);
        canvas.translate(0,-radius*0.8);
        canvas.rotate(-angle);
        ctx.fillStyle = "rgb(228, 216, 216)";

        if(hour%3==0) {
            canvas.fillText(String(hour),0,0);
        } else{
            canvas.fillText('.',0,0);
        }

        canvas.rotate(angle);
        canvas.translate(0,radius*0.8);
        canvas.rotate(-angle)

    }
}

const makeCenter = (canvas, radius) => drawCircle(canvas, radius*0.04, 'rgb(228, 216, 216)') 

const drawHands = (position, canvas, length, width) => {
    canvas.beginPath();
    canvas.lineWidth = width;
    canvas.lineCap = 'round';
    canvas.moveTo(0,0);
    canvas.rotate(position);
    canvas.lineTo(0,-length);
    canvas.strokeStyle = 'grey'
    canvas.stroke();
    canvas.rotate(-position);
}

const drawClockHands = (canvas, radius) => {
    const date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    hour = hour%12;

    hour = (hour*Math.PI/6) + (minute*Math.PI/(6*60)) + (second*Math.PI/(6*60*60));
    drawHands(hour, canvas, radius*0.5, radius*0.03);

    minute = (minute*Math.PI/30) + (second*Math.PI/(30*60));
    drawHands(minute, canvas, radius*0.7, radius*0.03)

    second = (second*Math.PI/30);
    drawHands(second, canvas, radius*0.9, radius*0.02)
}


const drawClock = (canvas, radius) => {
    drawCircle(canvas, radius, 'rgb(15, 15, 15)');
    makeGradient(canvas, radius);
    setNumbers(canvas, radius);
    makeCenter(canvas, radius);
    drawClockHands(canvas, radius);

}


const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d');
const coordinate = canvas.height/2;
const radius = canvas.height/2*0.9;
ctx.translate(coordinate,coordinate);
setInterval(()=>drawClock(ctx, radius),1000)








