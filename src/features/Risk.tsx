import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import RiskList from "@/components/shared/risklist";
import RiskDetailModal from "@/components/shared/riskdetailmodal";
import LoadingModal from "@/components/ui/loadingmodal";
import fetchRisks from "@/lib/fetchRisks";
import fetchRiskDetail from "@/lib/fetchRiskDetail";

interface RiskDetail {
  risk: string;
  cause: string;
  causeSource: string;
  impact: string;
  impacted: string;
  impactScore: number;
  probabilityScore: number;
}

export default function Risk() {
  const [riskDetail, setRiskDetail] = useState<RiskDetail | null>(null);
  const [risks, setRisks] = useState<string[]>([]);
  const riskFetching = useMutation({
    mutationFn: fetchRisks,
    onSuccess: (data) => {
      setRisks(data?.risks);
    },
  });
  const riskDetailFetcing = useMutation({
    mutationFn: fetchRiskDetail,
    onSuccess: (data) => {
      setRiskDetail(data);
      sessionStorage.setItem(data.risk, JSON.stringify(data));
    },
  });

  const perangkatDaerah = sessionStorage.getItem("perangkatDaerah") as string;
  const program = sessionStorage.getItem("program") as string;
  const indikator = sessionStorage.getItem("indikator") as string;
  const bussinessProcess = sessionStorage.getItem("businessProcess") as string;

  useEffect(() => {
    riskFetching.mutate({ perangkatDaerah, program, bussinessProcess });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleRiskClick(risk: string) {
    const riskDetail = JSON.parse(sessionStorage.getItem(risk) as string);
    if (!riskDetail) {
      riskDetailFetcing.mutate({
        risiko: risk,
        perangkatDaerah,
        program,
      });
    } else {
      setRiskDetail(riskDetail);
    }
  }

  function handleCloseModal() {
    setRiskDetail(null);
  }

  return (
    <>
      <div className="grid gap-1 mb-5">
        <p className="font-bold">Perangkat Daerah</p>
        <p>{perangkatDaerah}</p>
      </div>
      <div className="grid gap-1 mb-10">
        <p className="font-bold">Program & Indikator</p>
        <p>{program}</p>
        <p>{indikator}</p>
      </div>
      {(riskFetching.isPending || riskDetailFetcing.isPending) && (
        <LoadingModal />
      )}
      {riskFetching.isSuccess && (
        <div className="grid gap-1 mb-3">
          <p className="font-bold mb-3">Daftar Risiko</p>
          <RiskList data={risks} onClick={handleRiskClick} />
        </div>
      )}
      {riskDetail && (
        <RiskDetailModal riskDetail={riskDetail} onClick={handleCloseModal} />
      )}
    </>
  );
}
