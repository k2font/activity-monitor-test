import os from "os";
import Chart from "chart.js";

// Chart.jsのオブジェクト
let chart: typeof Chart;

// 最後にosから取得したCPU時間を格納する配列
// 二次元配列
let lastMeasureTimes: number[][];

// 直近のCPU時間を格納する関数
const setLastMeasureTimes = (cpus: os.CpuInfo[]) => {
  for(let i = 0; i < cpus.length; ++i) {
    lastMeasureTimes[i] = getCpuTimes(cpus[i]);
  }
};

// CPU時間を取得する関数
const getCpuTimes = (cpu: os.CpuInfo) => {
  return [
    cpu.times.user,
    cpu.times.sys,
    cpu.times.idle,
  ];
}


const getDatasets = () => {
  const datasets = [];
  const cpus = os.cpus();

  for(let i = 0; i < cpus.length; ++i) {
    const cpu = cpus[i];
    const cpuData = {
      data: getCpuTimes(cpu),
      backgroundColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)"
      ]
    }
    datasets.push(cpuData);
  }
  return datasets;
}

// データセットを更新する関数
// やっていること: 
const updateDatasets = () => {
  const cpus = os.cpus();
  for(let i = 0; i < cpus.length; ++i) {
    const cpu = cpus[i];
    // グラフ描画
    chart.data.datasets[i].data = getCpuTimes(cpu);
    for(let k = 0; k < chart.data.datasets[i].data.length; ++k) {
      chart.data.datasets[i].data[k] = +chart.data.datasets[i].data[k] - lastMeasureTimes[i][k];
    }
  }
  chart.update();
  setLastMeasureTimes(cpus);
}

const drawChart = () => {
  // id名はchartを指定。index.htmlのcanvasに指定している。
  chart = new Chart("chart", {
    type: "doughnut",
    data: {
      labels: [
        "User Time (ms)",
        "System Time (ms)",
        "Idle Time (ms)"
      ],
      datasets: getDatasets()
    },
    options: {

    }
  });

  setInterval(updateDatasets, 1000);
}

setLastMeasureTimes(os.cpus());
drawChart();