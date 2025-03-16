import { useState } from "react";

const ranks = [
    { id: 1, elo: "Ferro", hasSubDivisions: true, multiplicator: 10 },
    { id: 2, elo: "Bronze", hasSubDivisions: true, multiplicator: 15 },
    { id: 3, elo: "Prata", hasSubDivisions: true, multiplicator: 20 },
    { id: 4, elo: "Ouro", hasSubDivisions: true, multiplicator: 30 },
    { id: 5, elo: "Platina", hasSubDivisions: true, multiplicator: 50 },
    { id: 6, elo: "Diamante", hasSubDivisions: true, multiplicator: 65 },
    { id: 7, elo: "Esmeralda", hasSubDivisions: true, multiplicator: 80 },
    { id: 8, elo: "Mestre", hasSubDivisions: false, multiplicator: 200 },
    { id: 9, elo: "Grão-Mestre", hasSubDivisions: false, multiplicator: 400 },
    { id: 10, elo: "Challenger", hasSubDivisions: false, multiplicator: 1000 }
];

const subdivisions = [
    {id: 1, subDivision: "IV"},
    {id: 2, subDivision:"III"},
    {id: 3, subDivision:"II"},
    {id: 4, subDivision:"I"},
];

const Services = () => {
    const [currentRank, setCurrentRank] = useState({elo: "Ferro", hasSubDivisions: true});
    const [currentDivision, setCurrentDivision] = useState(subdivisions[0]);
    const [desiredRank, setDesiredRank] = useState({elo: "Challenger", hasSubDivisions: false});
    const [desiredDivision, setDesiredDivision] = useState(subdivisions[0]);
    const [price, setPrice] = useState(0);

    const calculatePrice = () => {
        if (!currentRank || !desiredRank) return;

        const currentIndex = ranks.findIndex((rank) => rank.elo === currentRank.elo);
        const desiredIndex = ranks.findIndex((rank) => rank.elo === desiredRank.elo);

        if (desiredIndex > currentIndex) {
            let price: number = 0;
            for(let i = currentIndex; i <= desiredIndex; i++) {
                const rankIterator = ranks[i];
                if(rankIterator.hasSubDivisions){
                    if(rankIterator.elo == currentRank.elo){
                        for(let j = currentDivision.id-1; j < subdivisions.length; j++) {
                            price += rankIterator.multiplicator
                        }
                    }else{
                        if(rankIterator.elo == desiredRank.elo){
                            for(let j = 0; j < (desiredDivision.id - 1); j++) {
                                price += rankIterator.multiplicator
                            }
                        }else{
                            for(let j = 0; j < subdivisions.length; j++) {
                                price += rankIterator.multiplicator
                            }
                        }
                    }
                }else {
                    price += rankIterator.multiplicator}
            }
            setPrice(price);
        } else {
            setPrice(0);
        }
    };

    const setterSubdivision = (index: number, current: boolean) => {
        if(current) {
            setCurrentDivision(subdivisions[index]);
        }else{
            setDesiredDivision(subdivisions[index]);
        }
    }

    return (
        <div className="min-h-screen min-w-screen bg-gray-900 text-white">
            <style href={"../styles/global.css"}/>
            <div className="container mx-auto py-24 px-6">
                <h1 className="text-4xl text-black font-bold text-center mb-10">Personalize Seu Elojob</h1>

                {/* SELEÇÃO DO ELO ATUAL E DESEJADO */}
                <div className="flex-direction flex flex-row md:flex-row justify-center gap-8">
                    {/* SELEÇÃO DO ELO ATUAL */}
                    <div className="card w-full md:w-1/2 flex cursor-pointer items-center">
                        <h2 className="text-xl font-semibold mb-4">Seu Elo Atual</h2>

                        {currentRank && (
                            <img
                                src={`/elologos/elo_${currentRank.elo.toLowerCase()}.png`}
                                alt={currentRank.elo}
                                className="w-24 mt-4"
                            />
                        )}

                        <select
                            onChange={(e) => {
                                const selectedRank = ranks.find(rank => rank.elo === e.target.value);
                                if(selectedRank !== undefined) {
                                    setCurrentRank(selectedRank);
                                }
                            }}
                            className="p-2 bg-gray-800 rounded-lg"
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
                                className="mt-4 p-2 bg-gray-800 rounded-lg"
                            >
                                {subdivisions.map((division) => (
                                    <option key={division.id} value={division.subDivision}>{division.subDivision}</option>
                                ))}
                            </select>
                        )}
                    </div>

                    {/* SELEÇÃO DO ELO DESEJADO */}
                    <div className="w-full md:w-1/2 flex flex-col items-center">
                        <h2 className="text-xl font-semibold mb-4">Seu Elo Desejado</h2>

                        {desiredRank && (
                            <img
                                src={`/elologos/elo_${desiredRank.elo.toLowerCase()}.png`}
                                alt={desiredRank.elo}
                                className="w-24 mt-4"
                            />
                        )}

                        <select
                            onChange={(e) => {
                                const selectedRank = ranks.find(rank => rank.elo === e.target.value);
                                if(selectedRank !== undefined) {
                                    setDesiredRank(selectedRank);
                                }
                            }}
                            className="p-2 bg-gray-800 rounded-lg"
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
                                className="mt-4 p-2 bg-gray-800 rounded-lg"
                            >
                                {subdivisions.map((division) => (
                                    <option key={division.id} value={division.subDivision}>{division.subDivision}</option>
                                ))}
                            </select>
                        )}
                    </div>
                </div>

                {/* BOTÃO DE CÁLCULO */}
                <div className="text-center mt-6">
                    <button
                        onClick={calculatePrice}
                        className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-500 transition"
                    >
                        Calcular Preço
                    </button>
                </div>

                {/* EXIBIÇÃO DO PREÇO */}
                {price > 0 && <p className="text-lg font-bold mt-4 text-center">Preço: R$ {price},00</p>}
            </div>
        </div>
    );
};

export default Services;
