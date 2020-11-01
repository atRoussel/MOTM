
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

MOTM est une plateforme pour administrateur et utilisateur afin de connaître l'humeur de vos employés sur le dernier mois. En programmant un envoi automatique de mails à tous vos employés, l'application Mood of The Month enverra un lien à chacun d'entre eux. En suivant le lien, l'employé pourra répondre à un sondage personnalisé, en donnant une note correspondant à son ressenti sur le mois qu'il a passé (et à d'autres questions éventuellement) et s'il le souhaite, en laissant un commentaire anonyme. 
L'administrateur, quant à lui, peut observer l'évolution des résultats grâce à un dashboard et ce pour le sondage en cours et les anciens sondages.


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
  - Un navigateur web (Google Chrome conseillé)


## Lancement du projet

Créez un nouveau dossier puis ouvrez un invite de commandes et clonez le projet dans ce dossier : 

`git clone https://github.com/atRoussel/MOTM.git` 

<br>

### Lancement du back : 
Lancez IntelliJ IDEA et ouvrez le fichier _**pom.xml**_ (dossier "api") en tant que projet.


Ouvrez maintenant votre Docker en tant qu'administrateur, placez vous dans le dossier _**webapp-front-and-back**_ du projet et lancez votre base de données en entrant la commande : 
```
docker run --name mariadb --rm -e MYSQL_ROOT_PASSWORD=toor -e MYSQL_DATABASE=defaultdb -p 3306:3306 -v "`pwd`/initdb:/docker-entrypoint-initdb.d" mariadb
```


Lors du premier chargement de la BDD, tous les scripts SQL contenus dans le dossier `initdb` seront exécutés automatiquement. Lancez l'application via IntelliJ, et vérifiez qu'elle fonctionne sur http://localhost:8080.

<br>

#### Si la DB ne se lance pas correctement 
 1. Créez votre BDD dans IntelliJ, en renseignant :
 
     - Host : 192.168.99.100  
     - User : voir _**application.properties**_
     - Password : voir _**application.properties**_
     - Database : defaultdb

2. Dans votre dossier application.properties, vérifiez que la ligne suivante est correcte : `spring.datasource.url=jdbc:mariadb://192.168.99.100:3306/defaultdb`

3. Lancez manuellement `1_TABLES.sql` et `2_DEFAULT_ENTRIES.sql`à l'aide de la commade _Run_.

4. Lancez enfin _**Application.java**_

<br>

### Lancement du front :

Ouvrez le dossier _**front**_ dans une nouvelle fenêtre et dans le terminal, lancez la commande :
`npm i`

Enfin, lancez dans le terminal : 
`npm start`

Une fois que le serveur est chargé, l'application est disponible à l'adresse http://localhost:4200

<h1 align="center">
  <br>
  <br>
 Fonctionnement de l'application
  <br>
</h1>
<br>

## Entrer dans la plateforme

Après avoir cliquez sur le lien, l'employé devra renseigner son adresse mail pour répondre au sondage. Il ne pourra y accéder seulement si son profil à bien été intégré à la liste des utilisateurs; son mail doit donc appartenir à la base de données. 

<h5 align="center">
<br>
  <img src="https://github.com/atRoussel/MOTM/blob/main/webapp-front-and-back/front/src/assets/capture_identification.png" title="Identification" height="400"/>
  <br>
</h5>

Vous pouvez utiliser le mail admin@gmail.com pour vous connecter à l'application et donc répondre au sondage, et accéder à l'espace administrateur.

Une fois connecté, vous pouvez répondre aux questions du sondage, et laisser un commentaire. Si un utilisateur répond plusieurs fois au même sondage, cela ne fera que modifier ses réponses précédentes.  

<h5 align="center">
<br>
  <img src="https://github.com/atRoussel/MOTM/blob/main/webapp-front-and-back/front/src/assets/capture_sondage.png" title="Sondage" height="600"/>
  <br>
</h5>


## Gestions des sondages

Pour créer un nouveau sondage, rendez-vous à la section "_Ajouter un sondage_". Vous y trouverez la liste de tous les sondages que vous avez créés. 

Vous pourrez alors créer un sondage avec un titre, une description, une question générale pour connaître le mood du mois. Vous aurez aussi la possibilité d'ajouter des questions supplémentaires.

Pour la publication, deux options s'offrent à vous : 
    - soit publiez le sondage immédiatement,
    - soit différez la publication du sondage.
    
Vous avez également la possibilité de changer d'avis, et de publier votre sondage même si le compte à rebours n'est pas terminé.
    
  <h5 align="center">
<br>
  <img src="https://github.com/atRoussel/MOTM/blob/main/webapp-front-and-back/front/src/assets/capture_sondage_ajout.png" title="Ajout sondage" height="400"/>
  <br>
</h5>


## Gestion des utilisateurs

Dans l'onglet "_Utilisateurs_", vous pouvez observer la liste des utilisateurs présents dans la base de données, en ajouter, les supprimer ou les modifier. Seul le compte admin@gmail.com ne peut pas être supprimé ou modifié.

## La page _Statistiques_

Page principale de la section administrateur, l'onglet "_Statistiques_" vous permet d'observer les résultats du sondage en cours ou d'un ancien sondage. La page permet aussi de voir l'évolution de la moyenne générale de plusieurs sondages sur un seul graphique.

<h5 align="center">
  <img src="https://github.com/atRoussel/MOTM/blob/main/webapp-front-and-back/front/src/assets/dashboard_1.png" title="Identification" width="500"/>
  <br>
  <img src="https://github.com/atRoussel/MOTM/blob/main/webapp-front-and-back/front/src/assets/dashboard_2.png" title="Identification" width="500"/>
  
  
  <br>
 
  <img src="https://github.com/atRoussel/MOTM/blob/main/webapp-front-and-back/front/src/assets/dashboard_3.png" title="Identification" width="500"/>
  <br>
  <img src="https://github.com/atRoussel/MOTM/blob/main/webapp-front-and-back/front/src/assets/dashboard_4.png" title="Identification" width="500"/>
</h5>


## Gestion de l'envoi des mails

C'est dans le dossier "_api_" que un mail prédéfini sera envoyé à chaque utilisateur présent dans la base de données. Seul les adresses gmail bénéficieront du formatage html.

  <h5 align="center">
<br>
  <img src="https://github.com/atRoussel/MOTM/blob/main/webapp-front-and-back/front/src/assets/capture_mail.png" title="Ajout sondage" height="200"/>
  <br>
</h5>


