import waiting_illus from "../../assets/waiting.illus.png";

function Waiting() {
  return (
    <div className="waiting w-100 h-100 d-flex align-items-center justify-content-center flex-column">
      <img
        className="w-50"
        src={waiting_illus}
        alt="select someone to chat with"
      />
      <sup className="text-muted">CHOOSE SOMEONE TO CHAT WITH</sup>
    </div>
  );
}

export default Waiting;
