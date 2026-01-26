import "./dashboard.css"; 
import
function Dashboard() {
  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <h2 className="dashboard-kicker">BACK-OFFICE OFFICIEL</h2>
        <h2 className="dashboard-title">ADMIN MANAGEMENT</h2>
        <p className="dashboard-user">
          ADMINISTRATEUR admin@email.com
        </p>
      </div>

      <div className="dashboard-overview">
        <h1 className="overview-title">VUE D'ENSEMBLE</h1>

        <p className="overview-description">
          Analyse détaillée de la progression du festival et des indicateurs de performance
        </p>

        <div className="overview-metrics">

          <p className="metric1">
            Objectif 600. 482 films évalués par le jury. 80,3% complété
          </p>

          <p className="metric2">
            Quota 100/JURE. 08/12 jurés ayant finalisé leur lot. En cours de délibération
          </p>

          <p className="metric3">
            124 pays représentés. TOP ZONE : Europe
          </p>

          <p className="metric4">
            72% taux d'occupation workshops. Voir les éléments
          </p>

          <p className="metric5">
            182 comptes réalisateurs actifs. +8 aujourd'hui
          </p>

        </div>
      </div>

    </div>
  );
}

export default Dashboard;
