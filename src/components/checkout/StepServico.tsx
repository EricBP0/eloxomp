import { useState } from "react";

interface Props {
    onNext: () => void;
    onBack: () => void;
}

const extrasList = [
    { id: 1, label: "Taxa MMR Nerfado", desc: "Caso esteja ganhando menos de 17 pontos", value: 25 },
    { id: 2, label: "Taxa MMR Buffado", desc: "Caindo em filas superiores ao contratado", value: 35 },
    { id: 3, label: "Chat Offline", desc: "Desejo que o serviço seja feito no modo Offline", value: 0 },
    { id: 4, label: "Campeões Específicos", desc: "Definir campeões prioritários", value: 0 },
    { id: 5, label: "Horários Restritos", desc: "Definir horários de execução", value: 10 },
    { id: 6, label: "Posição de Feitiços", desc: "Escolher posição do Flash (D ou F)", value: 0 },
    { id: 7, label: "Stream Online", desc: "Assistir stream da execução", value: 0 },
    { id: 8, label: "Serviço Prioritário", desc: "Executar com prioridade", value: 10 },
    { id: 9, label: "Booster Favorito", desc: "Escolher booster", value: 10 },
    { id: 10, label: "Redução do KD", desc: "Reduzir o KD intencionalmente", value: 30 },
    { id: 11, label: "Reduzir Prazo", desc: "Reduzir o prazo em 30%", value: 20 },
    { id: 12, label: "Super Restrição", desc: "Limitar bastante os campeões", value: 35 },
    { id: 13, label: "Vitória extra", desc: "Uma vitória extra ao fim do serviço", value: 20 },
    { id: 14, label: "Rotas Específicas", desc: "Definir rotas prioritárias", value: 0 },
    { id: 15, label: "Serviço Solo", desc: "Partidas jogadas solo", value: 30 },
];

export default function StepServico({ onNext, onBack }: Props) {
    const [selectedExtras, setSelectedExtras] = useState<number[]>([]);

    const toggleExtra = (id: number) => {
        setSelectedExtras((prev) =>
            prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
        );
    };

    return (
        <div className={"min-h-screen"}>
            <h2 className="text-2xl font-bold text-purple-700 text-center mb-6">
                Personalize seu serviço
            </h2>
            <p className="text-center text-gray-700 mb-10">
                Abaixo você pode selecionar extras para deixar o serviço do seu jeito. Alguns são gratuitos!
            </p>

            {/* EXTRAS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {extrasList.map((extra) => (
                    <label
                        key={extra.id}
                        className="flex items-start gap-3 border border-gray-300 rounded-xl p-4 hover:border-purple-600 transition cursor-pointer"
                    >
                        <input
                            type="checkbox"
                            checked={selectedExtras.includes(extra.id)}
                            onChange={() => toggleExtra(extra.id)}
                            className="mt-1"
                        />
                        <div>
                            <p className="font-semibold text-gray-800">
                                {extra.label}{" "}
                                <span className={extra.value === 0 ? "text-green-600" : "text-blue-600"}>
                  {extra.value === 0 ? "(Grátis)" : `(+ ${extra.value}%)`}
                </span>
                            </p>
                            <p className="text-sm text-gray-600">{extra.desc}</p>
                        </div>
                    </label>
                ))}
            </div>

            {/* AÇÕES */}
            <div className="flex justify-between mt-10">
                <button
                    className="px-6 py-2 rounded-xl bg-gray-300 text-gray-700 hover:bg-gray-400"
                    onClick={onBack}
                >
                    Voltar
                </button>
                <button
                    className="px-6 py-2 rounded-xl bg-purple-700 text-white hover:bg-purple-800"
                    onClick={onNext}
                >
                    Continuar
                </button>
            </div>
        </div>
    );
}
