const EloCard = ({ rank, selected, onSelect }: { rank: {elo: string, hasSubDivisions: boolean}, selected: boolean, onSelect: () => void }) => {
    return (
        <div
            className={`p-4 border rounded-lg cursor-pointer text-center transition ${
                selected ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            onClick={onSelect}
        >
            <img src={`/elologos/${"elo_"+rank.elo.toLowerCase().replace("-", "_")}.png`} alt={rank.elo} className="w-16 mx-auto" />
            <p className="mt-2">{rank.elo}</p>
        </div>
    );
};

export default EloCard;
