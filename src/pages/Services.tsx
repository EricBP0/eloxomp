import { useState } from "react";

const ranks = [
    { id: 1, elo: "Ferro", hasSubDivisions: true, multiplicator: 8.4 },
    { id: 2, elo: "Bronze", hasSubDivisions: true, multiplicator: 9.8 },
    { id: 3, elo: "Prata", hasSubDivisions: true, multiplicator: 13.3 },
    { id: 4, elo: "Ouro", hasSubDivisions: true, multiplicator: 16.8 },
    { id: 5, elo: "Platina", hasSubDivisions: true, multiplicator: 23.8 },
    { id: 6, elo: "Esmeralda", hasSubDivisions: true, multiplicator: 46.9 },
    { id: 7, elo: "Diamante", hasSubDivisions: true, multiplicator: 70 },
    { id: 8, elo: "Mestre", hasSubDivisions: false, multiplicator: 513.8 },
    { id: 9, elo: "Grão-Mestre", hasSubDivisions: false, multiplicator: 1096.9 },
    { id: 10, elo: "Challenger", hasSubDivisions: false, multiplicator: 0 }
];

const subdivisions = [
    {id: 1, subDivision: "IV"},
    {id: 2, subDivision:"III"},
    {id: 3, subDivision:"II"},
    {id: 4, subDivision:"I"},
];

const servers = [
    {id: 1, server: "br", percentage: 100 },
    {id: 2, server: "las", percentage: 150 },
    {id: 3, server: "lan", percentage: 300 },
    {id: 4, server: "na", percentage: 417 },
]

const lines = [
    {id: 1, line: "Solo/Dual"},
    {id: 2, line: "Flex"},
]

const Services = () => {
    const [currentServer, setCurrentServer] = useState({id: 1, server: "br", percentage: 100 });
    const [currentLine, setCurrentLine] = useState({id: 1, line: "Solo/Dual" });
    const [currentRank, setCurrentRank] = useState({elo: "Ferro", hasSubDivisions: true});
    const [currentDivision, setCurrentDivision] = useState(subdivisions[0]);
    const [desiredRank, setDesiredRank] = useState({elo: "Challenger", hasSubDivisions: false});
    const [desiredDivision, setDesiredDivision] = useState(subdivisions[0]);
    const [price, setPrice] = useState("");

    const calculatePrice = () => {
        if (!currentRank || !desiredRank) return;

        const currentIndex = ranks.findIndex((rank) => rank.elo === currentRank.elo);
        const desiredIndex = ranks.findIndex((rank) => rank.elo === desiredRank.elo);

        if (desiredIndex > currentIndex || (desiredIndex == currentIndex && currentDivision.id < desiredDivision.id)) {
            let price: number | string = 0;
            for (let i = currentIndex; i <= desiredIndex; i++) {
                const rankIterator = ranks[i];
                if (rankIterator.hasSubDivisions) {
                    if (rankIterator.elo == currentRank.elo) {
                        for (let j = currentDivision.id - 1; j <= subdivisions.length; j++) {
                            price += rankIterator.multiplicator
                        }
                    } else {
                        if (rankIterator.elo == desiredRank.elo) {
                            for (let j = 0; j < (desiredDivision.id - 1); j++) {
                                price += rankIterator.multiplicator
                            }
                        } else {
                            for (let j = 0; j < subdivisions.length; j++) {
                                price += rankIterator.multiplicator
                            }
                        }
                    }
                } else {
                    price += rankIterator.multiplicator
                }
            }
            price = price * (currentServer.percentage / 100)
            setPrice(price.toFixed(2));
        } else {
            setPrice("");
        }
    };

    const setterSubdivision = (index: number, current: boolean) => {
        if (current) {
            setCurrentDivision(subdivisions[index]);
        } else {
            setDesiredDivision(subdivisions[index]);
        }
    }

    return (
        <div className="min-h-screen min-w-screen bg-gray-900 text-white">
            <style href={"../styles/global.css"}/>
            <div className="container mx-auto py-24 px-6">
                <h1 className="text-4xl text-white border-black font-bold text-center m-10">
                    Personalize Seu Elojob
                </h1>
                <p className={"text-lg font-bold text-white text-center mb-5"}>
                    No serviço de elojob (elo job) ou elo boost,<br></br> um jogador de alto nível irá entrar em sua
                    conta e jogar partidas ranqueadas para subir seu elo.<br></br>Garantimos um serviço seguro, com
                    excelência e um ótimo custo-benefício.
                </p>

                {/* SELEÇÃO DO ELO ATUAL E DESEJADO E SERVIDOR */}
                <div className="flex-direction flex flex-row md:flex-row justify-center gap-8">
                    <div className="w-full md:w-1/2 flex flex-col items-center rounded-lg">

                        <h2 className="text-purple-400 text-xl font-semibold mb-4">Seu Servidor</h2>

                        {currentServer && (
                            <img
                                src={`/server/server_${currentServer.server.toLowerCase()}.webp`}
                                alt={currentServer.server}
                                className="w-40 m-5"
                            />
                        )}
                        <div className={"flex items-center justify-between"}>
                            <select
                                onChange={(e) => {
                                    const selectedServer = servers.find(server => server.server === e.target.value);
                                    if (selectedServer !== undefined) {
                                        setCurrentServer(selectedServer);
                                    }
                                }}
                                className="m-6 p-2 bg-purple-800 rounded-lg text-purple-200 hover:bg-purple-400 hover:text-purple-800"
                            >
                                {servers.map((server, index) => (
                                    <option key={index} value={server.server}>{server.server.toUpperCase()}</option>
                                ))}
                            </select>

                            <select
                                value={currentLine.line}
                                onChange={(e) => setCurrentLine(lines[e.target.selectedIndex])}
                                className="p-2 bg-purple-800 rounded-lg text-purple-200 hover:bg-purple-400 hover:text-purple-800"
                            >
                                {lines.map((line) => (
                                    <option key={line.id}
                                            value={line.line}>{line.line}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* SELEÇÃO DO ELO ATUAL */}
                    <div className="w-full md:w-1/2 flex flex-col items-center rounded-lg">
                        <h2 className="text-purple-400 text-xl font-semibold mb-4">Seu Elo Atual</h2>

                        {currentRank && (
                            <img
                                src={`/elologos/elo_${currentRank.elo.toLowerCase()}.png`}
                                alt={currentRank.elo}
                                className="w-40 mt-4"
                            />
                        )}
                        <div className={"flex items-center justify-between"}>
                            <select
                                onChange={(e) => {
                                    const selectedRank = ranks.find(rank => rank.elo === e.target.value);
                                    if (selectedRank !== undefined) {
                                        setCurrentRank(selectedRank);
                                    }
                                }}
                                className="m-5 p-2 bg-purple-800 rounded-lg text-purple-200 hover:bg-purple-400 hover:text-purple-800"
                            >
                                <option value="">Selecione o Elo</option>
                                {ranks.map((rank) => (
                                    <option key={rank.elo} value={rank.elo}>{rank.elo}</option>
                                ))}
                            </select>

                            {currentRank?.hasSubDivisions && (
                                <select
                                    value={currentDivision.subDivision}
                                    onChange={(e) => setterSubdivision(e.target.selectedIndex, true)}
                                    className="p-2 bg-purple-800 rounded-lg text-purple-200 hover:bg-purple-400 hover:text-purple-800"
                                >
                                    {subdivisions.map((division) => (
                                        <option key={division.id}
                                                value={division.subDivision}>{division.subDivision}</option>
                                    ))}
                                </select>
                            )}
                        </div>
                    </div>

                    {/* SELEÇÃO DO ELO DESEJADO */}
                    <div className="w-full md:w-1/2 flex flex-col items-center">
                        <h2 className="text-purple-400 text-xl font-semibold mb-4">Seu Elo Desejado</h2>

                        {desiredRank && (
                            <img
                                src={`/elologos/elo_${desiredRank.elo.toLowerCase()}.png`}
                                alt={desiredRank.elo}
                                className="w-40 mt-4"
                            />
                        )}
                        <div className={"flex items-center justify-between"}>
                            <select
                                onChange={(e) => {
                                    const selectedRank = ranks.find(rank => rank.elo === e.target.value);
                                    if (selectedRank !== undefined) {
                                        setDesiredRank(selectedRank);
                                    }
                                }}
                                className="m-5 p-2 bg-purple-800 rounded-lg text-purple-200 hover:bg-purple-400 hover:text-purple-800"
                            >
                                <option value="">Selecione o Elo</option>
                                {ranks.map((rank) => (
                                    <option key={rank.elo} value={rank.elo}>{rank.elo}</option>
                                ))}
                            </select>

                            {desiredRank?.hasSubDivisions && (
                                <select
                                    value={desiredDivision.subDivision}
                                    onChange={(e) => setterSubdivision(e.target.selectedIndex, false)}
                                    className="p-2 bg-purple-800 rounded-lg text-purple-200 hover:bg-purple-400 hover:text-purple-800"
                                >
                                    {subdivisions.map((division) => (
                                        <option key={division.id}
                                                value={division.subDivision}>{division.subDivision}</option>
                                    ))}
                                </select>
                            )}
                        </div>
                    </div>
                </div>

                {/* BOTÃO DE CÁLCULO */}
                <div className="text-center mt-6">
                    <button
                        onClick={calculatePrice}
                        className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-400 transition"
                    >
                        Calcular Preço
                    </button>
                </div>

                {/* EXIBIÇÃO DO PREÇO */}
                {price !== "" && <p className="text-lg font-bold mt-4 text-center">Preço: R$ {price}</p>}
            </div>
        </div>
    );
};

export default Services;
