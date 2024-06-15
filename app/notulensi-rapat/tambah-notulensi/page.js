"use client";

import { Button, Label } from "@/app/components/Elements";
import { Editor } from "primereact/editor";
import { add, deleted } from "@/app/assets";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Header } from "@/app/components/UI";
import { FileUpload } from "@/app/utils";
import { useFormDataStore } from "@/app/zustand/store";

const AddForm = ({ children, onSubmit }) => {
  return (
    <form
      className="flex flex-wrap mt-7 gap-5 rounded-md  py-3 px-4 border shadow-sm items-center h-[600px] overflow-y-scroll w-full"
      onSubmit={onSubmit}
    >
      <h2 className="font-semibold text-base text-center">
        Data Notulensi Rapat
      </h2>
      {children}
    </form>
  );
};
const SpanTitle = ({ title }) => {
  return <span className="text-base font-semibold ">{title}</span>;
};

// main components
const AddNotulency = () => {
  const router = useRouter();
  const data = useFormDataStore((state) => state.data);
  const addData = useFormDataStore((state) => state.addData);
  const [formData, setFormData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newNotulen, setNewNotulen] = useState([]);
  const [text, setText] = useState("");
  const [pict, setPict] = useState({});

  const handleAddDataNotulen = (e) => {
    e.preventDefault();
    let datas = [];
    setIsLoading(true);

    if (e.target.anggota.value) {
      datas.push(e.target.anggota.value);
    }

    [e.target.anggota_baru].filter((data) => {
      datas.push(data?.value);
      if (data?.length >= 2) {
        data.forEach((item) => datas.push(item.value));
      }
    });

    let remover = "";
    if (datas.includes(remover)) {
      let index = datas.indexOf(remover);
      datas.splice(index, 1);
    }

    const dataNotulen = {
      no: data.length == 0 ? 1 : data[data.length - 1].no + 1,
      waktu: e.target.waktu.value,
      lokasi: e.target.lokasi.value,
      divisi: e.target.divisi.value,
      gambar: pict,
      pembahasan: e.target.pembahasan.value,
      tindak_lanjut: text,
      link: e.target.link.value,
      pimpinan: e.target.pimpinan_notulen.value,
      notulen: e.target.notulen.value,
      anggota: datas,
    };

    setFormData([...formData, dataNotulen]);
    addData(dataNotulen);
    setTimeout(() => {
      router.push("/notulensi-rapat");
      setIsLoading(false);
    }, 800);

    e.target.reset();
  };

  useEffect(() => {
    localStorage.setItem("tambah-data", JSON.stringify(data));
  }, [data]);

  const handleAddPerson = () => {
    setNewNotulen([
      ...newNotulen,
      {
        id:
          newNotulen.length == 0 ? 1 : newNotulen[newNotulen.length - 1].id + 1,
      },
    ]);
  };

  const handleDeletePerson = (id) => {
    setNewNotulen(newNotulen.filter((deletePerson) => deletePerson.id !== id));
  };

  return (
    <section className="lg:w-4/5 lg:ml-[250px] mt-24 text-black py-5 px-10 flex flex-col  items-center  justify-center">
      <Header path="Tambah Data" />
      <AddForm onSubmit={handleAddDataNotulen}>
        <Label htmlFor="waktu" className="label">
          <SpanTitle title="Waktu" />
          <input
            type="date"
            id="waktu"
            name="waktu"
            className="p-2 border rounded w-[40%]"
          />
        </Label>

        <Label htmlFor="lokasi" className="label">
          <SpanTitle title="Lokasi" />
          <input
            type="text"
            id="lokasi"
            name="lokasi"
            className="p-2 border rounded w-[40%]"
          />
        </Label>

        <Label htmlFor="divisi" className="label">
          <SpanTitle title="Unit/Divisi" />
          <input
            type="text"
            id="divisi"
            name="divisi"
            className="p-2 border rounded w-[40%]"
          />
        </Label>

        <Label htmlFor="pembahasan" className="label">
          <SpanTitle title="Pembahasan Masalah" />
          <input
            type="text"
            id="pembahasan"
            name="pembahasan"
            className="p-2 border rounded w-[40%]"
          />
        </Label>

        {/* editor */}
        <Label htmlFor="tindak_lanjut" className="label">
          <SpanTitle title="Tindak Lanjut" />
          <Editor
            className="w-[55%]"
            onTextChange={(e) => setText(e.htmlValue)}
            style={{ height: "220px" }}
          />
        </Label>

        {/* url */}
        <Label htmlFor="link" className="label">
          <SpanTitle title="Link/URL" />
          <input
            type="url"
            id="link"
            name="link"
            className="p-2 border rounded w-[40%]"
          />
        </Label>

        {/* pimpinan notulen */}
        <Label htmlFor="pimpinan-notulen" className="label">
          <SpanTitle title="Pimpinan Notulen" />
          <input
            type="text"
            id="pimpinan-notulen"
            name="pimpinan_notulen"
            className="p-2 border rounded w-[40%]"
          />
        </Label>

        {/* notulen */}
        <Label htmlFor="notulen" className="label">
          <SpanTitle title="Notulen" />
          <input
            type="text"
            id="notulen"
            name="notulen"
            className="p-2 border rounded w-[40%]"
          />
        </Label>

        {/* upload gambar */}
        <Label htmlFor="upload-gambar" className="label">
          <SpanTitle title="Masukan Gambar" />
          <FileUpload setPict={setPict} />
        </Label>

        {/* anggota */}
        <Label htmlFor="anggota" className="label">
          <SpanTitle title="Anggota Rapat" />

          <div className="flex gap-2 w-full justify-center items-center ">
            <input
              type="text"
              id="anggota"
              name="anggota"
              className="p-2 border rounded w-[40%]"
            />
            <Button variant="primary" onClick={handleAddPerson}>
              <Image src={add} width={20} height={20} alt="add" />
            </Button>
          </div>

          {newNotulen.map((nameNotulen) => (
            <div
              className="flex w-full justify-center items-center gap-2"
              key={nameNotulen.id}
            >
              <input
                type="text"
                id="anggota_baru"
                name={`anggota_baru_${nameNotulen.id}`}
                className="p-2 border rounded w-[40%]"
              />
              <Button
                variant="delete"
                onClick={() => handleDeletePerson(nameNotulen.id)}
              >
                <Image src={deleted} width={20} height={20} alt="add" />
              </Button>
            </div>
          ))}
        </Label>

        <div className="w-full flex justify-center items-center">
          <Button
            variant="primary"
            width="40%"
            type="submit"
            opacity={isLoading}
          >
            {isLoading ? "Loading..." : "Simpan"}
          </Button>
        </div>
      </AddForm>
    </section>
  );
};

export default AddNotulency;
