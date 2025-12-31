import { ScoreType } from "../types";
import { createContext, ReactNode, useContext, useState } from "react";

const AnaliticsContext = createContext<AnaliticsContextType | null>(null);

export const AnaliticsProvider = ({ children }: AnaliticsProviderProps) => {
	const [score, setScore] = useState<Record<ScoreType, number>>({
		'info': 0,
		'warning': 0,
		'danger': 0,
		'success': 0
	});

	const handleScore = (type: ScoreType) => {
		setScore((prev) => ({ ...prev, [type]: prev[type] + 1 }));
	};

	return (
		<AnaliticsContext.Provider value={{ score, handleScore }}>
			{children}
		</AnaliticsContext.Provider>
	);
};

export const useAnaliticsScoreContext = () => {
	const ctx = useContext(AnaliticsContext);
	if (!ctx) throw new Error("useAnaliticsScore must be used inside a AnaliticsProvider");
	return ctx;
};

type AnaliticsProviderProps = {
    children: ReactNode;
};

type AnaliticsContextType = {
    score: Record<ScoreType, number>;
    handleScore: (type: ScoreType) => void;
};
