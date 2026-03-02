import { useActionState, useState } from "react";



export default function Contact() {

  // const contactForm = () => {
  //   const [email, setEmail] = useState("");
  //   const [massage, setMessage] = useState("");
  //   const [emailSent, setEmailSent] = useState(false);
  //   const [isSending, setIsSending] = useState(false);
  //   const [showModel, setShowMoel] = useState(false);

  //   const sleep = (waitTime) => new Promise(resolve => setTimeout(resolve, waitTime));
  //   const handleEmailchange = (event) => {
  //     setEmail(event.target.value);
  //   };
  //   const handleMessageChange = (event) => {
  //     setMessage(event.target.value);
  //   };
  //   const handleSubmit = async (event) => {
  //     event.preventDefaut();
  //     try {
  //       setIsSending(true);
  //       await sleep(5000);
  //       console.log("Email eovoyé");

  //       setEmailSent(true);

  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setIsSending(false);
  //     };
  //     console.log('送信されたメール：', email)
  //     console.log('送信されたメッセージ：', message)
  //   }
  // }

  return (
    <div className="item-center text-gray-900 min-h-screen">

      {/* Header */}
      <header className="flex items-center px-10 py-6 ">
        <section className="text-center py-20 px-6">
          <h1 className="text-4xl font-bold mb-9 text-[#FF5845]">CONTACT US!</h1>
          <p className="max-w-2xl mx-auto text-lg text-[#246BAD] leading-relaxed">
            Notre site vous plaît ? <br />
            Pour toute question ou préoccupation, veuillez nous contacter ici.<br /> Nous vous répondrons. Merci
          </p>
        </section>

      </header>

      {/* Contact Section */}
      <section className="relative flex flex-col items-center justify-center py-20 overflow-hidden">

        {/* Background Circle */}
        <div className="absolute w-[450px] h-[450px] bg-purple-300 rounded-full blur-3xl opacity-30 -z-10"></div>

        <div className="relative bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-xl w-[650px]">
          <h2 className="text-center text-lg font-semibold mb-6">
            Envoyer un  Message
          </h2>

          <form className="space-y-4 flex-col">
           {/* {emailSent ?( */}
         
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border-2 border-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-700"
            />

            <input
              type="email"
              // onChange={handleEmailchange}
              placeholder="Enter your email"
              className="w-full border-2 border-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
           
            <textarea
              type="text"
              placeholder="Message"
              row="4"
              // onChange={handleMessageChange}
              className="w-full border-2 border-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
            {/* {isSending ? ( */}
              <img
                src="../src/assets/clock.png"
                alt="watch"
                className=""
              />

            {/* ) : ( */}
            <button className="flex justify-end bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition">
              Envoye
            </button>
            {/* )} */}
          </form>

        </div>
      </section>


    </div>
  );
}