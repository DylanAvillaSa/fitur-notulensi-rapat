"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageContainer, Wrapper, Header } from "../components/UI";
import { info } from "../assets";
import Image from "next/image";
import "primeicons/primeicons.css";
import {
  Button as ButtonComponent,
  TableLayout,
  TableHead,
  TableBody,
} from "../components/Elements";
import { useFormDataStore } from "../zustand/store";
import { Pagination } from "../utils";





const NotulencyMeeting = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [isDelete, setIsDelete] = useState(false)
  const endpoint = useFormDataStore((state) => state.data);
  const delFunc = useFormDataStore((state) => state.delData);
  const [currentPage, setCurrentPage] = useState(1);
  let itemPerPage = 5;

  const handleEdit = (data) => {
    endpoint.map((specificData) => {
      if (specificData.no == data.no) {
        router.push(`/notulensi-rapat/${data.no}`);
      }
    });
  };


  

  const handleDelete = (formdata) => {
    // setVisible(true);
      delFunc(endpoint.filter((data) => data !== formdata));
       
  };

  

  const paginatedData = () => {
    const startIndex = (currentPage - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    return endpoint.slice(startIndex, endIndex);
  };

  return (
    <PageContainer>
      <Wrapper>
        <Header />

        <section className="xl:w-full lg:w-5/6 w-full  rounded mt-2   px-2 overflow-x-scroll pt-8  overflow-y-hidden relative">
          <div className="flex w-full  justify-between sticky left-[0.1rem] ">
            <h2 className="text-xl font-bold">Data Notulensi Rapat</h2>
            <ButtonComponent
              variant="main-btn"
              onClick={() => router.push(`/notulensi-rapat/tambah-notulensi`)}
            >
              Tambah Notulensi
            </ButtonComponent>
          </div>

          <TableLayout>
            <TableHead />
            <TableBody
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              paginatedData={paginatedData}
            />
          </TableLayout>

          {/* Modal Delete */}
          {/* {visible && (
            <main className="w-full bg-black min-h-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.4)]  z-10 transition-all duration-100">
              <section className="fixed  w-[370px] h-[180px] bg-slate-100 p-3 rounded-md  top-[40%] left-1/2 -translate-x-1/4 flex flex-col justify-evenly">
                <h2 className="font-bold text-xl flex justify-between items-center">
                  {" "}
                  Konfirmasi Hapus Data
                  <span className="text-base font-base cursor-pointer">X</span>
                </h2>
                <div className="flex items-center gap-2 mt-4">
                  <Image src={info} width={16} height={16} alt="info" />
                  Apakah yakin akan menghapus data ini ?
                </div>

                <div className="mt-5 flex gap-4 items-center justify-end">
                  <button className="text-blue-600 font-medium py-2 px-4" onClick={() => setVisible(false)}>No</button>
                  <button className="bg-btn-del text-white px-4 py-2 rounded-md" onClick={handleDelete}>
                    Yes
                  </button>
                </div>
              </section>
            </main>
          )} */}
        </section>

        <Pagination
          data={endpoint}
          itemPerPage={itemPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Wrapper>
    </PageContainer>
  );
};

export default NotulencyMeeting;
