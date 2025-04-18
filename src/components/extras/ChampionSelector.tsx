import championsData from "../../../public/json/json_chapions.json";
import {normalizedChampionName} from "../../util/coreUtils.ts";

interface Props {
    superRestriction: boolean;
    selectedChampions: string[];
    setSelectedChampions: (champions: string[]) => void;
}

export default function ChampionSelector({ selectedChampions, setSelectedChampions, superRestriction }: Props) {
    const toggleChampion = (championId: string) => {
        if (selectedChampions.includes(championId)) {
            setSelectedChampions(selectedChampions.filter(c => c !== championId));
        } else {
            setSelectedChampions([...selectedChampions, championId]);
        }
    };

    return (
        <div className="bg-gray-100 rounded-xl p-4 mt-4">
            <span className="mb-2 text-gray-700 text-sm">
                Com esta opção, você escolhe a prioridade de campeões que nossos jogadores irão utilizar durante o processo de Boosting.
                Você deverá escolher, no mínimo,
                {superRestriction && (
                <strong> 3 campeões</strong>
                )}
                {!superRestriction && (
                <strong> 10 campeões</strong>
                )}
            </span>

            <div className="grid grid-cols-5 gap-2 overflow-y-auto max-h-80 p-2 border border-gray-300 rounded-xl bg-white">
                {championsData.map((champ) => (
                    <img
                        key={champ.id}
                        src={`/champions_small_logos/${normalizedChampionName(champ.name)}_0.jpg`}
                        alt={champ.name}
                        title={champ.name}
                        onClick={() => toggleChampion(champ.id)}
                        className={`cursor-pointer rounded-md border-4 ${
                            selectedChampions.includes(champ.id) ? "border-purple-600" : "border-transparent"
                        } hover:border-purple-400`}
                    />
                ))}
            </div>
        </div>
    );
}
