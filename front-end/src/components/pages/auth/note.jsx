


export default function Note() {
  return (
    <main className="main">


      <div className="rating">
        <div className="rating-header">
          <span>Qualité globale</span>
          <span>0 / 10</span>
        </div>
        <input type="range" min="0" max="10" defaultValue="0" />
      </div>

      <button>VALIDER  MA  NOTE</button><br />
      <button>OUI</button><button>NON</button><button>A debattre</button>
    </main> /* main タグはここで閉じる */
  );
}
