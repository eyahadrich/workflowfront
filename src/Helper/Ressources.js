const module = {
    CoreUrl: "http://integration.clinisys.local",
    CoreUrlB: "http://localhost:9000",
    CoreUrlC: "http://localhost:9011",
    CliniSys: {
        api: "CliniSys/api",
        menups: "menups",
        configerps: "configerps",
        dateServeur: "dateNow"
    },
    Budget: {
        api: "budget-core/api",
        compteur: "compteurs",
        budgets: "budgets",
        budget: "budget",
        typebudgets:"typebudgets",
        revisionsTarifaire: "revisions-tarifaire",
        revisionsChiffreAffaireSociete: "revisions-chiffre-affaire-societe",
        historiqueTarifPrestations:"historique-tarif-prestations",
        historiqueVolumePrestations:"historique-volume-prestations",
        revisionsVolumeActe: "revisions-volume-acte",
        revisionsVolumeSansActe: "revisions-volume-sans-acte",
        historiqueChiffreAffaireSocietes :"historique-chiffre-affaire-societes",
        historiqueChiffreAffaireReferenceSocietes :"historique-chiffre-affaire-reference-societes",
        typebudgetsSansactes:"type-budgetisation-sans-actes",
        revisionChiffreAffaireCentre: "revision-chiffre-affaire-centres",
        historiqueChiffreAffaireReferenceCentre: "historique-ca-reference-centre",
        motifAdmissions:"motif-admissions"
    },
    Employee: {
        api: "workflow-core/api",
        Employees: "employes",
        Employee: "employe",
        employeeTypes:"typeemployes",
        nomEmploye: "Nom de l'employé",
        prenomEmploye: "Prénom de l'employé",
        emailEmploye: "email@example.com",
        dateNaissance: "Date de naissance de l'employé",
        adresse: "Adresse de l'employé",
        tel: "Téléphone de l'employé",
        login: "Identifiant de connexion",
        mdp: "Mot de passe",
        typeEmploye: "Type d'employé"


    },
    ParametragePrestation: {
        typePrestations: "budget-core/api/type-prestations",
        famillePrestations: "budget-core/api/famille-prestations",
        sousFamillePrestations: "budget-core/api/sous-famille-prestations",
        prestations: "budget-core/api/prestations",
        natureCentres:"budget-core/api/nature-centres",
        typeClassements:"budget-core/api/type-classements"
    },
    ParametrageSociete: {
        categoriesSocietes: "categories-societe",
        societes: "societes"
    }
};

export default module;