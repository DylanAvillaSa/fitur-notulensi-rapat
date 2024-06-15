'use client'

import Button from "../Button";
import Image from "next/image";
import { edit, deleted } from "@/app/assets";
import parse from "html-react-parser";
import { useFormDataStore } from "@/app/zustand/store";
import { useEffect, useState } from "react";

const TableBody = ({ handleDelete, handleEdit, paginatedData }) => {
  const data = useFormDataStore((state) => state.data);

  const statusJadwal = (deadline) => {
      const nowDay = new Date()
    
      const splitArr =nowDay.toLocaleDateString().split('/').reverse().join('-')
      const time = splitArr.split('-')
      const [year, month, day] = time

      return year + '-' + (day < 10 ? '0' + day : day) +'-' + month


      
  }

  return (
    <tbody className="relative">
      {data.length > 0 ? (
        paginatedData().map((data) => (
          <tr key={data?.no} className="border-b">
            <td className="pt-2 border-b-2 pb-3 w-24 text-sm text-center">
              {data.no}
            </td>
            <td className="pt-2 border-b-2 pb-3 w-24 text-sm text-center">
              {data.waktu}
            </td>
            <td className="pt-2 border-b-2 pb-3 w-24 text-sm text-center">
              {data.deadline}
            </td>
            <td className="pt-2 border-b-2 pb-3 w-24 text-sm text-center">
              {statusJadwal(data.deadline) === 'orange' && (
                <p className="bg-orange-400 w-24 py-1 rounded-sm text-white">
                  On Process
                </p>
              )}

              {
              statusJadwal(data.deadline) < data.deadline && <p className="bg-slate-50 text-slate-700 w-24 py-2 rounded-md">On Process</p>
              }
              {
              statusJadwal(data.deadline) == data.deadline && <p className="bg-orange-400 text-slate-100 w-24 py-2 rounded-md">On Process</p>
              }
              {
              statusJadwal(data.deadline) > data.deadline && <p className="bg-rose-400 text-slate-100 w-24 py-2 rounded-md">On Overdue</p>
              }

            </td>
            <td className="pt-2 border-b-2 pb-3 w-24 text-sm text-center">
              {data.pembahasan}
            </td>
            <td className="pt-2 border-b-2 pb-3 w-24 text-sm text-center">
              {data.lokasi}
            </td>

            <td className="pt-2 border-b-2 pb-3 w-24 text-sm text-center">
              {data.divisi}
            </td>
            <td className="pt-2 border-b-2 pb-3 w-24 text-sm text-center">
              {parse(data.tindak_lanjut || "")}
            </td>
            <td className="pt-2 border-b-2 pb-3 w-24 text-sm text-center">
              {data.anggota?.map((anggota) => (
                <p key={anggota != undefined && anggota}>
                  {anggota != undefined && anggota}
                </p>
              ))}
            </td>
            <td className="pt-2 border-b-2 pb-3 w-24 text-sm text-center">
              <p>Pimpinan : {data.pimpinan}</p>
              <p>Notulen : {data.notulen}</p>
            </td>

            <td className="pt-2 border-b-2 pb-3 w-24 text-sm text-center">
              <div className="flex justify-center items-center ">
                {/* edit */}
                <Button variant="edit" onClick={() => handleEdit(data)}>
                  <Image src={edit} width={20} height={20} alt="edit" />
                </Button>

                {/* delete */}
                <Button variant="delete" onClick={() => handleDelete(data)}>
                  <Image src={deleted} width={20} height={20} alt="show" />
                </Button>
              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td className="font-semibold opacity-50 p-2 w-28">
            Data Belum Ditemukan!
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default TableBody;
