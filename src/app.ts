import express, { Express } from "express";
import { calculatePortfolioPerformance } from "./portfolio/portfolioPerformance";

const app: Express = express();

app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0"
    });
});

app.get("/api/v1/portfolio/performance", (req, res) => {
    const initialInvestment = Number(req.query.initialInvestment);
    const currentValue = Number(req.query.currentValue);

    const performance = calculatePortfolioPerformance(
        initialInvestment,
        currentValue
    );

    res.json(performance);
});

export default app;