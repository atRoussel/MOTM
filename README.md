
<h1 align="center">
  <br>
  <img src="https://github.com/atRoussel/MOTM/blob/main/webapp-front-and-back/front/src/assets/logo_mini.png" title="MOTM"height="150" />
  <br>
  Mood of The Month
  <br>
</h1>

<h4 align="center">Récoltez le mood de vos employés ! </h4>
<br>
<img src="https://github.com/atRoussel/MOTM/blob/main/webapp-front-and-back/front/src/assets/capture_1.png" title="MOTM" />


<br>
<br>


# Le projet

MOTM est une plateforme d'administration et une plateforme utilisateur pour connaître l'humeur de vos employés sur le dernier mois. En programmant un envoi automatique de mail à tous vos employés, l'application mood of the month enverra un lien à chacun d'entre eux. En suivant le lien, l'employé pourra répondre à un sondage personnalisé, en donnant une note correspondant à son ressenti sur le mois qu'il a passé et s'il le souhaite, en laissant un commentaire anonyme. La plateforme permet aussi d'ajouter des questions supplémentaires à votre sondage !


<h1 align="center">
  <br>
  <br>
  Environnement et lancement du projet
  <br>
</h1>

Pour que l'application se lance correctement, il vous faut : 
- JDK 11 
- Maven 3.6.3
- Intellij IDEA Ultimate
- Docker For Windows


## Lancement du projet

Ouvrez votre invite de commandes et cloner le projet dans un dossier : 

`git clone https://github.com/atRoussel/MOTM.git` 



### Lancement du back : 
Ouvrez IntelliJ IDEA et ouvrir le fichier _**pom.xml**_ à la racine de ce répertoire.


Ouvrez maintenant votre Docker, placez vous dans le dossier _**webapp-front-and-back**_ du projet et lancez votre base de données en entrant la commande : 
```
docker run --name mariadb --rm -e MYSQL_ROOT_PASSWORD=toor -e MYSQL_DATABASE=defaultdb -p 3306:3306 -v "`pwd`/initdb:/docker-entrypoint-initdb.d" mariadb
```


Lors du premier chargement de la BDD, tous les scripts sql contenus dans le dossier initdb seront exécutés automatiquement. Lancez l'application via IntelliJ, et vérifiez qu'elle fonctionne sur http://localhost:8080.

<br>

#### Si la DB ne se lance pas correctement 
 1. Créer votre BDD dans IntelliJ, en renseignant :
 
     - Host : 192.168.99.100  
     - User : voir _**application.properties**_
     - Password : voir _**application.properties**_
     - Database : defaultdb

2. Dans votre dossier application.proporties, vérifier que : `spring.datasource.url=jdbc:mariadb://192.168.99.100:3306/defaultdb`

3. Lancer manuellement `1_TABLES.sql` et `2_DEFAULT_ENTRIES.sql`

4. Lancer l'application

<br>

### Lancement du front :

Ouvrer le dossier front dans une nouvelle fenêtre et dans le terminal, lancez la commande :
`npm i`

Enfin lancer dans le terminal : 
`npm start`

<h1 align="center">
  <br>
  <br>
 Fonctionnement de l'application
  <br>
</h1>
<br>

## Entrez dans la plateforme

Après avoir cliquez sur le lien, l'employé devra renseigner son adresse-mail pour répondre aux sondages. Il ne pourra y accéder seulement si son profil à bien été intégré à la liste des utilisateurs.

Cependant il ne pourra pas accéder à l'espace administrateur. Ce dernier est accessible seulement avec l'adresse admin@gmail.com. 


## Gestions des sondages

Pour créer un nouveau sondage, rendez-vous à la section "Ajouter un sondage". Vous y trouverez la liste de tous les sondages que vous avez créés. Pour remplacer le sondage en cours, il suffit d'en créer un nouveau. Le sondage en cours ne pourra pas être supprimé.

## Gestion de l'envoi des mails
