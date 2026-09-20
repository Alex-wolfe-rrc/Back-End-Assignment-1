interface PortfolioPerformance {
    initialInvestment: number;
    currentValue: number;
    profitOrLoss: number;
    percentageChange: number;
    performanceSummary: string;
}

export function calculatePortfolioPerformance(
    initialInvestment: number,
    currentValue: number
): PortfolioPerformance {

    const profitOrLoss: number = currentValue - initialInvestment;

    const percentageChange: number =
        (profitOrLoss / initialInvestment) * 100;

    const getPerformanceSummary = (percentageChange: number): string => {
    switch (true) {
        case percentageChange >= 30:
            return "Excellent performance! Your investments are doing great.";

        case percentageChange >= 10:
            return "Solid gain. Keep monitoring your investments.";

        case percentageChange > 0:
            return "Modest gain. Your portfolio is growing slowly.";

        case percentageChange === 0:
            return "No change. Your portfolio is holding steady.";

        case percentageChange >= -10:
            return "Minor loss. Stay calm and review your options.";

        default:
            return "Significant loss. Review your portfolio strategy.";
    }
};

const performanceSummary: string =
    getPerformanceSummary(percentageChange);

    return {
        initialInvestment,
        currentValue,
        profitOrLoss,
        percentageChange,
        performanceSummary
    };
}