# Übung 3: Aufteilung eines Commits in separate Commits

## Übungsziel

In dieser Übung lernst du, wie du einen bereits erstellten Commit nachträglich in mehrere separate Commits aufteilen kannst. Dies ist eine wichtige Technik, um die Commit-Historie sauber und nachvollziehbar zu halten.

## Szenario

Wir haben die About-Seite implementiert und dabei gleichzeitig den Namen eines Navigationslinks von "Statistics" zu "Analytics" geändert. Diese beiden Änderungen gehören logisch nicht zusammen und sollten in separaten Commits sein.

Deine Aufgabe ist es, den bestehenden Commit in zwei separate Commits aufzuteilen:
1. Einen Commit für die Implementierung der About-Seite
2. Einen Commit für die Umbenennung des Navigationslinks

## Vorbereitung

1. Stelle sicher, dass du dich im Branch `feature/about` befindest
2. Überprüfe die Commit-Historie mit `git log --oneline`
   Du solltest den Commit "Implement About page and update navigation" sehen

## Aufgabe

Folge diesen Schritten, um den Commit aufzuteilen:

1. **Starte ein interaktives Rebase bis zum Commit, den du aufteilen möchtest**:
   ```bash
   git rebase -i HEAD~1
   ```

2. **Ändere `pick` zu `edit` für den Commit, den du aufteilen möchtest**:
   ```
   edit b5dba33 Implement About page and update navigation
   ```
   Speichere und schließe den Editor.

3. **Setze den Commit zurück, behalte aber die Änderungen im Staging-Bereich**:
   ```bash
   git reset HEAD^
   ```

4. **Füge die Änderungen für den ersten Commit hinzu**:
   - Für die About-Seite:
   ```bash
   git add about.html styles/components/about.css styles/components.css
   ```
   - Für den About-Link in der Navigation (nur die About-Link-Änderung):
   ```bash
   git add -p index.html
   ```
   Wähle bei der interaktiven Auswahl nur die Hunk oder Zeilen aus, die den About-Link betreffen.

5. **Erstelle den ersten Commit**:
   ```bash
   git commit -m "Implement About page"
   ```

6. **Füge die Änderungen für den zweiten Commit hinzu**:
   ```bash
   git add index.html
   ```

7. **Erstelle den zweiten Commit**:
   ```bash
   git commit -m "Rename Statistics to Analytics in navigation"
   ```

8. **Schließe das Rebase ab**:
   ```bash
   git rebase --continue
   ```

## Hinweise

- Bei `git add -p` kannst du mit `y` einen Hunk hinzufügen, mit `n` einen Hunk überspringen, und mit `s` einen Hunk aufteilen.
- Wenn du einen Fehler gemacht hast, kannst du mit `git rebase --abort` den Rebase abbrechen und von vorne beginnen.
- Achte darauf, dass deine Commit-Messages den Inhalt der Commits präzise beschreiben.
- Überprüfe nach dem Rebase mit `git log --oneline`, ob die Commits korrekt aufgeteilt wurden.

## Warum ist das wichtig?

Das Aufteilen von Commits in logische Einheiten hat mehrere Vorteile:

1. **Bessere Nachvollziehbarkeit**: Jeder Commit repräsentiert eine einzelne, logische Änderung.
2. **Einfachere Code-Reviews**: Reviewer können sich auf eine Änderung pro Commit konzentrieren.
3. **Präzisere Git-Operationen**: Operationen wie `git bisect` oder `git revert` werden präziser.
4. **Klarere Commit-Messages**: Jede Message kann sich auf eine spezifische Änderung konzentrieren.

In der Praxis ist es oft einfacher, Änderungen von Anfang an in separate Commits aufzuteilen. Das Aufteilen von Commits nachträglich ist jedoch eine wichtige Fähigkeit, wenn du feststellst, dass ein Commit zu viele unzusammenhängende Änderungen enthält.
