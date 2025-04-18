interface Props {
    label: string;
    description: string;
    value: string;
    onChange: (value: string) => void;
}

export default function TextAreaExtra({ label, description, value, onChange }: Props) {
    return (
        <div className="bg-gray-100 rounded-xl p-4 mt-4">
            <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold">{label}</span><br />
                <span dangerouslySetInnerHTML={{ __html: description }} />
            </p>

            <textarea
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg bg-white resize-none"
                placeholder="Digite aqui de forma clara..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows={4}
            />
        </div>
    );
}
