export function Toast({ messages }) {
  return (
    <div className="fixed top-5 right-5 flex flex-col gap-2 z-50">
      {messages.map((msg, i) => (
        <div
          key={i}
          className="bg-red-600 text-white p-3 rounded shadow-lg animate-fadeInOut"
        >
          {msg}
        </div>
      ))}
    </div>
  );
}