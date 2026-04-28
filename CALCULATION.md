# CALCULATION LOGIC – 25x Rule (Marcus' Methode)

**Inputs**
- Current age
- Target retirement age
- Current savings (€)
- Annual household income (€)
- Current monthly savings (€)

**Formel (transparent)**
years = target_age - current_age
annual_savings = monthly_savings * 12
annual_expenses = annual_income - annual_savings
target_nest_egg = 25 * annual_expenses

**Projektion (7% jährliche Rendite, compound)**
fv_current = current_savings * (1.07 ** years)
fv_future_savings = annual_savings * ((1.07**years - 1) / 0.07)
total_projected = fv_current + fv_future_savings

**Status**
gap = total_projected - target_nest_egg
- gap > 0 → Ahead by €X
- gap < 0 → Behind by €X

**"When news isn't good" Pfade (4 Stück)**
1. Extra monthly savings needed (bei gleichem Rentenalter)
2. Jahre länger arbeiten (bei gleicher Sparrate)
3. Kombi-Vorschlag (kleinere Änderung)
4. Dynamischer ETF-Sparplan (25% S&P 500 / 25% Nasdaq 100 / 25% MSCI World / 25% US Treasuries, 8,5% gewichtete Rendite)

**ETF-Sparplan Berechnung (Pfad 4)**
- Monatliche Sparrate: dynamisch berechnet, um Versorgungslücke bei 8,5% Rendite zu schließen
- Formel: monthly_rate = gap / (((1.085 ** years - 1) / 0.085) / 12)
- Projektion: Wie viel wird mit dieser Sparrate bis zum Rentenalter erreicht
- 4 gleichgewichtete ETFs (25% je): S&P 500, Nasdaq 100, MSCI World, US Treasury Bonds
- Basiert auf 20-Jahres-Durchschnitten dieser Indizes

Annahmen: 7% reale Rendite (Pfade 1-3), 8,5% für ETF-Sparplan, keine Inflation/Steuern (wie Marcus wollte – einfach & ehrlich)