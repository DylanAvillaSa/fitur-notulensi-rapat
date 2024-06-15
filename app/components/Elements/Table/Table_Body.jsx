import Button from "../Button";
import Image from "next/image";
import { edit, deleted } from "@/app/assets";
import parse from "html-react-parser";
import { useFormDataStore } from "@/app/zustand/store";

const TableBody = ({ handleDelete, handleEdit, paginatedData }) => {
  const data = useFormDataStore((state) => state.data);
  return (
    <tbody className="relative">
      {data.length > 0 ? (
        paginatedData().map((data) => (
          <tr key={data?.no} className="border-b">
            <td className="pt-2 border-b-2 pb-4 w-28 text-sm text-center">
              {data.no}
            </td>
            <td className="pt-2 border-b-2 pb-4 w-28 text-sm text-center">
              {data.waktu}
            </td>
            <td className="pt-2 border-b-2 pb-4 w-28 text-sm text-center">
              {data.lokasi}
            </td>
            <td className="pt-2 border-b-2 pb-4 w-28 text-sm text-center">
              {data.divisi}
            </td>
            <td className="pt-2 border-b-2 pb-4 w-28 text-sm text-center">
              {data.pembahasan}
            </td>
            <td className="pt-2 border-b-2 pb-4 w-32 text-sm text-center">
              {parse(data.tindak_lanjut || "")}
            </td>
            <td className="pt-2 border-b-2 pb-4 w-28 text-sm text-center">
              1 Juni 2024
            </td>
            <td className="pt-2 border-b-2 pb-4 w-32 text-sm text-center">
              {data.anggota?.map((anggota) => (
                <p key={anggota != undefined && anggota}>
                  {anggota != undefined && anggota}
                </p>
              ))}
            </td>
            <td className="pt-2 border-b-2 pb-4 w-32 text-sm text-center">
              <p>Pimpinan : {data.pimpinan}</p>
              <p>Notulen : {data.notulen}</p>
            </td>
            <td className="pt-2 border-b-2 pb-4 w-32 text-sm text-center">
              <div className="flex justify-center items-center gap-1">
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
          <td className="font-semibold opacity-50 p-2">Data Belum Ditemukan!</td>
        </tr>
      )}
    </tbody>
  );
};

export default TableBody;
