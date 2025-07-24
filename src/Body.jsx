import { useUser } from "./context/UserContext";
import RepoItem from "./components/RepoItem";
const Body = () => {
  const { error, bodyUser, bodyRepo } = useUser();
  return (
    <main className="bg-bg min-h-98 relative px-6 md:px-10 pb-10">
      {!bodyUser ? (
        <p className="text-whitetext absolute left-1/2 -translate-x-1/2 text-4xl italic font-semibold top-1/2">Got an error. Search for a valid user.</p>
      ) : (
        <>
          <div className="flex flex-col gap-4 md:flex-row">
            <a href={bodyUser.html_url} target="_blank">
            <img
              className="w-20 md:w-30 border-6 -translate-y-1/3 border-bg rounded-xl "
              src={bodyUser?.avatar_url}
              alt={bodyUser?.login}
            />
            </a>
            <div className="flex md:mt-4  max-w-min max-h-10  text-whitetext font-[500] bg-tabbg rounded-lg justify-between flex-row items-center px-3">
              <p className="py-3">Followers</p>
              <hr className="rotate-90 w-10 text-graytext/75" />
              <p className="py-3">{bodyUser?.followers}</p>
            </div>
            <div className="flex md:mt-4 max-w-min max-h-10   text-whitetext font-[550] bg-tabbg rounded-lg justify-between  flex-row items-center px-3">
              <p className="py-3">Following</p>
              <hr className="rotate-90 w-10 text-graytext/75" />
              <p className="py-3">{bodyUser?.following}</p>
            </div>
            <div className="flex md:mt-4 max-w-min  max-h-10  text-whitetext font-[550] bg-tabbg rounded-lg justify-between  flex-row items-center px-3">
              <p className="py-3">Location</p>
              <hr className="rotate-90 w-10 text-graytext/75" />
              <p className="py-3 max-h-12 min-w-max">{bodyUser?.location || "-"}</p>
            </div>
          </div>
          <h1 className="text-whitetext text-2xl md:text-4xl font-[550] mt-6">
            <a href={bodyUser.html_url} target="_blank">
            {bodyUser?.name || bodyUser?.login}
            </a>
          </h1>
          <p className="text-whitetext text-sm md:text-lg font-[500]">
            {bodyUser?.bio}
          </p>

          <div className="flex mt-7 flex-col gap-5 gap-x-8 md:grid md:grid-cols-2 md:grid-rows-2 w-full">
            {bodyRepo?.length == 0 ? <p className="text-graytext row-span-2 col-span-2 text-lg text-center font-[600]">This user has no repositories</p> : <></>}
            {bodyRepo?.slice(0, 4).map((repo, ix) => (
              <RepoItem
              key={ix}
                name={repo.name}
                desc={repo.description}
                forks={repo.forks_count}
                stars={repo.stargazers_count}
                license={repo.license}
                updated={repo.updated_at}
                url={repo.html_url}
              />
            ))}
          </div>

          {bodyRepo?.length > 4 ? (
            <div className="text-center mt-8 font-semibold">
              <a href={`${bodyUser?.html_url}`} target="_blank" className="text-lg text-whitetext">
                View all Repositories
              </a>
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </main>
  );
};

export default Body;
