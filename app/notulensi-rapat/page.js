"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageContainer, Wrapper, Header } from "../components/UI";
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
  const endpoint = useFormDataStore((state) => state.data);
  const delFunc = useFormDataStore((state) => state.delData);
  const [currentPage, setCurrentPage] = useState(1)
  let itemPerPage = 5


  const handleEdit = (data) => {
    router.push(`/notulensi-rapat/${data.no}`);
  };

  const handleDelete = (formdata) => {
    delFunc(endpoint.filter((data) => data !== formdata));
  };

  const paginatedData = () => {
    const startIndex = (currentPage - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    return endpoint.slice(startIndex, endIndex);
  }

  return (
    <PageContainer>
      <Wrapper>
        <Header />
        <section className="w-full mt-10 px-2">
          <div className="flex w-full justify-between">
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
            <TableBody handleDelete={handleDelete} handleEdit={handleEdit} paginatedData={paginatedData}/>
          </TableLayout>

          {/* pagination */}
          <Pagination data={endpoint} itemPerPage={itemPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
          
        </section>
      </Wrapper>
    </PageContainer>
  );
};

export default NotulencyMeeting;
