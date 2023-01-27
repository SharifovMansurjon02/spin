const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
//Object that stores values of minimum and maximum angle for a value
const rotationValues = [
  { minDegree: 0, maxDegree: 10, value: 3 },
  { minDegree: 11, maxDegree: 50, value: 2 },
  { minDegree: 51, maxDegree: 90, value: 1 },
  { minDegree: 91, maxDegree: 130, value: 9 },
  { minDegree: 131, maxDegree: 170, value: 8 },
  { minDegree: 171, maxDegree: 210, value: 7 },
  { minDegree: 211, maxDegree: 250, value: 6 },
  { minDegree: 251, maxDegree: 290, value: 5 },
  { minDegree: 291, maxDegree: 330, value: 4 },
  { minDegree: 331, maxDegree: 360, value: 3 },
];

const data = [12, 12, 12, 12, 12, 12,12,12,12];

var pieColors = [
  "black",
  "yellow",
  "grey"
];

let myChart = new Chart(wheel, {
  
  plugins: [ChartDataLabels],

  type: "pie",
  data: {
   
    labels: [1,2,3,4,5,6,7,8,9],
  
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    
  
    animation: { duration: 0 },
    plugins: {
    
      tooltip: false,
      legend: {
        display: false,
      },
      
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});

const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p>Natija: ${i.value}</p>`;
      spinBtn.disabled = false;
      break;
    }
  }
};


let count = 0;

let resultValue = 101;

spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
 
  

  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);

  let rotationInterval = window.setInterval(() => {
   
    myChart.options.rotation = myChart.options.rotation + resultValue;
    
    myChart.update();
    
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});
