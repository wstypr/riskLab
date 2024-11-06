import { openai } from "./openai";

interface fetchRisksProps {
  perangkatDaerah: string;
  program: string;
  risiko: string;
}

export default async function fetchRiskDetail({
  perangkatDaerah,
  program,
  risiko,
}: fetchRisksProps) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: [
          {
            text: `Anda adalah ahli dalam analisis risiko pemerintah. anda akan diberi nama perangkat daerah, program dan indikator keberhasilannya serta sebuah risiko terkait program tersebut. tugas anda adalah melakukan analisis risiko untuk menentukan penyebab, asal penyebab (eksternal atau internal), dampak, siapa yang terdampak, nilai dampak dan nilai kemungkinan.\nperangkat daerah: ${perangkatDaerah} \nprogram: ${program}\nrisiko:${risiko}`,
            type: "text",
          },
        ],
      },
    ],
    temperature: 1,
    max_tokens: 2048,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "risk_assessment",
        schema: {
          type: "object",
          required: [
            "risk",
            "cause",
            "causeSource",
            "impact",
            "impacted",
            "impactScore",
            "probabilityScore",
          ],
          properties: {
            risk: {
              type: "string",
              description: "Pernyataan risiko",
            },
            cause: {
              type: "string",
              description: "Penyebab risiko",
            },
            impact: {
              type: "string",
              description: "Dampak risiko",
            },
            impacted: {
              type: "string",
              description: "Pihak yang terdampak dengan risiko tersebut",
            },
            causeSource: {
              enum: ["internal", "eksternal"],
              type: "string",
              description: "Sumber risiko (internal/eksternal)",
            },
            impactScore: {
              type: "number",
              description:
                "Nilai dampak (nilai 1-5, 1 = bila tidak berdampak pada tercapainya indikator, 5= apabila sangat berdampak pada tercapainya indikator). CRITICAL:Jangan selalu menjawab 3 atau 4",
            },
            probabilityScore: {
              type: "number",
              description:
                "Nilai kemungkinan terjadinya risiko (nilai 1-5, 1=apabila kemungkinan kecil terjadi, 5=apabila pasti terjadi). CRITICAL:Jangan selalu menjawab 3 atau 4",
            },
          },
          additionalProperties: false,
        },
        strict: true,
      },
    },
  });

  const content = response.choices[0].message?.content;
  return JSON.parse(content as string);
}
