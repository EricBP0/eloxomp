import { useState } from "react";
import { toMoney } from "../../util/Util.tsx"; // ajuste para seu caminho

interface Props {
    onNext: () => void;
    onBack: () => void;
}

export default function StepResumo({ onNext, onBack }: Props) {
    const basePrice = 100;
    const selectedExtras = [
        { id: 1, label: "Taxa MMR Nerfado", value: 25 },
        { id: 5, label: "Horários Restritos", value: 10 },
    ];

    const [observacao, setObservacao] = useState("");
    const [cupom, setCupom] = useState("");
    const [termosAceitos, setTermosAceitos] = useState(false);

    const extrasPercentual = selectedExtras.reduce((acc, curr) => acc + curr.value, 0);
    const total = basePrice + (basePrice * extrasPercentual) / 100;

    const handleNext = () => {
        if (!termosAceitos) {
            alert("Você precisa aceitar os termos de contrato.");
            return;
        }
        onNext();
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-purple-700 text-center mb-6">Resumo do Pedido</h2>

            {/* TABELA */}
            <div className="overflow-x-auto mb-8">
                <table className="w-full text-left border">
                    <thead>
                    <tr className="bg-purple-100 text-purple-800">
                        <th className="p-3 border">Serviço / Produto</th>
                        <th className="p-3 border">Valor</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="p-3 border">Serviço ELO_BOOST</td>
                        <td className="p-3 border">R$ {toMoney(basePrice)}</td>
                    </tr>
                    <tr>
                        <td className="p-3 border">Extras</td>
                        <td className="p-3 border">R$ {toMoney((basePrice * extrasPercentual) / 100)}</td>
                    </tr>
                    <tr className="font-bold">
                        <td className="p-3 border">Subtotal</td>
                        <td className="p-3 border text-purple-700">R$ {toMoney(total)}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            {/* OBSERVAÇÃO */}
            <div className="mb-6">
                <label className="font-semibold text-gray-700">📝 Observação:</label>
                <textarea
                    className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:outline-none"
                    rows={4}
                    placeholder="Insira aqui dias e horários, preferências de booster (DUO BOOST), etc..."
                    value={observacao}
                    onChange={(e) => setObservacao(e.target.value)}
                />
            </div>

            {/* CONTRATO E CUPOM */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            checked={termosAceitos}
                            onChange={() => setTermosAceitos(!termosAceitos)}
                        />
                        Li e aceito todos os{" "}
                        <a href="/termos" target="_blank" className="text-purple-700 hover:underline">
                            Termos de Contrato
                        </a>
                    </label>
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="CUPOM DE DESCONTO"
                        value={cupom}
                        onChange={(e) => setCupom(e.target.value)}
                        className="flex-1 px-3 py-2 border rounded-xl"
                    />
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
                        OK
                    </button>
                </div>
            </div>

            {/* AÇÕES */}
            <div className="flex justify-between mt-8">
                <button
                    className="px-6 py-2 rounded-xl bg-gray-300 text-gray-700 hover:bg-gray-400"
                    onClick={onBack}
                >
                    Voltar
                </button>
                <button
                    className="px-6 py-2 rounded-xl bg-purple-700 text-white hover:bg-purple-800"
                    onClick={handleNext}
                >
                    Continuar
                </button>
            </div>
        </div>
    );
}
