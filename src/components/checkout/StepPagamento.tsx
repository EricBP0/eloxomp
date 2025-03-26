interface Props {
    onBack: () => void;
}

export default function StepPagamento({ onBack }: Props) {
    return (
        <div className="text-center">
            <h2 className="text-2xl font-bold text-purple-700 mb-6">Pagamento</h2>
            <p className="text-gray-700 mb-10">
                Escaneie o QR Code abaixo para realizar o pagamento via Pix.
                <br />
                Após o pagamento, seu pedido será processado automaticamente.
            </p>

            {/* QR CODE - substitua pela imagem real */}
            <div className="flex justify-center">
                <div className="bg-gray-100 border border-gray-300 rounded-xl p-6">
                    <img
                        src="/qrcode-exemplo.png" // Substitua pelo QR real gerado
                        alt="QR Code para pagamento"
                        className="w-64 h-64 object-contain"
                    />
                </div>
            </div>

            <p className="mt-6 text-sm text-gray-600">
                Após escanear e realizar o pagamento, aguarde a confirmação automática.
                <br />
                Caso ocorra algum erro, entre em contato com o suporte.
            </p>

            {/* Botão Voltar */}
            <div className="mt-10">
                <button
                    className="px-6 py-2 rounded-xl bg-gray-300 text-gray-700 hover:bg-gray-400"
                    onClick={onBack}
                >
                    Voltar para Resumo
                </button>
            </div>
        </div>
    );
}
