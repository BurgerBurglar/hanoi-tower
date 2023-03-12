function App() {
  return (
    <>
      <div className="max-w-[50rem] mx-auto px-4 py-2">
        <h1 className="text-3xl text-center">河内塔</h1>
        <div className="flex justify-around mt-10 mx-auto">
          <button className="hover:bg-slate-50 active:bg-slate-100 flex flex-col items-center justify-end h-[100px] relative">
            <div className="w-[3px] h-full absolute top-0 left-[50%] bg-slate-900" />
            <div className="bg-pink-600 w-[40px] h-5 bottom-10 border-pink-900 border z-10" />
            <div className="bg-pink-600 w-[60px] h-5 bottom-5 border-pink-900 border z-10" />
            <div className="bg-pink-600 w-[80px] h-5 bottom-0 border-pink-900 border z-10" />
          </button>
          <button className="hover:bg-slate-50 active:bg-slate-100 basis-[100px] relative">
            <div className="w-[3px] h-full absolute top-0 left-[50%] bg-slate-900" />
          </button>
          <button className="hover:bg-slate-50 active:bg-slate-100 basis-[100px] relative">
            <div className="w-[3px] h-full absolute top-0 left-[50%] bg-slate-900" />
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
