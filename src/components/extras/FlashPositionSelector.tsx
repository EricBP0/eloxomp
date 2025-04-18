interface Props {
    selectedPosition: "D" | "F" | null;
    setSelectedPosition: (pos: "D" | "F") => void;
}

export default function FlashPositionSelector({ selectedPosition, setSelectedPosition }: Props) {
    return (
        <div className="bg-gray-100 rounded-xl p-4 mt-4">
            <p className="text-sm text-gray-700 mb-4">
                A seguir, você poderá escolher a posição do Feitiço de Invocador (Flash)
                que nossos profissionais irão utilizar durante o processo de Boosting.
            </p>

            <div className="flex gap-4">
                {["D", "F"].map((pos) => (
                    <label
                        key={pos}
                        className={`flex items-center gap-2 border-2 rounded-xl p-2 cursor-pointer w-full justify-center transition
              ${selectedPosition === pos ? "border-purple-600 bg-white" : "border-gray-300 bg-gray-50 hover:border-purple-400"}
            `}
                    >
                        <input
                            type="radio"
                            name="flash-position"
                            value={pos}
                            checked={selectedPosition === pos}
                            onChange={() => setSelectedPosition(pos as "D" | "F")}
                            className="accent-purple-700"
                        />
                        <div className={"flex flex-col gap-2 inline-flex items-center gap-2"}>
                            <img
                                src="/speels/spell-flash.png"
                                alt={`Flash ${pos}`}
                                className="w-8 h-8"
                            />
                        <span className="font-semibold text-sm text-gray-800">FLASH - {pos}</span>
                        </div>
                    </label>
                ))}
            </div>
        </div>
    );
}
