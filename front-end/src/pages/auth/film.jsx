export default function Film() {
  return (
    <main className="main">
      <p className="navigation">Last</p>
      <div className="video">
        <img src="https://img.freepik.com/premium-vector/social-media-youtube-poster-with-icons-around-vector-illustration_980832-100.jpg?w=360" alt="youtube" />

      </div>

  

      <div className="card">
        <h2 className="text-3xl font-bold underline">nom de film: L'AUBE</h2>
        <p>Profile</p>
        <p>Jean Dupont – France</p>

        <div className="share">
          <h3>PARTAGER CE FILM</h3>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">

            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
              alt="Facebook"
              width={40}
            />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">

            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
              alt="Twitter"
              width={40}
            />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
              alt="Instagram"
              width={40}
            /><br>
            </br>
          </a>
          <placeholder>httm:jkljkljjkjjj</placeholder>
          <button className="btn btn-warning">Partager</button>

        </div> {/* share div の閉じタグ */}

        <div className="rating">
          <div className="rating-header">
            <span>Qualité globale</span>
            <span>0 / 10</span>
          </div>
          <input type="range" min="0" max="10" defaultValue="0" />
        </div>

        <button>VALIDER  MA  NOTE</button><br />
        <button>OUI</button><button>NON</button><button>A debattre</button>
      </div> {/* card div の閉じタグ */}
    </main> /* main タグはここで閉じる */
  );
}
