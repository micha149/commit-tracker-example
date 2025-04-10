# Übung 2: Korrigieren von Fehlern in vergangenen Commits

## Übungsziel

In dieser Übung lernst du, wie du Fehler in vergangenen Commits korrigieren kannst, ohne die Commit-Historie zu verändern. Du wirst lernen, wie man mit `git commit --fixup` und `git rebase -i --autosquash` arbeitet, um Änderungen an früheren Commits vorzunehmen.

## Szenario

Wir haben ein neues Feature implementiert: Die Statistik-Ansicht. Bei der Implementierung haben wir jedoch einige Debug-Ausgaben im Code gelassen und eine suboptimale Implementierung der Datumsstatistiken erstellt.

Deine Aufgabe ist es, diese Probleme zu beheben, indem du Fixup-Commits erstellst und diese dann mit den ursprünglichen Commits zusammenführst.

## Vorbereitung

1. Stelle sicher, dass du dich im Hauptverzeichnis des Projekts befindest
2. Wechsle in den Branch `feature/stats` mit dem Befehl:
   ```bash
   git checkout feature/stats
   ```
3. Überprüfe die Commit-Historie mit `git log --oneline`
   Du solltest die folgenden Commits sehen:
   - "Improve Statistics feature code but leave room for further optimization"
   - "Implement UI for Statistics feature"
   - "Implement data analysis for Statistics feature with debug messages"
   - "Add basic structure for Statistics feature"

## Aufgabe

1. **Debug-Ausgaben entfernen**:
   - Wende den ersten Patch an, um die Debug-Ausgaben zu entfernen:
     ```bash
     git apply exercises/patches/exercise-2-debug.patch
     ```
   - Erstelle einen Fixup-Commit für den Commit, der die Debug-Ausgaben eingeführt hat:
     ```bash
     git add scripts/components/statistics.js
     git commit --fixup=<hash-des-debug-commits>  # Ersetze mit dem Hash von "Implement data analysis for Statistics feature with debug messages"
     ```

2. **Optimiere die Datumsstatistik-Implementierung**:
   - Wende den zweiten Patch an, um die Datumsstatistik-Implementierung zu verbessern:
     ```bash
     git apply exercises/patches/exercise-2-optimize.patch
     ```
   - Erstelle einen Fixup-Commit für den Commit, der die suboptimale Implementierung enthält:
     ```bash
     git add scripts/components/statistics.js
     git commit --fixup=<hash-des-optimize-commits>  # Ersetze mit dem Hash von "Improve Statistics feature code but leave room for further optimization"
     ```

3. **Führe die Fixup-Commits zusammen**:
   - Verwende `git rebase -i --autosquash`, um die Fixup-Commits mit den ursprünglichen Commits zusammenzuführen:
     ```bash
     git rebase -i --autosquash HEAD~6  # Passe die Anzahl der Commits an, falls nötig
     ```
   - Im Editor, der sich öffnet, sollten die Fixup-Commits bereits richtig positioniert sein. Speichere und schließe den Editor, um den Rebase abzuschließen.

## Hinweise

- Der Hash eines Commits kann mit `git log --oneline` gefunden werden
- Fixup-Commits werden automatisch mit dem richtigen Commit zusammengeführt, wenn du `git rebase -i --autosquash` verwendest
- Wenn du einen Fehler gemacht hast, kannst du mit `git rebase --abort` den Rebase abbrechen und von vorne beginnen

## Erwartetes Ergebnis

Nach Abschluss der Übung sollte die Commit-Historie sauber sein, mit den korrigierten Commits an der richtigen Stelle. Die Debug-Ausgaben sollten entfernt und die Datumsstatistik-Implementierung verbessert sein, ohne dass neue Commits in der Historie erscheinen.
