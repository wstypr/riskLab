import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import fetchBussinessProcess from "@/lib/fetchBussinessProcess";
import LoadingSpinner from "@/components/ui/loadingspinner";

export default function Organization() {
  const [bussinessProcess, setBussinessProcess] = useState("");
  const Navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: fetchBussinessProcess,
    onSuccess: (data) => {
      setBussinessProcess(data?.bussinessProcess);
    },
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const perangkatDaerah = e.currentTarget.perangkatDaerah.value;
    const program = e.currentTarget.program.value;
    const indikator = e.currentTarget.indikator.value;
    const kegiatan = e.currentTarget.kegiatan.value;

    sessionStorage.setItem("perangkatDaerah", perangkatDaerah);
    sessionStorage.setItem("program", program);
    sessionStorage.setItem("indikator", indikator);

    mutate({ perangkatDaerah, program, indikator, kegiatan });
  }

  function handleRiskIdentification() {
    sessionStorage.setItem("bussinessProcess", bussinessProcess);
    Navigate("/risk");
  }

  function handleChangeBussinessProcess(e: FormEvent<HTMLTextAreaElement>) {
    setBussinessProcess(e.currentTarget.value);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          className="mb-4"
          placeholder="Perangkat Daerah"
          name="perangkatDaerah"
          required
        />
        <Input className="mb-4" placeholder="Program" name="program" />
        <Input
          className="mb-4"
          placeholder="Indikator Program"
          name="indikator"
          required
        />
        <Textarea
          className="mb-6"
          placeholder="Kegiatan"
          rows={8}
          name="kegiatan"
          required
        ></Textarea>
        <Button
          variant="secondary"
          className="w-full bg-slate-300"
          type="submit"
          disabled={isPending}
        >
          Analisa Proses Bisnis
        </Button>
      </form>
      {isPending && (
        <div className="mt-6">
          <LoadingSpinner />
        </div>
      )}
      {bussinessProcess && (
        <div className="mt-6">
          <div className="flex justify-between align-middle">
            <h3 className="text-lg font-bold">Proses Bisnis</h3>
            <Button
              variant="secondary"
              className="bg-slate-300"
              onClick={handleRiskIdentification}
              disabled={isPending}
            >
              Identifikasi Risiko
            </Button>
          </div>
          <Textarea
            className="mt-2"
            rows={50}
            value={bussinessProcess}
            onChange={handleChangeBussinessProcess}
          ></Textarea>
        </div>
      )}
    </>
  );
}
