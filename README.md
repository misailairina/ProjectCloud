Proiect Cloud Computing
Aplicație web pentru trimiterea și afișarea de mesaje















Misaila Irina-Madalina
Grupa 1133

Link-uri utile

Link video prezentare proiect: https://youtu.be/rFJczH_tahQ

Link publicare aplicație: https://project-cloud-pied.vercel.app/

1. Introducere
Proiectul „Aplicație web pentru trimiterea și afișarea de mesaje” este o aplicație web realizată pentru a demonstra utilizarea tehnologiilor moderne de cloud computing într-un context educațional. Aplicația oferă o interfață simplă și intuitivă prin care utilizatorii pot trimite mesaje și pot vizualiza mesajele deja existente.
Aplicația folosește serviciile Firebase Firestore și Firebase Cloud Functions pentru a crea o soluție serverless, scalabilă și ușor de întreținut. Comunicarea între frontend și backend se realizează prin metodele SDK Firebase, care asigură sincronizarea în timp real a datelor între client și baza de date în cloud.

2. Descrierea problemei
În contextul actual, comunicarea rapidă și accesibilă reprezintă o nevoie esențială în multe aplicații web. Provocarea este dezvoltarea unui mecanism simplu și scalabil pentru colectarea, procesarea și afișarea mesajelor de la utilizatori, asigurând în același timp performanță și securitate.
Modelele tradiționale de aplicații web folosesc arhitectura client-server, care necesită servere dedicate, baze de date locale și administrarea resurselor hardware, ceea ce poate duce la costuri și complexitate crescute.
Această aplicație rezolvă problema prin utilizarea serviciilor serverless oferite de Firebase. Mesajele sunt trimise printr-un formular în interfața web, prelucrate și stocate direct în cloud, iar lista mesajelor este actualizată în timp real pe toate dispozitivele conectate, fără a fi nevoie de gestionarea unui server propriu.

3. Descriere API	
Aplicația folosește Firebase Cloud Functions pentru a rula funcții backend în cloud fără a avea nevoie de un server propriu. Pentru stocarea și manipularea datelor, se utilizează Firebase Realtime Database, care permite sincronizarea datelor în timp real între client și server.
Interacțiunea dintre frontend și backend nu se face prin cereri HTTP directe sau API REST clasice, ci prin metodele SDK Firebase, care gestionează în mod automat comunicarea și sincronizarea datelor. Astfel, operațiile de creare, citire, actualizare și ștergere a notițelor sunt realizate prin funcții Firebase precum push(), set(), update() și remove().
Funcționalitățile principale implementate sunt:
•	Adăugarea de notițe noi în baza de date;
•	Citirea în timp real a listei de notițe;
•	Actualizarea notițelor existente;
•	Ștergerea notițelor.
4. Flux de date și integrarea serviciilor cloud
Fluxul de date din aplicație funcționează astfel:
1.	Utilizatorul completează un formular cu datele notiței (titlu și descriere) și apasă butonul de trimitere.
2.	Aplicația frontend (React) apelează funcția addNote, care folosește metoda push() din Firebase SDK pentru a crea o intrare nouă în Firebase Realtime Database.
3.	Pe frontend, un listener definit cu onValue() pe referința notes ascultă schimbările din baza de date în timp real.
4.	Ori de câte ori datele se modifică în baza de date, listenerul primește datele actualizate și actualizează lista de notițe afișată în interfață, fără a fi nevoie de reîncărcarea paginii sau efectuarea unor cereri suplimentare.
5.	Operațiile de actualizare și ștergere a notițelor sunt realizate prin metodele update() și remove() ale SDK-ului Firebase, care modifică datele direct în baza de date.
Astfel, aplicația beneficiază de sincronizare în timp real și o interacțiune simplă și eficientă între client și cloud, fără a folosi un API REST tradițional bazat pe cereri HTTP explicite.
Metode HTTP
Aplicația folosește Firebase Realtime Database pentru stocarea și manipularea datelor, iar operațiile de creare, citire, actualizare și ștergere (CRUD) realizate prin Firebase SDK corespund în esență unor metode HTTP standard REST, deși acestea sunt gestionate intern de SDK.
Mai jos sunt prezentate metodele HTTP echivalente pentru operațiile din aplicație, împreună cu exemple de request-uri și răspunsuri aferente:
1. Adăugare notiță (echivalent POST)
•	Funcție în cod: addNote
•	Descriere: Creează o notiță nouă în baza de date cu titlu, descriere și data creării.
•	Echivalent HTTP: POST /notesCod relevant:
![image](https://github.com/user-attachments/assets/da1a8962-74a4-422b-ae37-ceb93854e42b)


Explicație:
•	Se creează o referință în baza de date notesRef la nodul "notes".
•	push(notesRef) generează o cheie unică și creează un nou subnod.
•	set(newNoteRef, newNote) scrie obiectul notei în Firebase.
•	Echivalentul unui request HTTP: POST /notes cu payload JSON
.
2. Citirea listelor de note (Echivalent GET)
•	Funcție: useEffect cu onValue pe referința notes
•	Descriere: Primește în timp real toate notițele salvate în baza de date, ordonate după data creării (ultimele apar primele).
•	Metoda HTTP echivalentă: GET /notes
![image](https://github.com/user-attachments/assets/8b3fa0c2-2ac6-49ff-9087-0a28753d9351)

Explicație:
•	Se creează o referință la nodul "notes" în baza de date Firebase.
•	onValue(notesRef, callback) setează un listener în timp real care primește datele actualizate.
•	Datele sunt transformate din obiect într-un array de notițe cu ID-uri (_id).
•	Echivalentul unui request HTTP tradițional este GET /notes care returnează toate notițele.

3. Actualizare notiță (echivalent PUT)
•	Funcție în cod: updateNote
•	Descriere: Actualizează titlul și descrierea unei notițe existente în baza de date.
•	Echivalent HTTP: PUT /notes/:id
![image](https://github.com/user-attachments/assets/a2d33bcb-420a-41e6-9d4f-864101d13239)
Explicație:
•	Se actualizează nodul corespunzător notiței cu ID-ul id folosind referința notes/${id}.
•	Metoda update() modifică doar câmpurile trimise (title, description).
•	Echivalentul unui request HTTP este PUT /notes/:id cu payload JSON { title, description }.

4. Ștergere notiță (echivalent DELETE)
•	Funcție în cod: deleteNote
•	Descriere: Șterge o notiță din baza de date folosind ID-ul său.
•	Echivalent HTTP: DELETE /notes/:id
![image](https://github.com/user-attachments/assets/15e31813-80de-4de4-928a-283666bee17d)


Explicație:
•	Se folosește referința notes/${id} pentru a elimina nodul notiței.
•	remove() șterge complet subnodul din baza de date.
•	Echivalentul unui request HTTP este DELETE /notes/:id.

5. Reordonare notițe (operațiune locală)
•	Funcție în cod: moveNote
•	Descriere: Mută o notiță în lista locală de notițe mutând poziția între indexuri.
•	Echivalent HTTP: Nu există un echivalent HTTP direct (operațiune locală în UI).
![image](https://github.com/user-attachments/assets/23f1e860-10ab-44cd-b531-0b2330886e71)

Explicație:
•	Manipularea array-ului local de notițe pentru a schimba ordinea.
•	Această operațiune nu este sincronizată direct cu baza de date Firebase, deci nu implică un request HTTP.

5. Capturi ecran aplicație
![image](https://github.com/user-attachments/assets/f6e2ff65-128c-4c44-a21e-c68ad7e2a1b8)
![image](https://github.com/user-attachments/assets/138782d1-765e-46b1-ad35-5c81b3ff299d)
![image](https://github.com/user-attachments/assets/b2bdf3f5-62aa-4588-92ef-296e3e150e67)
![image](https://github.com/user-attachments/assets/51b24f10-5eaf-4084-ad30-2282560fb989)
![image](https://github.com/user-attachments/assets/34d97645-3344-44a1-818e-5bc8eb8e2935)

6.	Referințe
•	Google Firebase Documentation. Firebase Realtime Database https://firebase.google.com/docs/database
•	Google Firebase Documentation. Firebase Cloud Functions https://firebase.google.com/docs/functions
•	React Official Documentation. React Basics and Hooks https://reactjs.org/docs/getting-started.html

