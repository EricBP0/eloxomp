interface Props {
    primaryLane: string | null;
    secondaryLane: string | null;
    setPrimaryLane: (lane: string) => void;
    setSecondaryLane: (lane: string) => void;
}

const lanes = [
    { id: "top", label: "TOP" },
    { id: "jungle", label: "JNG" },
    { id: "mid", label: "MID" },
    { id: "adc", label: "ADC" },
    { id: "support", label: "SUP" },
];

export default function LaneSelector({
                                         primaryLane,
                                         secondaryLane,
                                         setPrimaryLane,
                                         setSecondaryLane,
                                     }: Props) {
    return (
        <div className="bg-gray-100 rounded-xl p-4 mt-4">
            <p className="text-sm text-gray-700 mb-4">
                Escolha a prioridade de rotas que nossos jogadores irão utilizar durante o processo de Boosting.
                Você deverá escolher <strong>2 rotas distintas</strong>, sendo elas: uma primária e uma secundária.
                A rota "Primária" é sua principal rota, enquanto a "Secundária" é sua rota alternativa.
            </p>

            <table className="w-full text-center">
                <thead>
                <tr>
                    <th></th>
                    {lanes.map((lane) => (
                        <th key={lane.id} className="p-2">
                            <img
                                src={`/lanes/lane-${lane.id}.png`}
                                alt={lane.label}
                                className="mx-auto w-8 h-8"
                            />
                            <span className="block text-xs font-medium mt-1 text-gray-700">{lane.label}</span>
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="text-sm font-semibold text-gray-600 text-left pr-2">Primário</td>
                    {lanes.map((lane) => (
                        <td key={lane.id}>
                            <input
                                type="radio"
                                name="primaryLane"
                                checked={primaryLane === lane.id}
                                onChange={() => {
                                    if (secondaryLane !== lane.id) setPrimaryLane(lane.id);
                                }}
                                className="accent-purple-600"
                            />
                        </td>
                    ))}
                </tr>
                <tr>
                    <td className="text-sm font-semibold text-gray-600 text-left pr-2">Secundário</td>
                    {lanes.map((lane) => (
                        <td key={lane.id}>
                            <input
                                type="radio"
                                name="secondaryLane"
                                checked={secondaryLane === lane.id}
                                onChange={() => {
                                    if (primaryLane !== lane.id) setSecondaryLane(lane.id);
                                }}
                                className="accent-purple-600"
                            />
                        </td>
                    ))}
                </tr>
                </tbody>
            </table>
        </div>
    );
}
