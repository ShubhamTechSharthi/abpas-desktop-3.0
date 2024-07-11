export default function Home({ back }) {
  return (
    <div className="mt-20 ml-20 h-2/3 w-2/3 bg-slate-300 rounded-md">
      <div className="flex justify-between bg-slate-300 rounded-t-md ml-2 mr-3">
        <div>
          <button
            onClick={() => setTitlePageOpen(true)}
            className={`${titlePageOpen ? "pt-1 bg-slate-50" : "pt-0"}  active:bg-slate-400 rounded-t-md duration-400 px-2 pb-1`}
          >
            project title
          </button>
          <button
            onClick={() => setTitlePageOpen(false)}
            className={`${!titlePageOpen ? "pt-1 bg-slate-50" : "pt-0"} bg-slate-300 active:bg-slate-400 rounded-t-md duration-400 px-2 pb-1`}
          >
            project description
          </button>
          <button onClick={() => handleOpenModal()}>open modal</button>
        </div>
        <button onClick={back}>❌</button>
      </div>
    </div>
  );
}
