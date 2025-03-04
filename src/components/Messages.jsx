import Chat from "./Chat";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function Messages() {
  const userState = useSelector((store) => store.user);
  const storedConnection = JSON.parse(
    localStorage.getItem("selectedConnection")
  );

  if (storedConnection) {
    console.log("Connection Retrieved:", storedConnection);
  }
  return (
    storedConnection &&
    userState && (
      <div>
        <Chat connection={storedConnection} userId={userState._id} />
      </div>
    )
  );
}

export default Messages;
