
import "font-awesome/css/font-awesome.min.css";

export default function Film() {
    return (
        <div className="fieldset">
            <p className="navigation">ROTOUR GARERIE</p>
            <div className="video">
                <img src="https://img.freepik.com/premium-vector/social-media-youtube-poster-with-icons-around-vector-illustration_980832-100.jpg?w=360" alt="youtube" />
            </div>



            <div className="filmcard">
                {/* <h2 className="filmcard_title">{Film.title}</h2>
                <p className="filmcard_user">{User.username}</p>
                <p className="filmcard_pay">{Candidature.pay}</p> */}


                <div className="filmshare">
                    <h3 className="filmshare_partager">PARTAGER CE FILM</h3>
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
                    <p className="filmshare_line">LINE DIRECT</p>
                    <input className="filmshare_holder" placeholder="http....."></input>
                    <button className="filmshare_button">COPIER</button>
                </div>
                <div className="filmdetails">
                    <h3 className="filmdetails_synopsis">SYNOPSIS</h3>
                    <h3 className="filmdetails_stack">TECH STACK & IA</h3>

                </div>



            </div> {/* card div の閉じタグ */}
        </div> /* main タグはここで閉じる */
    );
}
