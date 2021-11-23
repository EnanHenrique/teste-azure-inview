
gradientChartOptionsConfigurationWithTooltipPurple = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },

  tooltips: {
    backgroundColor: '#f5f5f5',
    titleFontColor: '#333',
    bodyFontColor: '#666',
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest"
  },
  responsive: true,
  scales: {
    yAxes: [{
      barPercentage: 1.6,
      gridLines: {
        drawBorder: false,
        color: 'rgba(29,140,248,0.0)',
        zeroLineColor: "transparent",
      },
      ticks: {
        suggestedMin: 60,
        suggestedMax: 125,
        padding: 20,
        fontColor: "#9a9a9a"
      }
    }],

    xAxes: [{
      barPercentage: 1.6,
      gridLines: {
        drawBorder: false,
        color: 'rgba(255, 0, 0,0.1)',
        zeroLineColor: "transparent",
      },
      ticks: {
        padding: 20,
        fontColor: "#9a9a9a"
      }
    }]
  }
};


var minhasLabels = []
var diario = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00',
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
  '20:00', '21:00', '22:00', '23:00',]
minhasLabels.push(diario)


var semanal = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB']
minhasLabels.push(semanal)

var mensal = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']
minhasLabels.push(mensal)

var chart_labels = minhasLabels;
//Receber do banco de dados

var dataDiario = [50, 30, 60, 40, 80, 20, 60, 70, 40, 20, 10, 40, 50, 70, 80, 20, 40, 60, 50, 60, 70, 20, 40, 90]
var dataSemanal = [50, 30, 60, 40, 80, 20, 60]
var dataMensal = [50, 30, 60, 40, 80, 20, 60, 70, 40, 20, 10, 40]

var chart_data = []

chart_data.push(dataDiario)
chart_data.push(dataSemanal)
chart_data.push(dataMensal)


var ctx = document.getElementById("chartLineCpu").getContext('2d');

var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

gradientStroke.addColorStop(1, 'rgba(0, 255, 162,0.15)');
gradientStroke.addColorStop(0.4, 'rgba(0, 255, 162,0.008)');
gradientStroke.addColorStop(0, 'rgba(0, 255, 162, 0.0)'); //purple colors

var config = {
  type: 'line',
  data: {
    labels: chart_labels[0],
    datasets: [{
      label: "Consumo",
      fill: true,
      backgroundColor: gradientStroke,
      borderColor: 'white',
      borderWidth: 2,
      borderDash: [],
      borderDashOffset: 0.0,
      pointBackgroundColor: 'white',
      pointBorderColor: 'rgba(255,255,255,0)',
      pointHoverBackgroundColor: 'white',
      pointBorderWidth: 20,
      pointHoverRadius: 4,
      pointHoverBorderWidth: 15,
      pointRadius: 4,
      data: chart_data[0],
    }]
  },
  options: gradientChartOptionsConfigurationWithTooltipPurple
};
var myChartData = new Chart(ctx, config);



// RAM


var ctxRam = document.getElementById("chartLineRam").getContext('2d');

var gradientStroke = ctxRam.createLinearGradient(0, 230, 0, 50);

gradientStroke.addColorStop(1, 'rgba(0, 255, 162,0.15)');
gradientStroke.addColorStop(0.4, 'rgba(0, 255, 162,0.008)');
gradientStroke.addColorStop(0, 'rgba(0, 255, 162, 0.0)'); //purple colors
var configRam = {
  type: 'line',
  data: {
    labels: chart_labels[0],
    datasets: [{
      label: "Consumo",
      fill: true,
      backgroundColor: gradientStroke,
      borderColor: 'white',
      borderWidth: 2,
      borderDash: [],
      borderDashOffset: 0.0,
      pointBackgroundColor: 'white',
      pointBorderColor: 'rgba(255,255,255,0)',
      pointHoverBackgroundColor: 'white',
      pointBorderWidth: 20,
      pointHoverRadius: 4,
      pointHoverBorderWidth: 15,
      pointRadius: 4,
      data: chart_data[0],
    }]
  },
  options: gradientChartOptionsConfigurationWithTooltipPurple
};
var myChartDataRam = new Chart(ctxRam, configRam);




// Disco



var ctxDisco = document.getElementById("chartLineDisco").getContext('2d');

var gradientStroke = ctxDisco.createLinearGradient(0, 230, 0, 50);

gradientStroke.addColorStop(1, 'rgba(0, 255, 162,0.15)');
gradientStroke.addColorStop(0.4, 'rgba(0, 255, 162,0.008)');
gradientStroke.addColorStop(0, 'rgba(0, 255, 162, 0.0)'); //purple colors
var configDisco = {
  type: 'line',
  data: {
    labels: chart_labels[0],
    datasets: [{
      label: "Consumo",
      fill: true,
      backgroundColor: gradientStroke,
      borderColor: 'white',
      borderWidth: 2,
      borderDash: [],
      borderDashOffset: 0.0,
      pointBackgroundColor: 'white',
      pointBorderColor: 'rgba(255,255,255,0)',
      pointHoverBackgroundColor: 'white',
      pointBorderWidth: 20,
      pointHoverRadius: 4,
      pointHoverBorderWidth: 15,
      pointRadius: 4,
      data: chart_data[0],
    }]
  },
  options: gradientChartOptionsConfigurationWithTooltipPurple
};
var myChartDataDisco = new Chart(ctxDisco, configDisco);

$("#0").click(function () {
  var data = myChartData.config.data;
  data.datasets[0].data = chart_data[0];
  data.labels = chart_labels[0];

  var dataRam = myChartDataRam.config.data;
  dataRam.datasets[0].data = chart_data[0];
  dataRam.labels = chart_labels[0];


  var dataDisco = myChartDataDisco.config.data;
  dataDisco.datasets[0].data = chart_data[0];
  dataDisco.labels = chart_labels[0];

  textoCpu.innerHTML =`Frequência diário CPU`;
  textoRam.innerHTML =`Frequência diário Ram`;
  textoDisco.innerHTML =`Frequência diário Disco`;


  myChartData.update();
  myChartDataRam.update();
  myChartDataDisco.update();
  
  

});
$("#1").click(function () {
  

  var data = myChartData.config.data;
  data.datasets[0].data = chart_data[1];
  data.labels = chart_labels[1];

  var dataRam = myChartDataRam.config.data;
  dataRam.datasets[0].data = chart_data[1];
  dataRam.labels = chart_labels[1];


  var dataDisco = myChartDataDisco.config.data;
  dataDisco.datasets[0].data = chart_data[1];
  dataDisco.labels = chart_labels[1];

  textoCpu.innerHTML =`Frequência semanal CPU`;
  textoRam.innerHTML =`Frequência semanal Ram`;
  textoDisco.innerHTML =`Frequência semanal Disco`;


  myChartData.update();
  myChartDataRam.update();
  myChartDataDisco.update();
});

$("#2").click(function () {
  var data = myChartData.config.data;
  data.datasets[0].data = chart_data[2];
  data.labels = chart_labels[2];

  var dataRam = myChartDataRam.config.data;
  dataRam.datasets[0].data = chart_data[2];
  dataRam.labels = chart_labels[2];


  var dataDisco = myChartDataDisco.config.data;
  dataDisco.datasets[0].data = chart_data[2];
  dataDisco.labels = chart_labels[2];


  textoCpu.innerHTML =`Frequência mensal CPU`;
  textoRam.innerHTML =`Frequência mensal Ram`;
  textoDisco.innerHTML =`Frequência mensal Disco`;

  myChartData.update();
  myChartDataRam.update();
  myChartDataDisco.update();
});


