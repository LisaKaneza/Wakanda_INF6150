var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
var urlencodedParser = bodyParser.urlencoded({ extended: true });

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "MYSQL5034.site4now.net",
  user: "a6ab71_tchalla",
  password: "Uqaminf6150",
  database: "db_a6ab71_tchalla"
});

connection.connect(function(err) {
  if (err) {
    console.log("Connection index error message: " + err.message);
    return;
  }
  console.log("Connected!");
});

connection.end();

/* GET home page. */
router.get("/", function(req, res, next) {
  var maBDCours = req.app.locals.cours;
  var maBDProf = req.app.locals.prof;
  var maBDForum = req.app.locals.forum;
  res.render("accueil", { cours: maBDCours, prof: maBDProf, forum: maBDForum });
});

/* Get course page */
router.get("/cours", function(req, res, next) {
  var cours = req.app.locals.cours;
  res.render("cours", { cours: cours });
});

//confirmation ajout cours
router.post("/ajoutCours", function(req, res) {
  res.send("Cours ajoute avec succes");
});

//confirmation ajout d'une note d'un cours
router.post("/ajoutNoteCours", function(req, res) {
  res.send("Note ajoutee avec succes");
});

//confirmation ajout prof
router.post("/ajoutProf", function(req, res) {
  res.send("Prof ajoute avec succes");
});

//confirmation ajout d'une note d'un prof
router.post("/ajoutNoteProf", function(req, res) {
  res.send("Note ajoutee avec succes");
});

/* Get prof page */
router.get('/prof', function(req, res, next) {
  var prof = req.app.locals.prof;
  res.render('prof', {prof:prof});
});

//calculer de la moyenne selon les analyse de l'évaluation soumise
var Organisation = 0;
var Explications = 0;
var Dynamisme = 0;
var Charge = 0;
var Disponibilite = 0;
var Feedback = 0;
var total = 0;
var moyenne = 0;
var compteur = 0;
var moyenneGeneral = 0;
var moyenneIndividuel = 0;

router.post("/ajouterEvaluation", function(req, res) {
  compteur++;
  Organisation = parseInt(req.param("Organisation"));
  Explications = parseInt(req.param("Explications"));
  Dynamisme = parseInt(req.param("Dynamisme"));
  Disponibilite = parseInt(req.param("Disponibilité"));
  Charge = parseInt(req.param("Charge"));
  Feedback = parseInt(req.param("Feedback"));
  moyenneIndividuel =
    (Organisation +
      Explications +
      Dynamisme +
      Feedback +
      Charge +
      Disponibilite) /
    6;
  total =
    total +
    (Organisation +
      Explications +
      Dynamisme +
      Feedback +
      Charge +
      Disponibilite) /
      6;
  moyenneGeneral = total / compteur;
  res.send(
    "\n Merci pour votre évaluation" +
      "\n" +
      "La note moyenne que vous avez assigné à cet enseignant est " +
      moyenneIndividuel +
      "\n" +
      "La moyene général assignée par tous les élèves est " +
      moyenneGeneral
  );
});

router.get("/horaire", function(req, res, next) {
  res.render("horaire");
});

router.get("/profile", function(req, res, next) {
  res.render("profile");
});

router.post("/", function(req, res, next) {
  res.render("accueil");
});

//s'inscrire
router.get("/sinscrire", function(req, res, next) {
  res.render("sinscrire");
});

//se connecter
router.get("/seconnecter", function(req, res, next) {
  res.render("seconnecter");
});




router.get("/reinitmdp", function(req, res, next) {
  res.render("reinitialisation");
});

router.get("/ressources", function(req, res, next) {
  var ressources = req.app.locals.ressources;
  res.render("ressources", { ressources: ressources });
});

// formulaire de recherche de ressource
router.get("/ressourcesRecherche", urlencodedParser, function(req, res, next) {
  var ressources = req.app.locals.ressources;
  var ressourceRechercher = [];
  var sigle = req.query.sigle;
  var prof = req.query.prof;
  var categorie = req.query.categorie;

  if (sigle === "" && prof === "" && categorie === undefined) {
    res.render("ressources", { ressources: ressources });
  } else {
    ressources.forEach(element => {
      if (
        element.sigle === sigle ||
        element.enseignant === prof ||
        categorie.includes(element.categorie)
      ) {
        ressourceRechercher.push(element);
      }
    });
  }
  res.render("ressources", { ressources: ressourceRechercher });
});

// formulaire de televersement de ressource
router.get("/ressourcesUpload", urlencodedParser, function(req, res, next) {
  var ressources = req.app.locals.ressources;
  console.log(req.query);
  ressources.push(req.query);
  res.render("ressources", { ressources: ressources });
});

router.get("/forum", function(req, res, next) {
  var forum = req.app.locals.forum;
  res.render("forum", { forum: forum });
});

router.get("/rechercheForum", urlencodedParser, function(req, res, next) {
  var forum = req.app.locals.forum;
  var forumRechercher = [];
  var titre = req.query.titre;

  if (titre === "") {
    res.render("forum");
  } else {
    forum.forEach(element => {
      if (element.titre === titre) {
        forumRechercher.push(element);
      }
    });
  }
  res.render("infoForum", { forum: forumRechercher });
});

// route pour aller vers le formulaire d'ajout d'un nouveau forum
router.get("/nouveauForum", function(req, res, next) {
  res.render("ajouteForum");
});

// route pour aller vers le formulaire d'ajout d'un commentaire au forum
router.get("/participerForum", function(req, res, next) {
  var forum = req.app.locals.forum;
  console.log(req.query);
  forum.push(req.query);
  res.send("forum", { forum: forum });
});

// route pour formulaire de recherche de cours
router.get("/coursRecherche", urlencodedParser, function(req, res, next) {
  var cours = req.app.locals.cours;
  var coursRechercher = [];
  var sigle = req.query.sigle;

  if (sigle === "") {
    res.render("cours");
  } else {
    cours.forEach(element => {
      if (element.sigle === sigle) {
        coursRechercher.push(element);
      }
    });
  }
  res.render("infoCours", { cours: coursRechercher });
});

// route pour aller vers le formulaire d'ajout d'une note pour un cours
router.get("/commentaireCours", function(req, res, next) {
  res.render("ajouterNote");
});

// route pour aller vers le formulaire d'ajout d'un prof
router.get("/commentaireProf", function(req, res, next) {
  res.render("ajouterNoteProf");
});

// route pour aller vers le formulaire d'ajout d'un prof
router.get("/evaluationProf", function(req, res, next) {
  res.render("ajouterEvaluation");
});

// route pour aller vers le formulaire d'ajout d'un nouveau cours
router.get("/nouveauCours", function(req, res, next) {
  res.render("ajouterCours");
});

// route pour formulaire de recherche d'un prof
router.get("/rechercheProf", urlencodedParser, function(req, res, next) {
  var prof = req.app.locals.prof;
  var profRechercher = [];
  var nom = req.query.nom;

  if (nom === "") {
    res.render("prof");
  } else {
    prof.forEach(element => {
      if (element.nom === nom) {
        profRechercher.push(element);
      }
    });
  }
  res.render("infoProf", { prof: profRechercher });
});

// route pour aller vers le formulaire d'ajout d'un nouveau prof
router.get("/nouveauProf", function(req, res, next) {
  res.render("ajouterProf");
});

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//    var err = new Error('404: Not Found ' + req.originalUrl); //here
//    err.status = 404;
//    next(err);
// });
module.exports = router;

