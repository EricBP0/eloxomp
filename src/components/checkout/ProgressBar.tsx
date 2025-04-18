interface Props {
    currentStep: number;
}

const steps = ["Conta", "Serviço", "Resumo", "Pagamento"];

export default function ProgressBar({ currentStep }: Props) {
    return (
        <div className="flex justify-between items-center">
            {steps.map((label, index) => {
                const stepNumber = index + 1;
                const isActive = currentStep === stepNumber;
                const isDone = currentStep > stepNumber;

                return (
                    <div key={label} className="flex-1 flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center 
              ${isDone ? "bg-purple-700 text-white" :
                            isActive ? "bg-purple-300 text-white" :
                                "bg-gray-200 text-gray-600"}`}>
                            {stepNumber}
                        </div>
                        <span className="ml-2 text-sm">{label}</span>
                        {stepNumber < 4 && <div className="flex-1 h-1 mx-2 bg-gray-300"></div>}
                    </div>
                );
            })}
        </div>
    );
}