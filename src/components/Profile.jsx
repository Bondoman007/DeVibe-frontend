import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";
function Profile() {
  const userState = useSelector((store) => store.user);
  return (
    userState && (
      <div>
        <EditProfile userState={userState} />
      </div>
    )
  );
}

export default Profile;
