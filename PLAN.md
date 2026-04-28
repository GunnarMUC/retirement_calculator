# PROJECT PLAN – Artifact Sprint (Marcus Retirement Tool)
**GROK CODE CONTEXT MANAGEMENT GUIDE**  
Damit Grok Code bei diesem längeren Projekt NIE den Context verliert:

1. **Immer zuerst diese Datei lesen** + `README.md` + `CURRENT_MILESTONE`
2. **Current Milestone** immer updaten, bevor du Code änderst
3. **Zwischenschritte & Decisions** hier dokumentieren
4. Bei jeder neuen Grok-Code-Session: "Lese PLAN.md und aktuelles Milestone"

## CURRENT MILESTONE (immer aktuell halten!)
**Milestone 2 – ETF-Empfehlung erweitert** ✅ (heute fertig)
- 4. Empfehlung: Dynamischer ETF-Sparplan mit 8,5% Rendite
- 4 diversifizierte ETFs (25% je): S&P 500 / Nasdaq 100 / MSCI World / US Treasuries
- Monatliche ETF-Sparrate basierend auf Versorgungslücke berechnet
- **Chart erweitert:** Zeigt jetzt 3 Linien wenn unterversorgt:
  1. Aktuelle Projektion (7%)
  2. Zielziel (konstante grüne Linie)
  3. ETF-Sparplan Projektion (8,5%, blau)
- Grid auf 2x2 Layout
- Alle Berechnungen und Charts validiert

**Milestone 3 – Final Delivery** (nächstes Ziel)
- 100-Word Write-up
- Export als eine schöne index.html für Marcus

**Milestone 3 – Final Delivery**
- 100-Word Write-up
- Export als eine schöne index.html für Marcus

## Project Context
- Ziel: Interaktives Tool, das Marcus an Prospects schickt
- Technik: 100% lokal, Single HTML, MacBook Pro M5 Pro optimiert
- Voice: Exakt wie Marcus im Client Brief
- Keep it simple: max. 5 Input-Felder, unter 3 Minuten nutzbar

## Previous Decisions (Grok Code soll hier immer drauf zurückgreifen)
- 25x Rule + 7% Return (siehe CALCULATION.md)
- Inputs: Age, Target Age, Current Savings, Annual Income, Monthly Savings
- Keine zusätzlichen Felder (KISS)
- Ergebnis: Große klare Aussage + Chart + 3 konkrete "What if"-Pfade

**Nächster Schritt nach diesem Milestone:** Teste index.html im Browser und sag mir, was du verändern willst.