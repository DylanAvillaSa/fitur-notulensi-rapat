const Wrapper = ({ children }) => {
  return (
    <section className="lg:w-5/6 lg:ml-[250px] mt-24 text-slate-700 py-5 lg:px-10 flex flex-col items-center justify-center">
      {children}
    </section>
  );
};

export default Wrapper;
