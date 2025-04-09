# Übung 1: Aufteilung von Änderungen in saubere Commits

## Übungsziel

In dieser Übung lernst du, wie du Änderungen in sinnvolle, separate Commits aufteilen kannst.
Du wirst ein Changeset analysieren und entscheiden, wie die enthaltenen Änderungen am besten in einzelne Commits organisiert werden sollten.

## Szenario

Wir haben ein neues Feature implementiert: Die Task-Liste. Bei der Implementierung haben wir aber noch ein paar andere
Dinge angepasst.

Deine Aufgabe ist es, diese Änderungen zu analysieren und in sinnvolle, separate Commits aufzuteilen.

## Vorbereitung

1. Stelle sicher, dass du dich im Hauptverzeichnis des Projekts befindest
2. Führe den folgenden Befehl aus, um das Changeset anzuwenden:

```bash
git apply exercises/patches/exercise-1.patch
```

## Aufgabe

Nachdem du das Patch angewendet hast:

1. Analysiere die Änderungen mit `git diff` oder in deinem Editor
2. Identifiziere die verschiedenen Arten von Änderungen (Feature, Refactoring, Codestyle)
3. Überlege, welche Änderungen zusammengehören und welche getrennt werden sollten
4. Erstelle separate Commits für die verschiedenen Arten von Änderungen
5. Schreibe aussagekräftige Commit-Messages, die den Zweck und die Auswirkungen jeder Änderung klar kommunizieren

## Hinweise

- Verwende `git add -p` oder `git add <file>`, um gezielt Änderungen zu stagen
- Denke daran, dass ein guter Commit eine logische Einheit von Änderungen darstellt
- Überlege, in welcher Reihenfolge die Commits am sinnvollsten sind
- Achte auf die Qualität deiner Commit-Messages
