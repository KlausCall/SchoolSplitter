import React from 'react';

interface Props {}

const HelpDialog: React.FC<Props> = () => (
  <div >
    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalScrollable">
      Hilfe
    </button>

    <div className="modal fade" id="exampleModalScrollable" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-scrollable modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalScrollableTitle">Hilfe</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <h4>Überblick</h4>
            <p>
              Dieses Werkzeug dient zur Aufteilung einer Klassenstufe in mehrere Gruppen, die im Wechsel unterrichtet
              werden. Es berücksichtigt insbesondere Klassenstufen, in denen der Unterricht nicht durchgängig im 
              Klassenverbund durchgeführt wird. Es kann also je Schüler eine individuelle Kursbelegung geben.
            </p>
            <p>
              Lösungen werden heuristisch berechnet. Somit wird nicht unbedingt die optimale Lösung gefunden. 
              Hauptbedingung für eine gute Lösung ist eine möglichst geringe Anzahl an paarweisen Kontakten von Schülern.
              Ein Kontakt entseht dabei, wenn zwei Schüler gemeinsam in einem Kurs sind. Zusätzlich können Beschränkungen
              für die resultierende Kursgröße berücksichtigt werden.
            </p>
            <h4>Eingabe Format</h4>
            <p> 
              Als Eingabe wird eine CSV Datei erwartet. Die erste Zeile der Datei wird ignoriert (Kopfzeile).
              Alle weiteren Zeilen entsprechen einem Schüler. Die 
              ersten beiden Werte werden als Nachname und Vorname des Schülers verstanden. Alle weiteren Werte werden als Namen der 
              vom Schüler belegten Kurse interpretiert. Die Kursnamen müssen eindeutig sein, auch in der Schreibweise.  Leere Werte 
              sind zulässig und werden ignoriert. 
            </p>
            <h4>Bedienung</h4>
            <p>
              Zunächst ist im Bereich <i>Eingabe</i> eine Datei im erwarteten Format zu laden. Im Bereich <i>Berechnen</i> kann bei 
              Bedarf die <i>Konfiguartion</i> angepasst werden (Details s.u.) und dann die <i>Lösung berechnet</i> werden. Bei der 
              Berechnung wird der Lösungsalgorithmus mehrmals durchlaufen und die beste gefundene Lösung ausgegeben. Die Anzahl
              der <i>Durchläufe</i> kann vorgegeben werden.
            </p>
            <p>
              Die Ausgabe der eingelesenen und berechneten Daten erfolgt im unteren Bereich tabellarisch und kann als CSV-Datei 
              gesichert werden. Die Tabelle enthält folgende Spalten:
            </p>
            <dl>
              <dt>no</dt>
              <dd>Nummer des Schülers</dd>
              <dt>lastname</dt>
              <dd>Nachname des Schülers</dd>
              <dt>firstname</dt>
              <dd>Vorname des Schülers</dd>
              <dt>combi</dt>
              <dd>
                Eine numerische ID für die Kombination von belegten Kursen des Schülers. Genau die Schüler mit der identischen 
                Kursbelegung haben hier die selbe ID.
              </dd>
              <dt>group</dt>
              <dd>
                ID der Gruppe, der der Schüler bei der Teilung zugeordnet wurde. Die IDs werden numerisch vergeben beginnend  mit Null (0).
              </dd>
              <dt>block-n</dt>
              <dd>
                Name des Kurses den der Schüler im n-ten Block belegt. Die Aufteilung der Kurse auf Blöcke werden automatisch berechnet und 
                müssen somit nicht den echten zeitlichen Blöcken im Stundenplan entsprechen.  
              </dd>
            </dl>
            <p>
              <b><i>Hinweis:</i></b> Schüler in mit der selben Kursbelegung (combi) sind gleichwertig. Sollten Schüler aus einer Kursbelegung 
              auf unterschiedliche Gruppen verteilt worden sein, so ist für das Ergebnis irrelevant welcher konkrete Schüler in welcher
              Gruppe ist. Es kann also innerhalb einer Kursbelegung getauscht werden, so lange die Anzahl der Schüler je Gruppe nicht
              verändert wird.
            </p>
            <h4>Konfiguration</h4>
            <p>
              Optionen zur <i>Konfiguration</i> können auf Wunsch eingeblendet werden. Die Konfigurationen teilen sich in zwei Bereiche.
              Unterhalb der Einstellungen existieren Buttons zur Einzeldurchführung der Optimierung und zur schrittweisen Ausführung.
            </p>
            <h5>Grupen Einstellungen</h5>
            <dl>
              <dt>Anzahl Gruppen</dt>
              <dd>Legt fest in wieviele Gruppen der Jahrgang aufgeteilt werden soll. Möglich sind 2 bis 5 Gruppen.</dd>
              <dt>Begrenzung Gruppen Größe.</dt>
              <dd>
                Definiert die maximale Gruppen Größe. Optionen sind:
                <ul>
                  <li><b>Keine Begrenzung</b> - Die Größe der resultierenden Kurse ist unbegrenzt</li>
                  <li
                    ><b>anhand größtem Kurs</b> - Die Größe der resultierenden Kurse ist begrenzt durch die Größe des 
                    größten Kurses geteilt durch die Anzahl Gruppen.
                  </li>
                  <li>
                    <b>je Kurs</b> - Die Größe der resultierenden Kurse ist begrenzt durch die Größe des 
                    jeweilgen Kurses geteilt durch die Anzahl Gruppen.
                  </li>
                </ul>
              </dd>
              <dt>Toleranz Gruppen Größe</dt>
              <dd>
                Bei einer Begrenzung der Gruppen Größe dürfen die Größen der resultierenden Kurse die Begrenzung um diese
                Anzahl an Schülern übersteigen.
              </dd>
            </dl>
            <h5>Parameter des Algorithmus</h5>
            <dl>
              <dt>Initialisierung</dt>
              <dd>
                Legt die initiale Verteilung der Schüler auf Gruppen fest. Entweder werden initial alle Schüler der 
                ersten Gruppe zugeordnet oder die Verteilung erfolgt zufällig gleichverteilt auf alle Gruppen.
              </dd>
              <dt>Optimierung</dt>
              <dd>
                Legt fest ob der Algorithmus sich bevorzugt langsam oder schnell dem Ziel nähert. Abhängig von dieser Einstellung 
                wird in jeder Runde entweder der Schritt mit der kleinsten oder der größten Verbesserung zur Ausführung gewählt.
              </dd>
              <dt>Schrittauswahl</dt>
              <dd>
                Bei deterministischer Auswahl wird der erste gefunden Schritt mit der kleinsten / größten Verbesserung ausgeführt.
                Bei zufälliger Auswahl wird aus den kleinsten / größten Schritten zufällig ein Schritt zur Ausführung ausgewählt.
              </dd>
              <dt>Schritt Auswahl aus X %</dt>
              <dd>
                Legt fest, wieviel Prozent aller möglichen Schritte bei der zufälligen Auswahl berücksichtigt werden.
              </dd>
            </dl>
            <h4>Algorithmus</h4>
            <p>
              Zur Initialisierung des Algorithmus wrden die Schüler auf Gruppen verteilt, entweder zufällig oder alle in die erste Gruppe.
              Der Optimierungsalgorithmus arbeitet in zwei Phasen. In der ersten Phase wird die Verteilung so angepasst, dass die 
              angestrebten Größen der Teilkurse eingehalten werden. In der zweiten Phase wird die Verteilung so verändert, dass die 
              Anzahl der Kontakte möglichst gering wird.
            </p>
            <p>
              Beide Phasen werden in Schritten durchgeführt. Ein Schritt ist dabei die Verschiebung eines Schülers von einer Gruppe in 
              eine andere Gruppe. Zur Festlegung eines Schrittes werden zunächst alle möglichen Schritte ermittelt, die zur Verbesserung 
              des aktuellen Phasenziels beitragen. Gibt es keine solchen Schritte ist die Phase abgeschlossen. Die gefundenen möglichen 
              Schritte werden gewichtet anhand der Verändeung an der Anzahl der Kontakte, die der jeweilge Schritt bewirken wird. Aus den
              nach Gewicht sortierten Schritten wird der auszuführende Schritt gemäß dern gewählten Optioenn ausgewählt und ausgeführt. 
            </p>
          </div> 
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Schliessen</button>
          </div>
        </div>
      </div>
    </div>
</div>
);

export default HelpDialog;