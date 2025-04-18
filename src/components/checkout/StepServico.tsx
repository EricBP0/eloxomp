import {useEffect, useState} from "react";
import ChampionSelector from "../extras/ChampionSelector.tsx";
import Swal from "sweetalert2";
import FlashPositionSelector from "../extras/FlashPositionSelector.tsx";
import LaneSelector from "../extras/LaneSelector.tsx";
import TextAreaExtra from "../extras/TextAreaExtra.tsx";

interface Props {
    order: {
        basePrice: number;
        coupon: string;
        currentDivision: {
            id: number;
            subDivision: string;
        }
        currentRank: {
            elo: string;
            hasSubDivisions: boolean;
        }
        desiredRank: {
            elo: string;
            hasSubDivisions: boolean;
        }
        desiredDivision: {
            id: number;
            subDivision: string;
        }
        line: {
            id: number;
            line: string;
        }
        server: {
            id: number;
            percentage: number;
            server: string;
        }
        subtotal: number;
    };
    onNext: () => void;
    onBack: () => void;
}

const extrasList = [
    { id: 1, label: "Taxa MMR Nerfado", desc: "Caso esteja ganhando menos de 17 pontos", value: 25, observation:
            "O prazo de entrega será estendido em 2 dias com esta opção ativada." },
    { id: 2, label: "Taxa MMR Buffado", desc: "Caindo em filas superiores ao contratado", value: 35 },
    { id: 3, label: "Chat Offline", desc: "Desejo que o serviço seja feito no modo Offline", value: 0, observation:
    "Com esta opção, sua conta ficará Offline (PVP.NET Desabilitado) e não será possível receber mensagens da sua lista de amigos. Além disso, ninguém verá que seu usuário está online ou dentro do jogo."},
    { id: 4, label: "Campeões Específicos", desc: "Definir campeões prioritários", value: 0, extras: true },
    { id: 5, label: "Horários Restritos", desc: "Definir horários de execução", value: 10, extras: true, description:
            `<strong>Atenção:</strong> Quanto mais restringir o horário, mais demorado será a conclusão do serviço, 
      sendo assim, o prazo de entrega não irá se aplicar com esta opção ativada.`},
    { id: 6, label: "Posição de Feitiços", desc: "Escolher posição do Flash (D ou F)", value: 0, extras: true },
    { id: 7, label: "Stream Online", desc: "Assistir stream da execução", value: 0, observation:
    "Com esta opção, o jogador irá abrir uma Stream para o cliente acompanhar o serviço em 1ª pessoa (Compartilhamento Ao Vivo - Discord)."},
    { id: 8, label: "★ Serviço Prioritário", desc: "Executar com prioridade", value: 10, observation:
    "Com esta opção selecionada, seu serviço terá prioridade urgencial para ser executado, isto é, iremos fazer com que ele seja imediatamente iniciado."},
    { id: 9, label: "Booster Favorito", desc: "Escolher booster", value: 10, extras: true, description:
            `<strong>Nota:</strong> Se o Booster escolhido estiver realizando outro serviço, este tem prioridade, logo após será iniciado o seu serviço.`},
    { id: 10, label: "Redução do KD", desc: "Reduzir o KD intencionalmente", value: 30, observation:
    "Com esta opção, iremos reduzir propositalmente o KD durante as partidas, quando possível. Pelo fato de nossos jogadores serem High-Elo, KDA's altos são comuns (por exemplo, 15/2/4). Então iremos mascarar o EloBoost, diminuindo esse KDA (por exemplo, 6/3/4). Assim, o serviço torna-se discreto e difícil a identificação de EloBoost, sem levantar suspeitas para seus amigos. (Extra disponível até o Diamante IV)"},
    { id: 11, label: "Reduzir Prazo", desc: "Reduzir o prazo em 30%", value: 20, observation:
    "Com esta opção, iremos reduzir o prazo de entrega do Serviço em 30%, por isso o serviço será executado com mais agilidade. (Extra disponível até o Diamante IV e Válido apenas para compra de 1 ou mais divisões)"},
    { id: 12, label: "Super Restrição", desc: "Limitar bastante os campeões", value: 35, extras: true },
    { id: 13, label: "Vitória extra", desc: "Uma vitória extra ao fim do serviço", value: 20, observation:
    "Com esta opção selecionada, após o Booster alcançar o Elo desejado, ele fará uma Vitória adicional para a Conta não ficar com 0 PDL's. Oferecendo assim, maior segurança para a Conta não correr o risco de Rebaixamento de Elo (\"Drop\"), em caso de sequência de derrotas.(Extra indisponível para Diamante I ou Superior)"},
    { id: 14, label: "Rotas Específicas", desc: "Definir rotas prioritárias", value: 0, extras: true },
    { id: 15, label: "Serviço Solo", desc: "Partidas jogadas solo", value: 30, observation:
    "Com esta opção, nossos jogadores irão jogar Solo durante o Boosting e não Duo com outro Booster. (Extra disponível até o Diamante IV) / Com este Extra ativado, não há possibilidade da Redução no Prazo de Entrega)"},
];

export default function StepServico({ onNext, onBack, order }: Props) {
    const [selectedExtras, setSelectedExtras] = useState<number[]>([]);
    const [selectedChampions, setSelectedChampions] = useState<string[]>([]);
    const [flashPosition, setFlashPosition] = useState<"D" | "F" | null>(null);
    const [primaryLane, setPrimaryLane] = useState<string | null>(null);
    const [secondaryLane, setSecondaryLane] = useState<string | null>(null);
    const [restrictedHours, setRestrictedHours] = useState("");
    const [boosterName, setBoosterName] = useState("");
    const [basePrice, setBasePrice] = useState(100);
    const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercent: number } | null>(null);

    useEffect(() => {
        if (order) {
            setBasePrice(order.basePrice);
            setAppliedCoupon(order.coupon ? {
                code: order.coupon,
                discountPercent: 10
            } : null);
        }
    }, [order]);

    const getSubtotal = () => {
        const extrasTotalPercent = extrasList
            .filter((extra) => selectedExtras.includes(extra.id))
            .reduce((sum, extra) => sum + extra.value, 0);

        let total = basePrice * (1 + extrasTotalPercent / 100);

        if (appliedCoupon) {
            total *= 1 - appliedCoupon.discountPercent / 100;
        }

        return total.toFixed(2).replace(".", ",");
    };


    const toggleExtra = (id: number) => {
        setSelectedExtras((prev) =>
            prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
        );
    };

    return (
        <div className={"min-h-screen"}>
            <div className="border rounded-xl p-6 bg-gray-50 mb-10">
                <h3 className="text-lg font-bold text-purple-700 mb-4">⚙️ Serviço</h3>
                <p className="text-gray-800 mb-4">
                    Este é o serviço que deseja contratar, certifique-se que está corretamente preenchido.
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                    <div>
                        <label className="font-medium text-gray-700">Liga atual</label>
                        <select className="w-full mt-1 p-2 border rounded-lg bg-gray-200" disabled={true}>
                            <option>{order.currentRank.elo}</option>
                        </select>
                    </div>
                    <div>
                        <label className="font-medium text-gray-700">Divisão atual</label>
                        <select className="w-full mt-1 p-2 border rounded-lg bg-gray-200" disabled={true}>
                            <option>{order.currentDivision.subDivision}</option>
                        </select>
                    </div>
                    <div>
                        <label className="font-medium text-gray-700">PDL inicial</label>
                        <input type="number" className="w-full mt-1 p-2 bg-white border rounded-lg" placeholder="0" />
                    </div>
                    <div>
                        <label className="font-medium text-gray-700">Liga desejada</label>
                        <select className="w-full mt-1 p-2 border rounded-lg bg-gray-200" disabled={true}>
                            <option>{order.desiredRank.elo}</option>
                        </select>
                    </div>
                    <div>
                        <label className="font-medium text-gray-700">Divisão desejada</label>
                        <select className="w-full mt-1 p-2 border rounded-lg bg-gray-200" disabled={true}>
                            <option>{order.desiredDivision.subDivision}</option>
                        </select>
                    </div>
                    <div>
                        <label className="font-medium text-gray-700">PDLs ganhos por vitória</label>
                        <input type="number" className="w-full mt-1 p-2 border bg-white rounded-lg" placeholder="0" />
                    </div>
                    <div>
                        <label className="font-medium text-gray-700">Servidor</label>
                        <select className="w-full mt-1 p-2 border rounded-lg bg-gray-200" disabled={true}>
                            <option>{order.server.server}</option>
                        </select>
                    </div>
                    <div>
                        <label className="font-medium text-gray-700">Fila desejada</label>
                        <select className="w-full mt-1 p-2 border rounded-lg bg-gray-200" disabled={true}>
                            <option>{order.line.line}</option>
                        </select>
                    </div>
                </div>

                <div className="mt-4 bg-gray-200 text-gray-700 p-3 rounded-xl">
                    <strong>Prazo de entrega:</strong> 1 dia por divisão contratada + 1 dia
                </div>
            </div>

            <div className="border rounded-xl p-6 bg-gray-50 mb-10">
                <h3 className="text-lg font-bold text-purple-700 mb-4">🔐 Dados da Conta</h3>

                <p className="text-sm text-gray-600 mb-4">
                    Estes são os dados referentes ao acesso da sua conta no League of Legends.
                    <br /><br />
                    <strong className="text-red-500">Recomendamos que altere sua senha para uma senha temporária antes de iniciar o serviço</strong>,
                    e após a conclusão, altere novamente para manter sua segurança.
                    <br /><br />
                    Nenhum dado será acessado antes da confirmação do pagamento. Assim que o serviço for finalizado, os dados são removidos permanentemente do nosso sistema.
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="font-medium text-gray-700">Login (usuário da conta)</label>
                        <input type="text" className="w-full mt-1 p-2 border bg-white rounded-lg" />
                    </div>
                    <div>
                        <label className="font-medium text-gray-700">Invocador (nome dentro do jogo)</label>
                        <input type="text" className="w-full mt-1 p-2 border bg-white rounded-lg" />
                    </div>
                    <div>
                        <label className="font-medium text-gray-700">Senha</label>
                        <input type="password" className="w-full mt-1 p-2 border bg-white rounded-lg" />
                    </div>
                    <div>
                        <label className="font-medium text-gray-700">Confirmar Senha</label>
                        <input type="password" className="w-full mt-1 p-2 border bg-white rounded-lg" />
                    </div>
                </div>
            </div>

            <h2 className="text-2xl font-bold text-purple-700 text-center mb-6">
                Personalize seu serviço
            </h2>
            <p className="text-center text-gray-700 mb-10">
                Abaixo você pode selecionar extras para deixar o serviço do seu jeito. Alguns são gratuitos!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {extrasList.map((extra) => (
                    <label
                        key={extra.id}
                        className="flex items-start gap-3 border border-gray-300 rounded-xl p-4 hover:border-purple-600 transition cursor-pointer"
                    >
                        <input
                            type="checkbox"
                            checked={selectedExtras.includes(extra.id)}
                            onClick={() => toggleExtra(extra.id)}
                            className="mt-1"
                        />
                        <div>
                            <div>
                                <p className="font-semibold text-gray-800">
                                    {extra.label}{" "}
                                    <span className={extra.value === 0 ? "text-green-600" : "text-blue-600"}>
                                        {extra.value === 0 ? "(Grátis)" : `(+ ${extra.value}%)`}
                                    </span>
                                </p>
                                <p className="text-sm text-gray-600">{extra.desc}</p>
                            </div>
                            {selectedExtras.includes(extra.id) && extra.observation && (
                                <div className="bg-gray-100 rounded-xl p-4 mt-4">
                                    <p className="mb-2 text-gray-700 text-sm">{extra.observation}</p>
                                </div>
                            )}
                            {selectedExtras.includes(extra.id) && extra.extras && (
                                <div>
                                    {extra.id === 4 && (
                                        <div onClick={() => toggleExtra(extra.id)}>
                                            <ChampionSelector
                                                superRestriction={false}
                                                selectedChampions={selectedChampions}
                                                setSelectedChampions={setSelectedChampions}
                                            />
                                        </div>
                                    )}
                                    {extra.id === 12 && (
                                        <div onClick={() => toggleExtra(extra.id)}>
                                            <ChampionSelector
                                                superRestriction={true}
                                                selectedChampions={selectedChampions}
                                                setSelectedChampions={setSelectedChampions}
                                            />
                                        </div>
                                    )}
                                    {extra.id === 6 && (
                                        <FlashPositionSelector
                                            selectedPosition={flashPosition}
                                            setSelectedPosition={setFlashPosition}
                                        />
                                    )}
                                    {extra.id === 14 && (
                                        <LaneSelector
                                            primaryLane={primaryLane}
                                            secondaryLane={secondaryLane}
                                            setPrimaryLane={setPrimaryLane}
                                            setSecondaryLane={setSecondaryLane}
                                        />
                                    )}
                                    {extra.id === 5 && extra.description && (
                                        <TextAreaExtra
                                            label="Com esta opção, você define os horários para realizar o Boosting."
                                            description={extra.description}
                                            value={restrictedHours}
                                            onChange={setRestrictedHours}
                                        />
                                    )}
                                    {extra.id === 9 && extra.description && (
                                        <TextAreaExtra
                                            label="Com esta opção selecionada, você poderá escolher um Booster específico para realizar seu serviço."
                                            description={extra.description}
                                            value={boosterName}
                                            onChange={setBoosterName}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    </label>
                ))}
            </div>

            <div className="flex justify-between mt-10">
                <button
                    className="px-6 mt-12 py-2 rounded-xl bg-gray-300 text-gray-700 hover:bg-gray-400"
                    onClick={onBack}
                >
                    Voltar
                </button>
                <div>
                    <div className="text-right">
                        <p className="text-sm text-gray-600">Subtotal:</p>
                        <p className="text-2xl font-bold text-blue-500">R$ {getSubtotal()}</p>
                    </div>
                    <button
                        className="px-6 py-2 rounded-xl bg-purple-700 text-white hover:bg-purple-800"
                        onClick={() => {
                            if (selectedExtras.includes(4) && selectedChampions.length < 10) {
                                Swal.fire({
                                    icon: 'warning',
                                    title: 'Selecione pelo menos 10 campeões!',
                                    text: 'Você precisa escolher no mínimo 10 campeões para o serviço ser executado com prioridade de campeões.',
                                    confirmButtonColor: '#7e22ce'
                                });
                                return;
                            } else if (selectedExtras.includes(6) &&
                                (!flashPosition?.includes("F") && !flashPosition?.includes("D"))) {
                                Swal.fire({
                                    icon: 'warning',
                                    title: 'Selecione uma posição para seu Flash!',
                                    text: 'Você precisa escolher qual a posição do seu Flash (D ou F).',
                                    confirmButtonColor: '#7e22ce'
                                });
                                return;
                            } else if (selectedExtras.includes(14) &&
                                (primaryLane === null || secondaryLane === null)) {
                                Swal.fire({
                                    icon: 'warning',
                                    title: 'Selecione uma Rota primaria e/ou uma secundaria!',
                                    text: 'Você precisa escolher rota é preferível de se jogar.',
                                    confirmButtonColor: '#7e22ce'
                                });
                                return;
                            }else if (selectedExtras.includes(12) && selectedChampions.length < 3) {
                                Swal.fire({
                                    icon: 'warning',
                                    title: 'Selecione pelo menos 3 campeões!',
                                    text: 'Você precisa escolher no mínimo 3 campeões para o serviço ser executado com prioridade de campeões.',
                                    confirmButtonColor: '#7e22ce'
                                });
                                return;
                            }

                            onNext();
                        }}
                    >
                        Continuar
                    </button>
                </div>
            </div>
        </div>
    );
}
