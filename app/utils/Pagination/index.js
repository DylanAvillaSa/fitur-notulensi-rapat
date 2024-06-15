
const Pagination = ({data, itemPerPage, currentPage, setCurrentPage}) => {
  const totalPages = Math.ceil(data.length / itemPerPage)

  const handleChangePage = (page) => {
    setCurrentPage(page)
  }

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <span
          key={i}
          className={`cursor-pointer w-[40px] h-[40px] flex mx-1 justify-center items-center
           ${i === currentPage ? 'bg-slate-100 rounded-full text-light-purple' : 'rounded-full hover:bg-slate-100'} `}
          onClick={() => handleChangePage(i)}
        >
          {i}
        </span>
      );
    }
    return pageNumbers;
  };
 

  return (
    <>
      <div className="w-full flex justify-center items-center  mt-3 gap-3">
        <button
          onClick={() => handleChangePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <i
            className="pi pi-angle-double-left cursor-pointer opacity-35 hover:bg-slate-100"
            style={{ fontSize: "20px", position: "relative", top: "3px" }}
          />
        </button>
        <div className="flex">{totalPages == 0 ? 0 : renderPageNumbers()}</div>
        <button
          onClick={() => handleChangePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <i
            className="pi pi-angle-double-right cursor-pointer opacity-35 "
            style={{ fontSize: "20px", position: "relative", top: "3px" }}
          />
        </button>
      </div>
    </>
  );
}

export default Pagination