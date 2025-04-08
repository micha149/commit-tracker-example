# Tech Context

## Verwendete Technologien
Für die Beispiel-Web-Anwendung "CommitTracker" im Git-Workshop werden folgende Technologien eingesetzt:

- **HTML5**: Grundstruktur der Webseite mit semantischen Tags
- **CSS3**: Styling und Layout mit Flexbox und Grid für Responsiveness
- **JavaScript (ES6+)**: Interaktivität und Anwendungslogik mit Modulen
- **Vite**: Build-Tool für schnelle Entwicklung und Bundling
- **localStorage**: Lokale Datenspeicherung im Browser
- **Git**: Versionskontrolle (Hauptfokus des Workshops)

## Entwicklungsumgebung
Die Entwicklungsumgebung ist bewusst einfach gehalten, aber mit modernen Tools ausgestattet:

- **Editor**: Beliebiger Texteditor oder IDE (VS Code, WebStorm, etc.)
- **Browser**: Moderner Browser mit Developer Tools (Chrome, Firefox, etc.)
- **Git-Client**: Kommandozeilen-Git oder GUI-Tool nach Wahl
- **Node.js**: Für die Ausführung von Vite und npm-Paketen
- **Vite Dev Server**: Lokaler Entwicklungsserver mit Hot Module Replacement

## Technische Einschränkungen
Um den Workshop für alle Teilnehmer zugänglich zu machen, gelten folgende Einschränkungen:

1. **Einfache Build-Pipeline**: Vite wird verwendet, aber ohne komplexe Konfiguration
2. **Keine Frameworks**: Keine Abhängigkeit von React, Vue, Angular, etc.
3. **Keine Backend-Anforderungen**: Keine Notwendigkeit für Server-Technologien
4. **Minimale externe Abhängigkeiten**: Nur wenige, gut dokumentierte npm-Pakete

## Abhängigkeiten
Die Anwendung hat folgende Abhängigkeiten:

- **Vite**: Build-Tool und Entwicklungsserver
- **@fontsource/open-sans**: Webfonts für die Typografie
- Keine weiteren externen Bibliotheken, um die Komplexität gering zu halten

## Tool-Nutzungsmuster
Für den Workshop sind folgende Git-Befehle und -Muster besonders relevant:

### Grundlegende Git-Befehle
- `git add`: Änderungen für Commits vorbereiten
- `git commit`: Änderungen committen
- `git log`: Commit-Historie anzeigen
- `git diff`: Unterschiede zwischen Commits anzeigen
- `git blame`: Herkunft von Code-Zeilen nachverfolgen

### Fortgeschrittene Git-Befehle (Workshop-Fokus)
- `git commit --amend`: Letzten Commit ändern
- `git rebase -i`: Interaktives Rebase für Commit-Manipulation
- `git reset`: Commits zurücksetzen
- `git cherry-pick`: Einzelne Commits übernehmen
- `git revert`: Änderungen rückgängig machen
- `git reflog`: Referenz-Log anzeigen
- `git bisect`: Fehlersuche durch binäre Suche

### Commit-Message-Konventionen
- Prägnante erste Zeile (max. 50-70 Zeichen)
- Detaillierte Beschreibung nach einer Leerzeile
- Verwendung von Präfixen oder Tags für Commit-Typen
- Referenzierung von Tickets oder Issues im Footer

### Branch-Strategien
- Feature-Branches für neue Funktionen
- Bugfix-Branches für Fehlerbehebungen
- Clean-up-Branches für Refactoring und Aufräumarbeiten

Diese Werkzeuge und Muster bilden die technische Grundlage für die Übungen im Workshop.
