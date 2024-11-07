import { openai } from "./openai";

interface fetchRisksProps {
  perangkatDaerah: string;
  program: string;
  bussinessProcess: string;
}
export default async function fetchRisks({
  perangkatDaerah,
  program,
  bussinessProcess,
}: fetchRisksProps) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: [
          {
            type: "text",
            text: `anda adalah ahli manajemen risiko pemerintahan. anda akan diberikan nama perangkat daerah, nama program dan indikator keberhasilannya dan proses bisnisnya. identifikasi risiko-risiko terkait program tersebut.Lakukan identifikasi risiko meliputi risiko yang disebabkan man, method, machine, medium, money. Lakukan identifikasi juga terhadap risiko fraud.\nperangkat daerah: ${perangkatDaerah}\nprogram: ${program}\nproses bisnis: ${bussinessProcess}\n\nCRITICAL:\npernyataan risiko harus berupa satu kalimat ringkas dan tidak mengandung dampak/akibat dan tidak mengandung sebab.\n\nCRITICAL:\nLakukan identifikasi risiko sebanyak-banyaknya.Minimal 30 risiko.\n\nCRITICAL:\nRespond in Bahasa Indonesia.`,
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
        name: "risk_list",
        schema: {
          type: "object",
          required: ["risks"],
          properties: {
            risks: {
              type: "array",
              items: {
                type: "string",
              },
              description: "A list of risks represented as text strings.",
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
