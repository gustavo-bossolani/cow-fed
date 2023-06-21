import { ChartOptions } from 'chart.js';
interface Chart {
  labels: string[];
  datasets: Dataset[]
}

interface Dataset {
  data: number[],
  backgroundColor: string[],
  hoverBackgroundColor: string[]
}

const options = {
  layout: {
    padding: 10
  },
  plugins: {
    title: {
      display: true,
      text: '',
      position: 'top',
      font: {
        family: "'mulish-bold', sans-serif",
        size: 16,
      },
    },
    subtitle: {
      display: true,
      text: '',
      position: 'top',
      font: {
        family: "'mulish-light', sans-serif",
        size: 16,
      },
    },
    legend: {
      position: 'chartArea',
      padding: 20,
      font: {
        family: "'mulish-light', sans-serif",
        size: 16,
      },
      labels: {
        font: {
          family: "'mulish-light', sans-serif",
          size: 16,
        }
      }
    },
    tooltip: {
      titleFont: {
        family: "'mulish-light', sans-serif",
        size: 14,
      }
    }
  },
}

export { Chart, Dataset, options };
