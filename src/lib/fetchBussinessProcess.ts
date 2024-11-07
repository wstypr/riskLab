import { openai } from "./openai";

export default async function fetchBussinessProcess({
  perangkatDaerah,
  program,
  indikator,
  kegiatan,
}: {
  perangkatDaerah: string;
  program: string;
  indikator: string;
  kegiatan: string;
}) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: [
          {
            text: `anda adalah ahli dalam perencanaan pemerintah. anda akan diberikan nama sebuah organisasi perangkat daerah dan sebuah program beserta indikator keberhasilannya serta kegiatan-kegiatan yang ada dalam program tersebut. identifikasi proses bisnis program tersebut dengan menimbang indikator keberhasilan dan kegiatan-kegiatan yang ada di dalamnya.\nperangkat daerah: ${perangkatDaerah}\nprogram: ${program}\nkegiatan: ${kegiatan}\nindikator program: ${indikator} \n\nCRITICAL: EXPLAIN THE BUSSINESS PROCESS IN DETAIL\n\nCRITICAL:Respond in Bahasa Indonesia.`,
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
        name: "bussiness_process",
        schema: {
          type: "object",
          required: ["bussinessProcess"],
          properties: {
            bussinessProcess: {
              type: "string",
              description: "Text description of the bussiness process.",
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
