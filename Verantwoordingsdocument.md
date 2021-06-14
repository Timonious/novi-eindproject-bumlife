Hierin leg je vast welke ontwerpbeslissingen je maakt en waarom je deze keuzes gemaakt hebt.
Dit werkt het beste als je dit al tijdens het ontwikkelen van jouw product begint te maken.
Waarom heb je ervoor gekozen om CSS Grid te gebruiken voor je pagina layout?
Waarom heb je deze specifieke npm package gebruikt en niet een andere?
Welke doorontwikkelingen zijn er mogelijk of misschien zelfs wenselijk,
en waarom heb je deze zelf niet door kunnen voeren?
Heb je bijvoorbeeld iets achterwege gelaten door een tekort aan tijd?
Leg dan uit wat je liever had willen doen als je meer tijd had gehad.

Op te leveren: 
- Verantwoordingsdocument in PDF (.pdf) of mark down (.md)met daarin:
  - Minimaal 10 beargumenteerde keuzes
  - Een beschrijving van limitaties aan de applicatie en mogelijke doorontwikkelingen

- Ik heb gekozen om de bij passende titel en achtergrond van elke pagina in een apart component te beschrijven met een de pagina path-naam als parameter, dit omdat ik anders op de verschillende soorten lokatie paginas niet de correct titels en achtergronden zou krijgen, hierdoor moest ik in de andere paginas de parameters wel handmatig meegeven, voor continuiteit heb ik deze ook de pagina-path-naam gegeven.
- Ik heb gekozen voor een web versie met weinig verschil van de mobiele versie, omdat de doelgebruiker zelden zou beschikken over een desktop, en de app echt voor buiten bedoelt is.
- Ik heb gekozen voor een simpele inlog-omgeving en uitwerking; omdat ik het inloggen voor deze app zelf niet had gemaakt, enkel omdat dit onderdeel was van de opdracht heb ik dit verwerkt.
- Ik heb ervoor gekozen om alle locatie delen van de app via een component te laten lopen, dit vond ik gemakkelijker dan de api gegevens extern op te vragen, dit omdat ik behoorlijk wat gegevens nodig had, en ook aan de hand van die gegevens weer een kaartje op moest vragen. Het leek mij op deze manier minder omslachtig
- Ik heb gekozen om met standaard css te werken en voor elke Component, een aparte stylesheet te maken dit houd het naar mijn mening overzichtelijker.
- Ik heb er voor gekozen om met context provider een normale en een 'drunk' modus te maken, zodat een gebruiker de app in bepaalde omstandigheden beter kan lezen, deze modus heeft invloed op de className van een aantal onderdelen, sommige tekst op sommige paginas, en het wel of niet renderen van een extra pagina.
- Ik heb er ook voor gekozen om het wel of niet ingelogd zijn ook via context provider te laten af handelen, hoewel dit niet persee nodig was, vind dit erg gemakkelijk en overzichtelijk werken.
- Ik heb ervoor gekozen om veel met flexbox te werken, omdat de content zich op elke schermgrootte goed plaatst
- Ik heb ervoor gekozen om de data voor gebruikers, dranksoorten, zoekcriterea in json bestande op te slaan, dit omdat ik zo gemakkelijk data kan veranderen en zo blijft de rest van de code gelijk.
- Ik heb ervoor gekozen het woord "home" te vermijden, omdat dit kwetsend kan zijn voor de bedoelde gebruiker.
- Ik heb voor de volgende npm-packages gekozen:
 1. npm react router dom, om alles correct te routen.
 2. npm react hook form, om gemakkelijk mijn rekenfunctie te maken, en voor mijn inlogpagina
 3. npm axios, voor het ophalen van alle gegevens van de api's

##doorontwikkelingen:
Naast het feit dat ik me bewust ben van het feit dat de doelgebruiker niet in alle gevallen beschikking heeft over een mobiel apparaat om de app te gebruiken zijn er wel een aantal dingen die verbeterd kunnen worden aan de app zelf.
Zo heeft de locatie api minder mogelijkheden dan de maps api van Google, door het gebrek aan een creditcard heb ik ervoor gekozen om met de 'here' maps api te werken, wel zeer uitgebreid, maar minder specifiek in zijn zoekfunctie.
Ook kunnen de achtergrond afbeeldingen beter, voor echt mooie professionele achtergrond afbeeldingen, kom je al gauw uit bij een fotograaf of een (prijzige) stock foto.
