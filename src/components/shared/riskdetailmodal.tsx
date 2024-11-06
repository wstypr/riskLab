import { Button } from "../ui/button";

interface RiskDetailModalProps {
  risk: string;
  cause: string;
  causeSource: string;
  impact: string;
  impacted: string;
  impactScore: number;
  probabilityScore: number;
}

export default function RiskDetailModal({riskDetail, onClick}: {riskDetail: RiskDetailModalProps, onClick: () => void}) {
  const {
    risk,
    cause,
    causeSource,
    impact,
    impacted,
    impactScore,
    probabilityScore,
  } = riskDetail;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="relative max-w-lg transforom overflow-hidden rounded-lg bg-white shadow-xl transition-all p-8  ">
          <div className="mb-4">
            <h3 className=" font-medium text-gray-900">Risiko:</h3>
            <p>{risk}</p>
          </div>
          <div className="mb-4">
            <h3 className=" font-medium text-gray-900">Penyebab:</h3>
            <p>{cause}</p>
          </div>
          <div className="mb-4">
            <h3 className=" font-medium text-gray-900">Asal Penyebab:</h3>
            <p>{causeSource}</p>
          </div>
          <div className="mb-4">
            <h3 className=" font-medium text-gray-900">Dampak:</h3>
            <p>{impact}</p>
          </div>
          <div className="mb-4">
            <h3 className=" font-medium text-gray-900">Pihak Terdampak:</h3>
            <p>{impacted}</p>
          </div>
          <div className="mb-4">
            <h3 className=" font-medium text-gray-900">Nilai Dampak:</h3>
            <p>{impactScore}</p>
          </div>
          <div className="mb-8">
            <h3 className=" font-medium text-gray-900">Nilai Kemungkinan:</h3>
            <p>{probabilityScore}</p>
          </div>
          <div className="flex justify-end">
          <Button variant="destructive" onClick={onClick}>
            Tutup
          </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

