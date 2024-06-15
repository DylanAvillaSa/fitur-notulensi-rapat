"use client";

import { useFormDataStore } from "@/app/zustand/store";
import {
  showBlack,
  editBlack,
  add,
  deleted,
  close,
  linkImg,
  printImg,
} from "@/app/assets";
import { useEffect, useState, useRef, Fragment } from "react";
import { Editor } from "primereact/editor";
import { FileUpload } from "@/app/utils";
import { Header } from "@/app/components/UI";
import { Button } from "@/app/components/Elements";
import Image from "next/image";
import ReactToPrint, { useReactToPrint } from "react-to-print";

const TableNotulency = ({
  dataRiwayat,
  hystory,
  showData,
  setShowData,
  setIsShowData,
  updateDataNotulen,
}) => {
  const lastIndex = dataRiwayat.length - 1;

  const handleEditData = (id) => {
    hystory.map((data) => {
      if (data.no === id) {
        setIsShowData(false);
      }
    });
  };
  const handleShowData = (id) => {
    hystory.map((data) => {
      if (data.no === id) {
        setShowData(data);
        setIsShowData(true);
      }
    });
  };

  useEffect(() => {
    updateDataNotulen(showData);
  }, [showData]);
  return (
    <table className="w-full  mt-6">
      <thead className="bg-slate-50">
        <tr>
          <th className="w-24 p-3 text-slate-700">No</th>
          <th className="w-24 p-3 text-slate-700">Waktu Update</th>
          <th className="w-24 p-3 text-slate-700">Lokasi</th>
          <th className="w-24 p-3 text-slate-700">Unit/Divisi</th>
          <th className="w-24 p-3 text-slate-700">Pembahasan Masalah</th>
          <th className="w-24 p-3 text-slate-700">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {console.info(hystory)}
        {dataRiwayat &&
          hystory.map((data, i) => (
            <tr className="border-b-2 pb-2" key={i}>
              <td className="w-24 p-3 text-center text-slate-600">
                {i === 0 ? 1 : i + 1}
              </td>
              <td className="w-24 p-3 text-center text-slate-600">
                {data.waktu} / 10:00
              </td>
              <td className="w-24 p-3 text-center text-slate-600">
                {data.lokasi}
              </td>
              <td className="w-24 p-3 text-center text-slate-600">
                {data.divisi}
              </td>
              <td className="w-24 p-3 text-center text-slate-600">
                {data.pembahasan}
              </td>
              <td className="w-24 p-3 flex items-center justify-center mx-auto">
                {hystory[lastIndex] == data ? (
                  <Image
                    src={editBlack}
                    width={35}
                    height={35}
                    alt="show"
                    className="cursor-pointer"
                    onClick={() => handleEditData(data.no)}
                  />
                ) : (
                  <Image
                    src={showBlack}
                    width={35}
                    height={35}
                    alt="show"
                    className="cursor-pointer"
                    onClick={() => handleShowData(data.no)}
                  />
                )}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

const TitleNotulency = () => {
  return (
    <h1 className="text-slate-700 w-full text-left text-xl font-bold">
      Riwayat Notulensi Rapat
    </h1>
  );
};

// menampilkan gambar

const TablePrint = ({ printedRef, dataRiwayat }) => {
  const [data_tindak_lanjut, setDataTindakLanjut] = useState("");
  const lastIndexPrint = dataRiwayat[dataRiwayat.length - 1];
  useEffect(() => {
    setTimeout(() => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(
        lastIndexPrint.tindak_lanjut,
        "text/html"
      );
      const clean_text = doc.body.textContent.trim();

      setDataTindakLanjut(clean_text);
    }, 500);
  }, [dataRiwayat.tindak_lanjut]);

  return (
    <section ref={printedRef} className="w-full hidden print:block">
      <ul className=" flex-col flex px-5 py-3 font-medium">
        <h2>Logo Instansi</h2>
        <li className="flex gap-2 border-b pb-2 pt-4 border-black">
          <span>Pembahasan Masalah : </span>
          <p>{lastIndexPrint.pembahasan}</p>
        </li>
        <li className="flex gap-2 border-b pb-2 pt-4 border-black">
          <span>Unit / Divisi : </span>
          <p>{lastIndexPrint.divisi}</p>
        </li>
        <li className="flex gap-2 border-b pb-2 pt-4 border-black">
          <span>Waktu : </span>
          <p>{lastIndexPrint.waktu}</p>
        </li>
        <li className="flex gap-2 border-b pb-2 pt-4 border-black">
          <span>Tempat : </span>
          <p>{lastIndexPrint.lokasi}</p>
        </li>
      </ul>

      {/* tindak lanjut dan deadline */}
      <section className="flex justify-between px-5 gap-2">
        <div className="border border-black px-4 w-1/2">
          <h2 className="font-medium text-center mt-2">Tindak Lanjut</h2>
          <hr className="h-[2px] bg-slate-800 mb-5 rounded-full mt-2 " />

          {/* data tindak lanjut */}
          <ul className="list-disc flex flex-col px-3 py-3">
            <li>{data_tindak_lanjut}</li>
          </ul>
        </div>

        <div className="border border-black px-4 w-1/2">
          <h2 className="font-medium text-center mt-2">Deadline</h2>
          <hr className="h-[2px] bg-slate-800 mb-5 rounded-full mt-2 " />

          {/* data deadline */}
          <ul className="list-disc flex flex-col px-3 py-3">
            <li>1 Juni 2024</li>
          </ul>
        </div>
      </section>

      <section className="flex flex-col px-5 py-4">
        <p className="flex gap-3 font-medium">
          Pimpinan Rapat :{" "}
          <span className="font-bold">{lastIndexPrint.pimpinan}</span>
        </p>

        {/* anggota rapat */}
        <ul className="flex flex-col list-disc  py-3">
          <h2 className="font-semibold mb-3">Anggota Rapat</h2>
          {lastIndexPrint.anggota.map((anggota, i) => (
            <Fragment key={i}>
              <li key={anggota} className="font-medium ml-5">
                {anggota}
              </li>
            </Fragment>
          ))}
        </ul>
      </section>

      {/* tanda tangan */}
      <section className="flex justify-around">
        <div className="flex flex-col gap-3 items-center">
          <p>Notulis</p>
          <span>(..........................)</span>
        </div>

        <div className="flex flex-col gap-3 items-center">
          <p>Pimpinan Rapat</p>
          <span>(..........................)</span>
        </div>
      </section>
    </section>
  );
};

// inti komponen
const UpdateNotulency = ({ params }) => {
  const { slug: id } = params;
  const printRef = useRef(null);
  const editorQ = useRef(null);
  const [isZoom, setIsZoom] = useState(false);
  const [dataForPrint, setDataForPrint] = useState(null);
  const [showData, setShowData] = useState({});
  const [isShowData, setIsShowData] = useState(false);
  const dataRiwayat = useFormDataStore((state) => state.history);
  const editDataRiwayat = useFormDataStore((state) => state.dataHistory);
  const dataNotulen = useFormDataStore((state) => state.data);
  const updateDataNotulen = useFormDataStore((state) => state.editData);
  const [history_data, setHistory] = useState([]);
  const [formEdit, setFormEdit] = useState({
    waktu: "",
    lokasi: "",
    divisi: "",
    pembahasan: "",
    link: "",
    anggota: "",
    gambar: "",
  });
  const [newNotulen, setNewNotulen] = useState([]);
  const [images, setImages] = useState("");
  const [pict, setPict] = useState({});
  const [text, setText] = useState("");

  useEffect(() => {
    dataNotulen.map((specific_data) => {
      if (specific_data.no == id) {
        const reader = new FileReader();
        const file = specific_data.gambar[0];
        if (file instanceof Blob) {
          reader.readAsDataURL(file);
          reader.onload = (e) => {
            setImages(e.target.result);
          };
        }

        setHistory([...history_data, specific_data]);
        setFormEdit(specific_data);

        setTimeout(() => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(
            specific_data.tindak_lanjut,
            "text/html"
          );
          const clean_text = doc.body.textContent.trim();

          setText(...text, clean_text);
        }, 500);
      }
    });
  }, [id]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormEdit((prev) => ({ ...prev, [name]: value, gambar: pict }));
  };

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    const datas = [];

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

    const newData = {
      ...formEdit,
      gambar: pict,
      tindak_lanjut: text,
      anggota: [formEdit.anggota, ...datas],
    };

    setDataForPrint(newData);
    updateDataNotulen(newData);
    editDataRiwayat(newData);

    setHistory([
      ...history_data,
      {
        ...formEdit,
        no:
          history_data.length === 0
            ? 1
            : history_data[history_data.length - 1].no + 1,
      },
    ]);

    alert("data berhasil disimpan");
    e.target.reset();
  };

  useEffect(() => {
    localStorage.setItem("data-history", JSON.stringify(dataRiwayat));
  }, [dataRiwayat]);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <section className="xl:container lg:w-4/5   lg:ml-[240px] mt-24 text-black py-5 px-10 flex flex-col  items-center  justify-center">
      <Header path="Update Data" />

      <div className="xl:w-full flex flex-col  items-center rounded-lg py-5 px-3">
        <TitleNotulency />
        <TableNotulency
          hystory={history_data}
          printRef={printRef}
          showData={showData}
          updateDataNotulen={updateDataNotulen}
          dataRiwayat={dataRiwayat}
          setShowData={setShowData}
          setIsShowData={setIsShowData}
        />

        {dataRiwayat[dataRiwayat.length - 1] ? (
          <TablePrint
            printedRef={printRef}
            showData={showData}
            dataRiwayat={dataRiwayat}
            dataForPrint={dataForPrint}
          />
        ) : (
          <div></div>
        )}
      </div>

      <div className="w-full flex flex-col  items-center mt-5">
        <div className="w-full flex justify-between">
          <h2 className="text-xl text-left w-full font-bold text-slate-700 px-5">
            Data Notulensi Rapat
          </h2>

          {/* print */}
          {!dataRiwayat ? (
            <div></div>
          ) : (
            <button
              type="button"
              className="bg-light-purple p-2 text-slate-50 rounded px-5"
              onClick={handlePrint}
            >
              <Image src={printImg} width={20} height={20} alt="print" />
            </button>
          )}
        </div>

        <form
          className="mt-7 w-full flex justify-between gap-5 flex-col h-[37.5rem] px-7 rounded-lg shadow-lg py-7 overflow-y-scroll  items-center"
          onSubmit={handleSubmitUpdate}
        >
          <label className="w-3/5">
            <p className="text-slate-700 font-semibold">Waktu</p>
            <input
              type="date"
              name="waktu"
              value={isShowData ? showData.waktu : formEdit.waktu}
              className="border p-2 rounded-md w-full mt-2 text-slate-700 font-medium"
              onChange={handleChange}
              disabled={isShowData}
            />
          </label>

          {/* lokasi */}
          <label className="w-3/5">
            <p className="text-slate-700 font-semibold">Lokasi</p>
            <input
              type="text"
              name="lokasi"
              value={isShowData ? showData.lokasi : formEdit.lokasi}
              className="border p-2 rounded-md w-full mt-2 text-slate-700 font-medium"
              onChange={handleChange}
              disabled={isShowData}
            />
          </label>

          {/* unit divisi */}
          <label className="w-3/5">
            <p className="text-slate-700 font-semibold">Unit / Divisi</p>
            <input
              type="text"
              name="divisi"
              value={isShowData ? showData.divisi : formEdit.divisi}
              className="border p-2 rounded-md w-full mt-2 text-slate-700 font-medium"
              onChange={handleChange}
              disabled
            />
          </label>

          {/* pembahasan masalah */}
          <label className="w-3/5">
            <p className="text-slate-700 font-semibold">Pembahasan Masalah</p>
            <input
              type="text"
              name="pembahasan"
              value={isShowData ? showData.pembahasan : formEdit.pembahasan}
              className="border p-2 rounded-md w-full mt-2 text-slate-700 font-medium"
              onChange={handleChange}
              disabled
            />
          </label>

          {/* editor */}
          <label className="w-3/5">
            <p className="text-slate-700 font-semibold">Tindak Lanjut</p>
            <Editor
              ref={editorQ}
              value={text}
              onTextChange={(e) => setText(e.htmlValue)}
              style={{ height: "200px" }}
              className="mt-2"
              disabled={isShowData}
            />
          </label>

          {/* link / url */}
          <label className="w-3/5 relative">
            <p className="text-slate-700 font-semibold">Link / URL</p>
            <input
              type="url"
              name="link"
              value={isShowData ? showData.link : formEdit.link}
              className="border p-2 rounded-md w-full mt-2 text-slate-700 font-medium"
              onChange={handleChange}
              disabled={isShowData}
            />
            <Image
              src={linkImg}
              width={20}
              height={20}
              className="absolute right-3 top-10 cursor-pointer"
              onClick={() => window.open(`${formEdit.link}`, "blank")}
            />
          </label>

          {/* tampilan gambar */}
          <div className={`flex w-3/5 justify-between`}>
            {images && (
              <Image
                alt="gambar"
                src={images}
                width={220}
                style={{ borderRadius: "10px", cursor: "pointer" }}
                height={350}
                className={`${
                  isZoom
                    ? "scale-150 transition-all duration-500 ease-in-out absolute bottom-8 w-[700px] h-[500px] object-cover left-1/2 -translate-x-1/2 rounded-lg"
                    : "transition-all duration-700 ease-out rounded-lg"
                }`}
                onClick={() => setIsZoom(!isZoom)}
              />
            )}
          </div>

          <label className="w-3/5">
            <FileUpload setPict={setPict} width="full" />
          </label>

          {/* anggota rapat */}
          <label className="w-3/5">
            <div className="flex gap-2 w-full justify-center items-center ">
              <input
                type="text"
                id="anggota"
                name="anggota"
                value={isShowData ? showData.anggota : formEdit.anggota}
                onChange={handleChange}
                className="p-2 border rounded w-full"
                disabled={isShowData}
              />
              <Button variant="primary" onClick={handleAddPerson}>
                <Image src={add} width={20} height={20} alt="add" />
              </Button>
            </div>

            {newNotulen.map((InputNotulen) => (
              <div
                className="flex w-full justify-center items-center gap-2 mt-3"
                key={InputNotulen.id}
              >
                <input
                  type="text"
                  id="anggota_baru"
                  name={`anggota_baru_${InputNotulen.id}`}
                  className="p-2 border rounded w-full"
                  disabled={isShowData}
                />
                <Button
                  variant="delete"
                  onClick={() => handleDeletePerson(InputNotulen.id)}
                >
                  <Image src={deleted} width={20} height={20} alt="add" />
                </Button>
              </div>
            ))}
          </label>

          <Button variant="main-btn" title="edit" type="submit">
            Simpan
          </Button>
        </form>
      </div>
    </section>
  );
};

export default UpdateNotulency;
