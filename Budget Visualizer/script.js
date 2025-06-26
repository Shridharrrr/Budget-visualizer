const form = document.getElementById('expense-form');
const categoryInput = document.getElementById('category');
const amountInput = document.getElementById('amount');
const ctx = document.getElementById('expense-chart').getContext('2d');

let expenses = {};

let chart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: [],
    datasets: [{
      label: 'Expenses',
      data: [],
      backgroundColor: [],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  }
});

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const category = categoryInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (!category || isNaN(amount) || amount <= 0) return;

  // Update or add the expense
  if (expenses[category]) {
    expenses[category] += amount;
  } else {
    expenses[category] = amount;
  }

  updateChart();
  form.reset();
});

function updateChart() {
  const labels = Object.keys(expenses);
  const data = Object.values(expenses);

  const backgroundColors = labels.map((_, i) => `hsl(${i * 60 % 360}, 70%, 60%)`);

  chart.data.labels = labels;
  chart.data.datasets[0].data = data;
  chart.data.datasets[0].backgroundColor = backgroundColors;

  chart.update();
}
