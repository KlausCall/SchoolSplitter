# School Splitter

### Language remark

This tool is currently only available in german and is direted to german users.
For this reason this docummentation is also in german - sorry.

## Einführung

Dieses Programm dient der Aufteilung einer Klassenstufe in zwei oder mehr
Gruppen, die im Wechsel unterrichtet werden. Es versucht Aufteilungen zu
finden, bei denen möglchst wenig paarweise Kontakte zwischen Schülern
entstehen. Als Nebenbedinguung kann die resultierende Größe der Kurse definiert werden.

Die Aufteilung einer Klassenstufe ist trivial, so lange der Unterricht
durchgehende im Klassenverbund stattfindet. Werden jedoch einzelne Fächer
(wie.z.B. Religion, die 2. Fremdsprache) in Kursen mit unterschiedlicher
Belegung unterrichtet, so steigt die Komplexität deutlich.

Das Programm ist motiviert durch die Corona Pandemie im Jahr 2020 und der
in diesem Kontext aufgekommenen Überlegung, im Wechsel einen Teil der Schüler im Präsenzunterricht zu unterrichten, während die anderen Schüler zu Hause Online lernen.

## Installation

Das Programm läuft vollständig im Browser. Zur Nutzung stehen zwei Optionen zur Auswahl.

**Unabhängig von der Art der Nutzung verbleiben die verarbeiteten Daten immer lokal auf dem Rechner des Nutzers! Eine Übertragung der Daten zu irgendeinem Server efolgt in keinem Fall !**

### Online Nutzung

Die jeweils aktuellste Version ist Online verfügbar und kann direkt im Browser
unter https://klauscall.github.io/SchoolSplitter/ aufgerufen werden. Bei
Online Nutzung ist keinerlei lokale Installation notwendig.

### Lokale Installation

Die freigegbenen Versionen werden auf GitHub als _Releases_ unter
https://github.com/KlausCall/SchoolSplitter/releases veröffentlicht. Hier kann im gewünschten Release die Datei `SchoolSplitter-\<version\>.zip` heruntergeladen werden. Diese Datei ist lokal auf das Dateisystem zu entpacken. Zum Start wird im Browser die enthaltene Datei `index.html` aufgerufen.

## Nutzung

Zur Nutzung sind drei Schritte notwendig:

- CSV Datei mmit Schülern und Ihren Kursen laden
- Lösung berechnen lassen
- Ergebnis ansehen und als CSV-Datei speichern.

Weitere Details finden sich in der enthaltenen Hilfe.

## Feedback / Fragen / Fehler / Erweiterungen

**Dieses ist ein Freizeit-Projekt, deshalb gibt es keinen Support!**

Jegliches Anliegen kann aber jederzeit im [GitGub Projekt SchoolSplitter](https://github.com/KlausCall/SchoolSplitter) als _Issue_ eingestellt werden. Das wird gelegentlich besichtigt und vielleicht auch beantwortet.

## Entwicklung

Das Projekt ist in TypeScript geschrieben. Die Oberfläche wurde mit ReactJS gebaut. Um einen Build anzufertigen müssen `NodeJS` und `npm` installiert sein.

### Build:

```sh
npm run build
```

### Develop:

```
npm run start
```
