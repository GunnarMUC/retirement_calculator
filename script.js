// script.js – Marcus Retirement Artifact
let chartInstance = null;

function calculate() {
  const age = parseFloat(document.getElementById('age').value);
  const targetAge = parseFloat(document.getElementById('targetAge').value);
  const currentSavings = parseFloat(document.getElementById('currentSavings').value);
  const annualIncome = parseFloat(document.getElementById('annualIncome').value);
  const monthlySavings = parseFloat(document.getElementById('monthlySavings').value);

  // Validation
  if (isNaN(age) || age <= 0 || age > 120) {
    alert('Bitte gib ein gültiges Alter ein (1-120).');
    return;
  }
  if (isNaN(targetAge) || targetAge <= age || targetAge > 120) {
    alert('Bitte gib ein gültiges Rentenalter ein (höher als aktuelles Alter, bis 120).');
    return;
  }
  if (isNaN(currentSavings) || currentSavings < 0) {
    alert('Bitte gib ein gültiges Vermögen ein (nicht negativ).');
    return;
  }
  if (isNaN(annualIncome) || annualIncome <= 0) {
    alert('Bitte gib ein gültiges Jahreseinkommen ein (größer als 0).');
    return;
  }
  if (isNaN(monthlySavings) || monthlySavings < 0) {
    alert('Bitte gib einen gültigen monatlichen Sparbetrag ein (nicht negativ).');
    return;
  }

  const years = targetAge - age;
  const annualSavings = monthlySavings * 12;
  const annualExpenses = annualIncome - annualSavings;
  const targetNestEgg = 25 * annualExpenses;

  const fvCurrent = currentSavings * Math.pow(1.07, years);
  const fvFuture = annualSavings * ((Math.pow(1.07, years) - 1) / 0.07);
  const totalProjected = Math.round(fvCurrent + fvFuture);
  const behind = Math.max(0, targetNestEgg - totalProjected);

  renderResults(age, targetAge, targetNestEgg, totalProjected, behind, monthlySavings, years, currentSavings, annualSavings);
}

function renderResults(age, targetAge, target, projected, behind, monthlySavings, years, currentSavings, annualSavings) {
  const results = document.getElementById('results');
  results.classList.remove('hidden');

  let html = `<h2 class="text-3xl font-semibold mb-6">Hey, hier ist dein Ergebnis:</h2>`;

  if (behind === 0) {
    html += `<div class="text-center"><div class="text-5xl font-bold text-emerald-600">Ihr seid AUF KURS! ✅</div><p class="text-2xl mt-6">Ihr werdet voraussichtlich <span class="font-semibold">€${projected.toLocaleString('de-DE')}</span> haben – sogar €${Math.round(projected - target).toLocaleString('de-DE')} mehr als nötig. Mit Kindern und Hypothek ist das eine echte Leistung!</p></div>`;
  } else {
    const annualFactor = (Math.pow(1.07, years) - 1) / 0.07;
    const extraMonthly = Math.ceil((behind / annualFactor) / 12);

    // Dynamische Jahre für "Länger arbeiten" – cap at 20 to prevent infinite loop
    let extraYears = 2;
    const maxExtraYears = 20;
    while (extraYears < maxExtraYears) {
      const newYears = years + extraYears;
      const newProjected = Math.round(currentSavings * Math.pow(1.07, newYears) + annualSavings * ((Math.pow(1.07, newYears) - 1) / 0.07));
      if (newProjected >= target) break;
      extraYears++;
    }
    if (extraYears >= maxExtraYears) extraYears = maxExtraYears; // Cap if still not enough

    const comboMonthly = Math.round(extraMonthly * 0.45);

    // ETF-Sparplan berechnung (8,5% Rendite, 4 diversifizierte ETFs à 25%)
    const etfRenditeJaehrlich = 0.085;
    const etfRenditeMonatlich = Math.pow(1 + etfRenditeJaehrlich, 1/12) - 1;
    const etfMonths = years * 12;
    const etfMonthlyFactor = (Math.pow(1 + etfRenditeMonatlich, etfMonths) - 1) / etfRenditeMonatlich;
    const etfMonthlyRate = Math.round(behind / etfMonthlyFactor);
    const etfProjection = behind; // Mit diesem Sparplan wird die Lücke genau geschlossen

    html += `
      <div class="text-center">
        <div class="text-5xl font-bold text-rose-600">Ihr seid HINTERHER</div>
        <p class="text-xl mt-4">Ihr werdet bei ca. <span class="font-semibold">€${projected.toLocaleString('de-DE')}</span> liegen.</p>
        <p class="text-rose-600 font-medium">Das sind <span class="font-semibold">€${behind.toLocaleString('de-DE')}</span> zu wenig.</p>
      </div>

      <div class="mt-12">
        <p class="font-medium text-lg text-stone-700">Aber keine Panik – ich weiß, mit zwei Kindern und Hypothek fühlt sich das gerade nicht leicht an. Hier sind vier echte Wege, wie ihr das noch schafft:</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div class="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-center">
            <p class="font-semibold">Mehr sparen</p>
            <p class="text-4xl font-bold text-rose-600 mt-3">+ €${extraMonthly.toLocaleString('de-DE')}</p>
            <p class="text-sm text-stone-600">pro Monat zusätzlich</p>
          </div>
          <div class="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
            <p class="font-semibold">Länger arbeiten</p>
            <p class="text-4xl font-bold text-amber-600 mt-3">+ ${extraYears} Jahre</p>
            <p class="text-sm text-stone-600">bis Alter ${targetAge + extraYears}</p>
          </div>
          <div class="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
            <p class="font-semibold">Kombi (meist am einfachsten)</p>
            <p class="text-4xl font-bold text-emerald-600 mt-3">+ €${comboMonthly.toLocaleString('de-DE')} / Monat</p>
            <p class="text-sm text-stone-600">+ ${extraYears} Jahre</p>
          </div>
          <div class="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
            <p class="font-semibold text-blue-900">ETF-Sparplan</p>
            <p class="text-xs text-blue-700 mt-1 mb-3">25% S&P 500 / Nasdaq 100 / MSCI World / US Treasuries</p>
            <p class="text-4xl font-bold text-blue-600 mt-2">€${etfMonthlyRate.toLocaleString('de-DE')}</p>
            <p class="text-sm text-stone-600">monatlich</p>
            <p class="text-xs text-blue-700 mt-2">→ Zusammen: Ziel (€${target.toLocaleString('de-DE')}) erreicht!</p>
          </div>
        </div>
      </div>`;
  }

  html += `
    <canvas id="projectionChart" class="mt-8 w-full" style="max-height: 300px;"></canvas>
    <div class="mt-8 flex gap-4">
      <button onclick="copyResults()" class="bg-amber-100 hover:bg-amber-200 text-amber-800 py-3 px-6 rounded-2xl font-medium">Ergebnis kopieren</button>
      <button onclick="resetForm()" class="bg-stone-200 hover:bg-stone-300 text-stone-700 py-3 px-6 rounded-2xl font-medium">Nochmal von vorne</button>
    </div>
  `;
  results.innerHTML = html;

  // Chart zeichnen - mit setTimeout um sicherzustellen, dass Canvas existiert
  setTimeout(() => {
    if (behind > 0) {
      drawChart(years, currentSavings, annualSavings, target, etfMonthlyRate, 0.085);
    } else {
      drawChart(years, currentSavings, annualSavings, target);
    }
  }, 100);
}

function drawChart(years, currentSavings, annualSavings, target, etfMonthlyRate = null, etfRate = null) {
  try {
    const canvasElement = document.getElementById('projectionChart');
    if (!canvasElement) {
      console.error('Canvas element not found');
      return;
    }

    if (chartInstance) chartInstance.destroy();
    const ctx = canvasElement.getContext('2d');
    if (!ctx) {
      console.error('Failed to get 2D context');
      return;
    }

    const labels = [];
    const projectedData = [];
    const etfData = [];
    
    for (let y = 0; y <= years; y++) {
      labels.push(`Jahr ${y}`);
      const fvCurrent = currentSavings * Math.pow(1.07, y);
      const fvFuture = annualSavings * ((Math.pow(1.07, y) - 1) / 0.07);
      projectedData.push(Math.round(fvCurrent + fvFuture));
      
      // ETF-Sparplan Projektion: nur monatliche Sparrate (kein aktuelles Vermögen)
      if (etfMonthlyRate && etfRate) {
        const etfMonthlyRateDecimal = Math.pow(1 + etfRate, 1/12) - 1;
        const etfMonths = y * 12;
        const etfValue = etfMonthlyRate * ((Math.pow(1 + etfMonthlyRateDecimal, etfMonths) - 1) / etfMonthlyRateDecimal);
        etfData.push(Math.round(etfValue));
      }
    }

    const targetData = new Array(years + 1).fill(target);

    const datasets = [
      {
        label: 'Eure Projektion (7%)',
        data: projectedData,
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.1,
        borderWidth: 2
      },
      {
        label: 'Ziel-Nest-Egg',
        data: targetData,
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderDash: [5, 5],
        tension: 0.1,
        borderWidth: 2
      }
    ];

    // Wenn ETF-Daten vorhanden, hinzufügen
    if (etfData.length > 0) {
      datasets.push({
        label: 'ETF-Zusatzplan (8,5%)',
        data: etfData,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.1,
        borderWidth: 2
      });
    }

    if (typeof Chart === 'undefined') {
      console.error('Chart.js not loaded');
      return;
    }

    chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Renten-Projektion über die Jahre' }
        },
        scales: {
          y: { beginAtZero: true, ticks: { callback: value => '€' + value.toLocaleString('de-DE') } }
        }
      }
    });
  } catch (error) {
    console.error('Error rendering chart:', error);
  }
}

function resetForm() {
  document.getElementById('results').classList.add('hidden');
  document.getElementById('results').innerHTML = '';
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }
}

function copyResults() {
  const resultsText = document.getElementById('results').innerText;
  navigator.clipboard.writeText(resultsText).then(() => {
    alert('Ergebnis kopiert!');
  }).catch(err => {
    console.error('Fehler beim Kopieren: ', err);
  });
}

// Form dynamisch erzeugen
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  form.innerHTML = `
    <div class="grid grid-cols-2 gap-6">
      <div><label class="block text-sm font-medium text-stone-700 mb-1">Dein aktuelles Alter</label><input id="age" type="number" value="48" class="w-full border border-stone-300 focus:border-amber-400 rounded-3xl px-5 py-4 text-lg"></div>
      <div><label class="block text-sm font-medium text-stone-700 mb-1">Gewünschtes Rentenalter</label><input id="targetAge" type="number" value="69" class="w-full border border-stone-300 focus:border-amber-400 rounded-3xl px-5 py-4 text-lg"></div>
    </div>
    <div class="mt-8"><label class="block text-sm font-medium text-stone-700 mb-1">Aktuelles Gesamtvermögen (€)</label><input id="currentSavings" type="number" value="70000" class="w-full border border-stone-300 focus:border-amber-400 rounded-3xl px-5 py-4 text-lg"></div>
    <div class="grid grid-cols-2 gap-6 mt-8">
      <div><label class="block text-sm font-medium text-stone-700 mb-1">Jährliches Haushaltseinkommen (€)</label><input id="annualIncome" type="number" value="120000" class="w-full border border-stone-300 focus:border-amber-400 rounded-3xl px-5 py-4 text-lg"></div>
      <div><label class="block text-sm font-medium text-stone-700 mb-1">Monatlich sparen (€)</label><input id="monthlySavings" type="number" value="1500" class="w-full border border-stone-300 focus:border-amber-400 rounded-3xl px-5 py-4 text-lg"></div>
    </div>
  `;
});