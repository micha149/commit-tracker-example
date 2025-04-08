# System Patterns

## Architektur
Die CommitTracker Task-Management-Anwendung für den Git-Workshop folgt einer einfachen, leicht verständlichen Architektur:

- **Frontend-fokussiert**: Die Anwendung ist rein frontend-lastig, um die Einstiegshürde niedrig zu halten
- **Modularer Aufbau**: Klare Trennung von Komponenten, Services und Utilities
- **Datenpersistenz mit localStorage**: Lokale Speicherung ohne Backend-Anforderungen
- **ES-Module**: Verwendung von JavaScript-Modulen für bessere Code-Organisation

## Schlüssel-Entscheidungen
1. **Technologie-Stack**: HTML/CSS/JavaScript mit Vite als Build-Tool, aber ohne komplexe Frameworks
2. **Einfache Build-Pipeline**: Vite für schnelle Entwicklung und Bundling
3. **Lokale Datenhaltung**: Verwendung von localStorage für Datenpersistenz
4. **Modulare Struktur**: Aufteilung in Services, Components und Utilities für bessere Wartbarkeit
5. **Responsive Design**: Flexbox und Grid für ein adaptives Layout auf verschiedenen Geräten

## Design-Patterns
- **Modul-Pattern**: Verwendung von ES-Modulen für bessere Code-Organisation
- **Service-Pattern**: Kapselung der Datenzugriffsfunktionen in einem Service
- **Komponenten-basierte Struktur**: UI-Elemente als wiederverwendbare Komponenten
- **Event-Driven**: Interaktionen werden über Events gesteuert
- **Separation of Concerns**: Klare Trennung von Darstellung (HTML/CSS), Logik (JS) und Daten (Storage Service)
- **Repository-Pattern**: Der Storage-Service implementiert ein Repository-Pattern für den Datenzugriff

## Komponenten-Beziehungen
```
index.html
  ├── styles/
  │     ├── main.css (Allgemeines Layout und Styling)
  │     └── components.css (Komponenten-spezifisches Styling)
  ├── scripts/
  │     ├── app.js (Hauptanwendung, Initialisierung)
  │     ├── components/
  │     │     ├── taskList.js (Anzeige der Tasks)
  │     │     └── taskForm.js (Formular für Task-Erstellung/-Bearbeitung)
  │     ├── services/
  │     │     └── storage.js (Datenpersistenz mit localStorage)
  │     └── utils/
  │           └── dateUtils.js (Hilfsfunktionen für Datumsformatierung)
  └── assets/
        └── icons/ (SVG-Icons)
```

### Datenfluss
```
User Interaction → Components → Storage Service → localStorage
                ↑                      ↓
                └──────────────────────┘
```

## Kritische Implementierungspfade
1. **Projektstruktur**: Verzeichnisstruktur und Grunddateien (✅ Abgeschlossen)
2. **HTML-Grundgerüst**: Semantische Struktur mit Header, Main, Footer (✅ Abgeschlossen)
3. **Basis-Styling**: Responsives Design mit Flexbox und Grid (✅ Abgeschlossen)
4. **Datenmodell & Storage**: Task-Datenmodell und localStorage-Service (✅ Abgeschlossen)
5. **Task-Liste**: Komponente zur Anzeige der Tasks (🔄 In Arbeit)
6. **Task-Formular**: Komponente zur Erstellung und Bearbeitung von Tasks (⏳ Geplant)
7. **Statistik-Dashboard**: Visualisierung von Task-Statistiken (⏳ Geplant)
8. **Bugfixes & Refactorings**: Verbesserungen für Übungszwecke (⏳ Geplant)

## Commit-Struktur-Muster
Für den Workshop werden folgende Commit-Muster demonstriert:

1. **Feature-Commits**: Neue Funktionalität hinzufügen
   - Beispiel: "Set up project structure" - Grundlegende Projektstruktur erstellen
   - Beispiel: "Create HTML foundation" - HTML-Grundgerüst implementieren
   - Beispiel: "Develop data model and storage functions" - Datenmodell und Storage-Service implementieren

2. **Style-Commits**: Formatierung und Aussehen anpassen
   - Beispiel: "Implement base styling" - Basis-Styling hinzufügen

3. **Bugfix-Commits**: Fehler beheben
   - Geplant: "Fix date handling issues" - Probleme mit der Datumsverarbeitung beheben

4. **Refactoring-Commits**: Code-Struktur verbessern ohne Funktionsänderung
   - Geplant: "Refactor task components" - Task-Komponenten optimieren

5. **Dokumentations-Commits**: Kommentare und Dokumentation hinzufügen
   - Geplant: "Add code documentation" - JSDoc-Kommentare und Erklärungen hinzufügen

Diese Muster dienen als Grundlage für die Workshop-Übungen zur Commit-Organisation und demonstrieren verschiedene Arten von Änderungen, die in realen Projekten vorkommen.
