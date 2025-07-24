import { useUser } from "../context/UserContext";
import Nesting from "../assets/Nesting.svg";
import Star from "../assets/Star.svg";
import Shield from "../assets/Chield_alt.svg";
const RepoItem = (props) => {

function formatDistanceToNow(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.round((now - date) / 1000);

  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else {
    return `${days} days ago`;
  }
}
  return (
    <a href={props.url} target="_blank">
    <div className="bg-[linear-gradient(95deg,_#111729_3%,_#1d1b48_99.61%)] p-4 text-graytext rounded-xl">
      <h2 className="text-whitetext font-[550]">{props.name}</h2>
      <p className=" mt-2">{props.desc}</p>
      <div className="flex mt-4 gap-x-4 gap-y-2 flex-row flex-wrap items-center">
        {props.license ? (
          <div className="flex gap-x-1 items-center">
            <img src={Shield} alt="License" />
            <p>MIT</p>
          </div>
        ) : (
          <></>
        )}

        <div className="flex gap-x-1 items-center">
          <img src={Nesting} alt="Forks" />
          <p>{props.forks}</p>
        </div>
        <div className="flex gap-x-1 items-center">
          <img src={Star} alt="Stars" />
          <p>{props.stars}</p>
        </div>
      </div>
      <p className="text-sm mt-4">updated {formatDistanceToNow(props.updated)}</p>
    </div>
    </a>
  );
};

export default RepoItem;
